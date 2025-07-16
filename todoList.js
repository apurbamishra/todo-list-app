// Initialize an empty array to store task objects
let tasks = [];

const submitButton = document.getElementById("submit-button");

// Save the current state of tasks array to localStorage
const saveTasksToLocalStorage =() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Load tasks from localStorage and parse them into the tasks array
const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Add a new task to the task list
const addTask = () => {
    const taskInput = document.getElementById("task-input");
    const inputValue = taskInput.value.trim();

    //only add if the input value is not empty 
    if (inputValue) {
        tasks.push({task: inputValue, completed: false});
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasksToLocalStorage();
    }
};

// Toggle the completed status of a task
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasksToLocalStorage();
}; 

// Delete a task by its index
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasksToLocalStorage();
};

// update task fraction and progress bar
const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completeTasks} / ${totalTasks}`;
};

// Dynamically update the DOM to show the task list 
const updateTasksList = () => {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("taskItem");

        const taskDiv = document.createElement("div");
        taskDiv.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskComplete(index));

        const taskText = document.createElement("p");
        taskText.textContent = task.task;
        if (task.completed) {
            taskText.classList.add("completed"); // Apply styles if the task is completed
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => deleteTask(index));

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);

        listItem.appendChild(taskDiv);
        listItem.appendChild(deleteBtn);

        taskList.appendChild(listItem);
    });
};

submitButton.addEventListener("click", event => {
    event.preventDefault(); // prevent page reload on form submission
    addTask();
});

// load tasks from localStorage and initialize the UI when the page loads
loadTasksFromLocalStorage();
updateTasksList();
updateStats();
