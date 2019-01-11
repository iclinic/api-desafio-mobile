// Packages
const fs = require('fs');
const express = require('express');
const {
  validationResult,
  readData,
  writeData
} = require('express-validator/check');

// Files
const verifyToken = require('../../middlewares/token');
const locations = require('../../middlewares/locations');

// Variables
const route = express.Router();

route.get('/', verifyToken, (req, res) => {
  const locationsDatabase = readData(process.env.DATABASE_LOCATION);

  const userLocations = locationsDatabase.filter(
    (location) => location.createdBy === req.userId
  );

  res.json(userLocations);
});

route.post('/', [verifyToken, locations], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }

  let locationsData = readData(process.env.DATABASE_LOCATION);

  const { name, address, phone, type, lat, lng, description } = req.body;

  const newLocation = {
    id: Math.floor(Math.random() * 10000) + 1,
    createdBy: req.userId,
    name,
    address,
    phone,
    type,
    lat,
    lng,
    description
  };

  locationsData.push(newLocation);

  writeData(locationsData, process.env.DATABASE_LOCATION);

  locationsData = readData(process.env.DATABASE_LOCATION);

  res.json(locationsData);
});

route.get('/:locationId', verifyToken, (req, res) => {
  const locationsData = readData(process.env.DATABASE_LOCATION);

  const selectedLocation = locationsData.filter(
    (location) => location.id === Number(req.params.locationId)
  );

  res.json(selectedLocation);
});

route.put('/:locationId', [verifyToken, locations], (req, res) => {
  const locationsData = readData(process.env.DATABASE_LOCATION);

  let selectedLocation = locationsData.findIndex(
    (location) => location.id === Number(req.params.locationId)
  );

  locationsData[selectedLocation] = {
    id: fileData[selectedLocation].id,
    createdBy: fileData[selectedLocation].createdBy,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    type: req.body.type,
    lat: req.body.lat,
    lng: req.body.lng,
    description: req.body.description
  };

  writeData(locationsData, process.env.DATABASE_LOCATION);

  updatedLocation = fileData.findIndex(
    (location) => location.id === Number(req.params.locationId)
  );

  res.json(locationsData[updatedLocation]);
});

route.delete('/:locationId', [verifyToken, locations], (req, res) => {
  const locationsData = readData(process.env.DATABASE_LOCATION);

  const selectedLocation = locationsData.findIndex(
    (location) => location.id === Number(req.params.locationId)
  );

  locationsData.splice(selectedLocation, 1);

  writeData(locationsData, process.env.DATABASE_LOCATION);

  res.send(true);
});

module.exports = route;
