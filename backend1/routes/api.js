const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../models/dataModel');

// Get data from JSON file
router.get('/data', (req, res) => {
  const data = readData();
  res.json(data);
});

// Add new data to the JSON file
router.post('/data', (req, res) => {
  const { name, description } = req.body;
  const data = readData();

  // Generate a new ID by incrementing the highest ID in the data
  const newId = data.sampleData.length > 0 ? data.sampleData[data.sampleData.length - 1].id + 1 : 1;

  const newItem = {
    id: newId,
    name: name,
    description: description,
  };

  // Add the new item to the data
  data.sampleData.push(newItem);
  writeData(data);

  res.status(201).json(newItem);  // Return the newly added item
});

module.exports = router;
