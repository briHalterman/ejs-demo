const Task = require('../models/Task');

const addTask = (req, res) => {
    res.send("in addTask");
}

const createTask = async (req, res) => {
     res.send("in createTask");
}

const deleteTask = async (req, res) => {
    res.send("in deleteTask");
}

const editTask = async (req, res) => {
    res.send("in editTask");
}

const updateTask = async (req, res) => {
   res.send("in updateTask");
}

const getTasks = async (req, res) => {
    res.send("in getTasks");
}

module.exports = {
    addTask,
    createTask,
    deleteTask,
    updateTask,
    editTask,
    getTasks
};