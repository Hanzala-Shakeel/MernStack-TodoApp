const express = require('express');
const app = express();
const cors = require('cors');
const taskModel = require('./mongodb');

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.get('/', function (req, res) {
    res.send("<h1>Home Page</h1>");
});

app.post('/add', async function (req, res) {
    const todo = req.body.todo;
    try {
        const createdTask = await taskModel.create({
            task: todo,
            isDone: false
        });
        res.json(createdTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/get', async function (req, res) {
    try {
        let allTasks = await taskModel.find();
        res.json(allTasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/delete', async function (req, res) {
    const deleteId = req.body.IdForDelete;
    try {
        let deleteTask = await taskModel.findOneAndDelete({ _id: deleteId });
        res.json(deleteTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/update', async function (req, res) {
    const { _id, isChecked } = req.body;
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            _id,
            { isDone: isChecked },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001);
);
