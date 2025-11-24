// controllers/petController.js
// all the pet logic in here so routes stay clean

const Pet = require('../models/Pet');

// GET /pets - list all pets
exports.listPets = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.render('pets/list', { title: 'My Pets', pets });
  } catch (err) {
    console.error('error getting pets:', err.message);
    res.status(500).send('something broke getting the pets');
  }
};

// GET /pets/new - show create form
exports.showCreateForm = (req, res) => {
  res.render('pets/form', {
    title: 'Add New Pet',
    pet: {},
    formAction: '/pets',
    submitLabel: 'Add Pet'
  });
};

// POST /pets - create pet
exports.createPet = async (req, res) => {
  try {
    await Pet.create(req.body);
    res.redirect('/pets');
  } catch (err) {
    console.error('error creating pet:', err.message);
    res.status(500).send('could not add pet, check console');
  }
};

// GET /pets/:id/edit - show edit form
exports.showEditForm = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).send('pet not found');
    }

    res.render('pets/form', {
      title: `Edit ${pet.name}`,
      pet,
      formAction: `/pets/${pet._id}`,
      submitLabel: 'Save Changes'
    });
  } catch (err) {
    console.error('error loading pet for edit:', err.message);
    res.status(500).send('could not load pet');
  }
};

// POST /pets/:id - update pet
exports.updatePet = async (req, res) => {
  try {
    await Pet.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/pets');
  } catch (err) {
    console.error('error updating pet:', err.message);
    res.status(500).send('could not update pet');
  }
};

// GET /pets/:id/delete - show delete confirmation
exports.showDeleteConfirm = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).send('pet not found');
    }
    res.render('pets/delete', { title: 'Delete Pet', pet });
  } catch (err) {
    console.error('error loading delete confirm:', err.message);
    res.status(500).send('could not load delete page');
  }
};

// POST /pets/:id/delete - actually delete pet
exports.deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.redirect('/pets');
  } catch (err) {
    console.error('error deleting pet:', err.message);
    res.status(500).send('could not delete pet');
  }
};nn