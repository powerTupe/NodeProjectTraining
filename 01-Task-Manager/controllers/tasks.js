const Task = require('../models/task');

const getAllTask = async (req, res) =>{
    try {
        const task = await Task.find({});
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json(error);
    }
}

const createTask = async (req, res) =>{
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json(error);
    }
    
}

const getTask = async (req, res) =>{
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOne({_id: taskId});
        if(!task){
            return res.status(404).json({msg: `Not found on task: ${taskId}`});
        }
        res.status(200).json({ task });
    } catch ( error ) {
        res.status(500).json(error);
    }
}

const updateTask = async (req, res) =>{
    try {
        const {id: taskId} = req.params;
        const task = await Task.findByIdAndUpdate({_id: taskId}, req.body, {
            new: true,
            runValidators: true
        });
        if(!task){
            return res.status(404).json({msg: `Not found on task: ${taskId}`});
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteTask = async (req, res) =>{
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOneAndDelete({_id: taskId});
        if(!task){
            return res.status(404).json({msg: `Not found on task: ${taskId}`});
        }
        res.status(200).json({ task });
    } catch ( error ) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask
}