
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getData = async (req, res) => {
  const result = await mongodb.getDb().db('CSE341').collection('players').find(); // On this line spelling plays a major factor... player vs. playerss 
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getObject = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341').collection('players').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createPlayer = async (req, res) => {
  const player = {
    // firstName: req.body.firstName,
    // lastName: req.body.lastName,
    // email: req.body.email,
    // favoriteColor: req.body.favoriteColor,
    // birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db('CSE341').collection('players').insertOne(player);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating player.');
  }
  console.log(req.body)
};

const updatePlayer = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const player = {
    // firstName: req.body.firstName,
    // lastName: req.body.lastName,
    // email: req.body.email,
    // favoriteColor: req.body.favoriteColor,
    // birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db('CSE341').collection('players').replaceOne({ _id: userId }, player);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating player.');
  }
  console.log(req.body)
};

const deletePlayer = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('CSE341').collection('players').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting player');
  }
};

module.exports = { getData, getObject, createPlayer, updatePlayer, deletePlayer };