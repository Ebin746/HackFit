const express = require('express');
const router = express.Router();
const animalSchema = require('../models/animal');
const {isCheckUser}=require("../utils/checkuser")



router.post('/', async (req, res, next) => {
    try {
        const { lat, lng, animal, description } = req.body;

        // Check if any user is within 30 km of the reported animal
        await isCheckUser(lat, lng);

        // Create a new animal report
        const report = new animalSchema({ lat, lng, animal, description });

        // Save the report to the database
        await report.save();
          
        res.status(200).json(report);

    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const allReports = await animalSchema.find();
        res.status(200).json(allReports);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
