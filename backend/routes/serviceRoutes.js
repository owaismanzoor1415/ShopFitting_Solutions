const express = require("express");

const router = express.Router();

const Service = require("../models/service");


// GET SERVICES

router.get("/", async (req, res) => {

  try {

    const services = await Service.find();

    res.json(services);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// UPDATE SERVICE

router.put("/:id", async (req, res) => {

  try {

    const updatedService = await Service.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    );

    res.json(updatedService);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;