const Task = require('../models/Task');

// const addTask = (req, res) => {
//     res.send("in addTask");
// }
const addTask = (req, res) => {
  res.render('pages/addTask');
};
// This just renders the addTask.ejs template, with a message if any.

// const createTask = async (req, res) => {
//      res.send("in createTask");
// }
const createTask = async (req, res) => {
  try {
    // If the create is successful, a pending message (which is displayed after a redirect operation) gives the user feedback, and a redirect is sent back to display the tasks page again.
    if (req.body.complete) {
      req.body.completed = true;
    }
    await Task.create(req.body); // Note that the method must be async so that you can await the result of the create operation.
    req.session.pendingMessage = "The task was created.";
    res.redirect("/tasks");
  } catch (err) {
    if (err.name === "ValidationError") {
      res.locals.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(", ");
    } else {
      res.locals.message = "Something went wrong.";
    }
    res.render("pages/addTask");
  }
};
// Here you are using the values posted in req.body to create a task. That may succeed or fail, depending on the validation of values. req.body.complete may have the string value “true” for complete, which must be changed to the boolean value of true for completed.

const deleteTask = async (req, res) => {
    res.send("in deleteTask");
}

// const editTask = async (req, res) => {
//     res.send("in editTask");
// }
const editTask = async (req, res) => {
  try {
    // To edit a task, you have to load it first
    const task = await Task.findById(req.params.id)
    // the task variable is passed to the editTask.ejs on the render
    res.render('pages/editTask', { task })
  // findById call may fail in which case the error is reported to the user
  } catch (err) {
      req.session.pendingMessage = 'Something went wrong.'
      res.redirect('/tasks')
  }
}

// const updateTask = async (req, res) => {
//    res.send("in updateTask");
// }
const updateTask = async (req, res) => {
  let task = false;
  try {
    if (req.body.complete) {
      req.body.completed = true;
    }
    // find the task being updated
    task = await Task.findById(req.params.id);
    // update task with the values from the body of the post request
    await Task.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    req.session.pendingMessage = "The task was updated.";
    res.redirect("/tasks");
  } catch (err) {
    if (err.name === "ValidationError") {
      res.locals.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(", ");
    } else {
      res.locals.message = "Something went wrong.";
    }
    if (task) {
      // if that fails, you render the page again, passing the message and the task on the render call
      res.render("pages/editTask", { task });
    } else {
      // If it succeeds, you give the user the success message and redirect to the tasks page
      req.session.pendingMessage = "Something went wrong.";
      res.redirect("/tasks");
    }
  }
};

// const getTasks = async (req, res) => {
//     res.send("in getTasks");
// }
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("pages/tasks", { tasks });
  } catch (err) {
    res.locals.message = "Something went wrong.";
    res.render("pages/tasks", { tasks: [] });
  }
};
// This method retrieves the list of tasks. It may be an empty array, or a list of tasks, which is passed on the render call to the tasks.ejs template on the render call.

module.exports = {
    addTask,
    createTask,
    deleteTask,
    updateTask,
    editTask,
    getTasks
};