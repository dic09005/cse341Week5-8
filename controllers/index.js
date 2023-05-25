
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getPlayerData = async (req, res) => {
  const result = await mongodb.getDb().db('CSE341W5-8').collection('players').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getTeamData = async (req, res) => {
  const result = await mongodb.getDb().db('CSE341W5-8').collection('teams').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getPlayerObject = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Player id to find a Player.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341W5-8').collection('players').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const getTeamObject = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Team id to find a Team.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('CSE341W5-8').collection('teams').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createPlayer = async (req, res) => {
  const player = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jerseyNumber: req.body.jerseyNumber,
    team: req.body.team,
    possition: req.body.possition,
    birthday: req.body.birthday,
    age: req.body.age
  };
  const response = await mongodb.getDb().db('CSE341W5-8').collection('players').insertOne(player);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating player.');
  }
  console.log(req.body)
};

const createTeam = async (req, res) => {
  const Team = {
    teamName: req.body.teamName,
    city: req.body.city,
    conference: req.body.conference,
    division: req.body.division,
    coach: req.body.coach
  };
  const response = await mongodb.getDb().db('CSE341W5-8').collection('teams').insertOne(Team);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating team.');
  }
  console.log(req.body)
};

const updatePlayer = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const player = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jerseyNumber: req.body.jerseyNumber,
    team: req.body.team,
    possition: req.body.possition,
    birthday: req.body.birthday,
    age: req.body.age
  };
  const response = await mongodb.getDb().db('CSE341W5-8').collection('players').replaceOne({ _id: userId }, player);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating player.');
  }
  console.log(req.body)
};

const updateTeam = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const Team = {
    teamName: req.body.teamName,
    city: req.body.city,
    conference: req.body.conference,
    division: req.body.division,
    coach: req.body.coach
  };
  const response = await mongodb.getDb().db('CSE341W5-8').collection('teams').replaceOne({ _id: userId }, Team);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating Team.');
  }
  console.log(req.body)
};

const deletePlayer = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid player id to delete a player.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('CSE341W5-8').collection('players').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting player');
  }
};

const deleteTeam = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Team id to delete a Team.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('CSE341W5-8').collection('teams').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting Team');
  }
};

module.exports = { getPlayerData, getTeamData, getPlayerObject, getTeamObject, createPlayer, createTeam, updatePlayer, updateTeam, deletePlayer, deleteTeam };