// routes/pets.js
// routes just calling the controller so this file stays readable

const express = require('express');
const router = express.Router();

// IMPORTANT: path must match folder name "controllers" and file "petController.js"
const petController = require('../controllers/petController');

// list all pets
router.get('/', petController.listPets);

// show create form
router.get('/new', petController.showCreateForm);

// handle create
router.post('/', petController.createPet);

// show edit form
router.get('/:id/edit', petController.showEditForm);

// handle update
router.post('/:id', petController.updatePet);

// show delete confirmation
router.get('/:id/delete', petController.showDeleteConfirm);

// handle delete
router.post('/:id/delete', petController.deletePet);

module.exports = router;