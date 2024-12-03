import TaskManager from './task.Manager.js';

const taskManager = new TaskManager();

taskManager.addTask('task 1', 'task to do');
taskManager.addTask('Aask 1', 'add classes');
taskManager.addTask('1 1', 'add classes');
taskManager.addTask('task 2', 'make getters');

//taskManager.displayInConsole();


const taskListElement = document.getElementById("task-list");


function renderTaskList() {
    taskListElement.innerHTML = "";

    const tasksToRender = taskManager.getSortedTasks();

    tasksToRender.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.isCompleted) {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p>Date: ${task.date}</p>
                <p>Status: ${task.isCompleted ? "Completed" : "Incomplete"}</p>
            </div>
            <div class="task-actions">
                <button class="complete-btn">Toggle Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        taskElement.querySelector(".complete-btn").addEventListener("click", () => {
            taskManager.toggleTaskStatus(task);
            renderTaskList();
        });

        taskElement.querySelector(".delete-btn").addEventListener("click", () => {
            taskManager.deleteTask(task);
            renderTaskList();
        });

        taskListElement.appendChild(taskElement);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    renderTaskList();
});

document.getElementById("filter-select").addEventListener("change", (e) => {
    taskManager.filterStatus = e.target.value;
    renderTaskList();
});

document.getElementById("sort-select").addEventListener("change", (e) => {
    taskManager.sortCriteria = e.target.value;
    renderTaskList();
});

renderTaskList();