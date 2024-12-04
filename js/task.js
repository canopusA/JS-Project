export default class Task {
    #id;
    #title;
    #description;
    #creationDate;
    #isCompleted;
  
   
    constructor(title, description, creationDate, isCompleted = false, id = null) {
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
    
    set title(value) {
      this.#title = value;
    }
    set description(value) {
      this.#description = value;
    }
    set isCompleted(value) {
      this.#isCompleted = value;
    }
    
    editTask(newTitle, newDescription) {
      this.title = newTitle;
      this.description = newDescription;
    }
  
    toggleCompletion() {
      this.#isCompleted = !this.#isCompleted;
    }

    static fromJSON(data) {
      return new Task(data.title, data.description, data.creationDate, data.isCompleted, data.id);
  }

    toJSON() {
      return {
          id: this.id,
          title: this.title,
          description: this.description,
          creationDate: this.creationDate,
          isCompleted: this.isCompleted,
      };
  }
  
  }