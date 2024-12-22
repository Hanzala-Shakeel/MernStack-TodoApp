const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/mytodo");
mongoose.connect("mongodb+srv://rumaisa:123@cluster0.48vpiei.mongodb.net/todoData?retryWrites=true&w=majority");

let tasksSchema = mongoose.Schema({
  task: String,
  isDone:Boolean
})

module.exports = mongoose.model("tasks", tasksSchema);
