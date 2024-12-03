import Task from './task.js';

export default class TaskManager {
  #tasks;

  constructor() {
    this.tasks = [];
    this.filterStatus = 'all';
    this.sortCriteria = 'date';
  }

  addTask(title, description) {
    if(validateDescription(description, title)){
      const creationDate = new Date().toLocaleString('en-GB');
      const task = new Task(title, description, creationDate);
      this.tasks.push(task);
    }
    else{
      console.log("Wrong validation!");
    }
  }

  deleteTask(currentTask){
    this.tasks = this.tasks.filter(task => task.id !== currentTask.id);
  }


  getVisibleTasks() {
    const filteredTasks = this.filterTasks();
    return this.sortTasks(filteredTasks);
  }
  
  toggleTaskStatus(currentTask) {
    currentTask.toggleCompletion();
  }

  getFilteredTasks() {
    if (this.filterStatus === "all") return this.tasks;
    return this.tasks.filter(task => 
      this.filterStatus === "completed" ? task.isCompleted : !task.isCompleted
    );
  }

  getSortedTasks() {
    const tasks = this.getFilteredTasks();
    if (this.sortCriteria === "date") {
      return tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (this.sortCriteria === "name") {
      return tasks.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tasks;
  }




  getTasks() {
    return this.tasks;
  }

  displayInConsole(){
    this.tasks.forEach(element => {
      console.log(element.title);
      console.log(element.description);
      console.log(element.creationDate);
      console.log(element.isCompleted);
      console.log(element.id);
    });
  }

}


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
