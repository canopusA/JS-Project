export default class Task {
    #id;
    #title;
    #description;
    #creationDate;
    #isCompleted;
  
    constructor(title, description, creationDate, isCompleted = false) {
      this.#id = crypto.randomUUID();
      this.#title = title;
      this.#description = description;
      this.#creationDate = creationDate;
      this.#isCompleted = isCompleted;
    }
  
  
    get id() {
      return this.#id;
    }
  
    get title() {
      return this.#title;
    }
  
    get description() {
      return this.#description;
    }
  
    get creationDate() {
      return this.#creationDate;
    }
  
    get isCompleted() {
      return this.#isCompleted;
    }
    
    
    editTask(newTitle, newDescription) {
      this.title = newTitle;
      this.description = newDescription;
    }
  
    toggleCompletion() {
      this.#isCompleted = !this.#isCompleted;
    }
  
  }