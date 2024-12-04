import TaskManager from './task.Manager.js';

const taskManager = new TaskManager();
taskManager.loadFromLocalStorage();


document.getElementById('task-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();

   
    console.log("Title:", title);
    console.log("Description:", description);


    if (!title || !description) {
        alert('Please fill in all fields!');
        return;
    }

    if(taskManager.addTask(title, description)===true){
        console.log(taskManager.tasks);

        console.log("Saving tasks:", taskManager.tasks.map(task => task.toJSON()));
        taskManager.saveToLocalStorage();
        event.target.reset();
        alert('Task added successfully!');
    
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }

    else alert('Task added wrong!');

    
});

document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
       