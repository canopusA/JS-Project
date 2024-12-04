import TaskManager from './task.Manager.js';

const taskManager = new TaskManager();

taskManager.loadFromLocalStorage();

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

console.log("Task ID from URL:", taskId);
console.log("Loaded tasks:", taskManager.tasks);

const task = taskManager.getTaskById(taskId);

if (!task) {
    console.error("Task not found!");
    document.body.innerHTML = "<h1>404 - Task Not Found</h1>";
} 
else {
    console.log("Found task:", task);
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;

    document.getElementById("edit-task-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const newTitle =  document.getElementById("title").value.trim();
        const newDiscr = document.getElementById("description").value.trim();
       
        if(validateDescription(newDiscr, newTitle)){
            task.description = newDiscr;
            task.title =newTitle;
            taskManager.saveToLocalStorage();
            alert("Task updated successfully!");
            window.location.href = "index.html";
        }
        else {
            alert("Task can't update! Validation errors!");
        }
        
    });
}

document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
       

const wordRegex = /^[A-Za-zА-Яа-яёЁ0-9]{1,16}$/;
const numberRegex = /^[0-9]+$/;

function validateString(inputString) {
    const words = inputString.trim().split(/\s+/);

    const numberOfSpaces = inputString.split(' ').length - 1;
    const numberOfWords = words.length;

    if (numberOfSpaces !== numberOfWords - 1) {
        console.log('The number of spaces does not correspond to the number of words.');
        return false;
    }

    let isOnlyNumbers = true;
    for (let word of words) {
        if (!wordRegex.test(word)) {
            console.log(`Incorrect word: ${word}`);
            return false;
        }
        if (!numberRegex.test(word)) {
            isOnlyNumbers = false;
        }
    }

    if (isOnlyNumbers) {
        console.log('The string should not consist only of numbers.');
        return false;
    }

    console.log('The string has passed validation.');
    return true;
}

function validateDescription(description, title) {
    if(validateString(title)){
        const trimmedDescription = description.trim();
        const trimmedTitle = title.trim();
        return (
            trimmedDescription.length > 0 &&
            trimmedDescription !== trimmedTitle
        );
    }
    else {
        console.log('Something wrong');
        return false;
    }
    
}



