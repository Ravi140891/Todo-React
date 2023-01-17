//Functional Component

import React, { useState, useEffect } from "react";
import './TodoApp.css'

function TodoApp() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setCompletedTasks(tasks.filter((task) => task.completed).length);
    setPendingTasks(tasks.filter((task) => !task.completed).length);
  }, [tasks]);

  function handleAddTask(e) {
    e.preventDefault();
    setTasks([...tasks, { task: newTask, completed: false }]);
    setNewTask("");
  }

  function handleCompleteTask(index) {
    let updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function handleRemoveTask(index) {
    let updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function handleEditTask(index) {
    setEditingIndex(index);
    setEditingTask(tasks[index].task);
  }

  function handleSaveEdit() {
    let updatedTasks = [...tasks];
    updatedTasks[editingIndex].task = editingTask;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditingIndex(-1);
    setEditingTask("");
  }
  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button className="btn" type="submit">
          Add Task
        </button>
      </form>
      <div className="task-update">
        <p className="completed">Completed: {completedTasks}</p>
        <p className="pending">Pending: {pendingTasks}</p>
      </div>
      <ul className="task-container">
        {tasks.map((task, index) => (
          <li
            className="todo-task"
            key={index}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              textDecorationColor: "black",
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCompleteTask(index)}
            />
            {task.task}
            <div className="btn-container">
              <button className="btn" onClick={() => handleRemoveTask(index)}>
                Remove
              </button>
              <button className="btn" onClick={() => handleEditTask(index)}>
                Edit
              </button>
            </div>
            {editingIndex === index && (
              <div>
                <input
                  type="text"
                  value={editingTask}
                  onChange={(e) => setEditingTask(e.target.value)}
                />
                <button className="btn" onClick={handleSaveEdit}>
                  Save
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

}


//Class Component

// import React, { Component } from "react";
// import "./TodoApp.css";

// class TodoApp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tasks: JSON.parse(localStorage.getItem("tasks")) || [],
//       newTask: "",
//       editingTask: "",
//       editingIndex: -1,
//       completedTasks: 0,
//       pendingTasks: 0,
//     };
//     this.handleAddTask = this.handleAddTask.bind(this);
//     this.handleCompleteTask = this.handleCompleteTask.bind(this);
//     this.handleRemoveTask = this.handleRemoveTask.bind(this);
//     this.handleEditTask = this.handleEditTask.bind(this);
//     this.handleSaveEdit = this.handleSaveEdit.bind(this);
//   }

//   componentDidMount() {
//     this.updateTasks();
//   }

//   updateTasks() {
//     localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
//     this.setState({
//       completedTasks: this.state.tasks.filter((task) => task.completed).length,
//       pendingTasks: this.state.tasks.filter((task) => !task.completed).length,
//     });
//   }

//   handleAddTask(e) {
//     e.preventDefault();
//     this.setState({
//       tasks: [
//         ...this.state.tasks,
//         { task: this.state.newTask, completed: false },
//       ],
//     });
//     this.setState({ newTask: "" });
//   }

//   handleCompleteTask(index) {
//     let updatedTasks = [...this.state.tasks];
//     updatedTasks[index].completed = !updatedTasks[index].completed;
//     this.setState({ tasks: updatedTasks });
//     this.updateTasks();
//   }

//   handleRemoveTask(index) {
//     let updatedTasks = [...this.state.tasks];
//     updatedTasks.splice(index, 1);
//     this.setState({ tasks: updatedTasks });
//     this.updateTasks();
//   }

//   handleEditTask(index) {
//     this.setState({ editingIndex: index });
//     this.setState({ editingTask: this.state.tasks[index].task });
//   }

//   handleSaveEdit() {
//     let updatedTasks = [...this.state.tasks];
//     updatedTasks[this.state.editingIndex].task = this.state.editingTask;
//     this.setState({ tasks: updatedTasks });
//     this.updateTasks();
//     this.setState({ editingIndex: -1 });
//     this.setState({ editingTask: "" });
//   }

//     render() {
//     return (
//       <div>
//         <h1>Todo App</h1>
//         <form onSubmit={this.handleAddTask}>
//           <input
//             type="text"
//             value={this.state.newTask}
//             onChange={(e) => this.setState({ newTask: e.target.value })}
//             placeholder="New Task"
//           />
//           <button className="btn" type="submit">
//             Add Task
//           </button>
//         </form>
//         <div className="task-update">
//           <p className="completed">Completed: {this.state.completedTasks}</p>
//           <p className="pending">Pending: {this.state.pendingTasks}</p>
//         </div>
//         <ul className="task-container">
//           {this.state.tasks.map((task, index) => (
//             <li
//               className="todo-task"
//               key={index}
//               style={{ textDecoration: task.completed ? "line-through" : "none" }}
//             >
//               <input
//                 type="checkbox"
//                 checked={task.completed}
//                 onChange={() => this.handleCompleteTask(index)}
//               />
//               {task.task}
//               <div className="btn-container">
//                 <button className="btn" onClick={() => this.handleRemoveTask(index)}>
//                   Remove
//                 </button>
//                 <button className="btn" onClick={() => this.handleEditTask(index)}>
//                   Edit
//                 </button>
//               </div>
//               {this.state.editingIndex === index && (
//                 <div>
//                   <input
//                     type="text"
//                     value={this.state.editingTask}
//                     onChange={(e) => this.setState({ editingTask: e.target.value })}
//                   />
//                   <button className="btn" onClick={this.handleSaveEdit}>Save</button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

export default TodoApp;
