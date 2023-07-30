const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const habitController = require('../controllers/habit_controller');

router.get('/'     ,homeController.home);
router.post('/create'  ,habitController.createHabit );
router.get('/destroy/:id', habitController.destroy);
router.get('/changeStatus/:id', habitController.updateStatus);
router.get('/week',habitController.weeks);
module.exports = router;

