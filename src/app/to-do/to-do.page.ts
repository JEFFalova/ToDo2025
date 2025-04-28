import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonList, IonItem, IonLabel,IonInput,IonCheckbox } from '@ionic/angular/standalone';

// defien structure of each todo item
export interface Todo {
  id: number; // unique id for each to do
  title: string; // title for todo
  completed: boolean; // to track if todo is completed or not
}

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonInput,IonCheckbox]
})
export class ToDoPage implements OnInit {
  todos: Todo[] = []; // array holds list of todos
  todoTitle: string= ""; // title of a new todo 
  editingTodo: Todo | null = null; // Stores the todo currently being edited
  editingTitle: string = "";       // Temporary title during edit mode
  
// injectinf ionic storage and http 
  constructor(private storage:Storage, private http: HttpClient) { }

  async ngOnInit() 
  {
    await this.storage.create(); // storage system
    this.loadsTodos(); // load the todos from storage or api
    this.checkTheme(); 
  }

  // method to load todos
  async loadsTodos()
  {
    const todosFromStorage = await this.storage.get('todos');// tries to get todo from storage
    if(todosFromStorage) // if todos are dound in storage use them
    {
      this.todos = todosFromStorage;
    } 
    else // if not get from api
    {
      this.http.get<Todo[]>('https://jsonblob.com/api/jsonBlob/1366118241017192448')
      .subscribe(async (data) => 
      {
        await this.storage.set('todos', this.todos);// save the the todos to storage
        this.checkTheme();
        this.todos = data; // set the todos
         
      });
      
    }
  }

  // add a new todo
  async addTodo()
  {
    if (this.todoTitle.trim()) // only continue if the title is not empty 
      {
      const newTodo: Todo =
      {
        id: this.todos.length + 1, // assign a unique id
        title: this.todoTitle, // title is taken from input field
        completed: false // todo are completed by default
      };
      this.todos.push(newTodo); // add new todo to the list
      await this.storage.set('todos', this.todos) // save the updated todo array to storage
      this.todoTitle = ""; // clear the input affter adding new todo
    }
  }

  // method toggle completion stauts of todo
  async toggleTodoCompletion (todo: Todo)
  {
    todo.completed= !todo.completed; //flip the completion status
    await this.storage.set('todos', this.todos); // saves updated todos to starage
  }
  // method to mark a todo as being completed
  async markAsCompleted(todo: Todo) 
  {
    if (!todo.completed) 
      {
      todo.completed = true;// set the todo as completef
      await this.storage.set('todos', this.todos); // save and update storage
    }
  }
   
  // Start editing a todo
  startEdit(todo: Todo)
  {
    this.editingTodo = todo; // set the todo being edited
    this.editingTitle = todo.title; // set the current title of todo as editable 
  }

  // Save the edited todo
  async saveEdit() 
  {
    if (this.editingTodo && this.editingTitle.trim()) // ensure the title is not emptu
    {
      this.editingTodo.title = this.editingTitle;// update the todo title 
      await this.storage.set('todos', this.todos); // save and update storage
      this.cancelEdit(); // after saving cancel edit mode
    }
  }

  // Cancel editing
  cancelEdit() 
  {
    this.editingTodo = null; // clear the todo beig edited
    this.editingTitle = ''; // clear the title
  }

  // Delete a todo
  async deleteTodo(todo: Todo) 
  {
    this.todos = this.todos.filter(t => t.id !== todo.id); // remove todo form the list
    await this.storage.set('todos', this.todos); // save and update storage
  }
  // not working
  // Toggle theme between light and dark mode
  toggleTheme() 
  {
    console.log('Toggling theme...');
    const body = document.body;
    
  // Toggle dark class on the body
  body.classList.toggle('dark');
  console.log('Current body classes:', body.classList);

  // Save theme to local storage
  this.storage.set('theme', body.classList.contains('dark') ? 'dark' : 'light')
    .then(() => {
      console.log('Theme saved to storage:', body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Check the saved theme from storage and apply it
  async checkTheme() 
  {
    const savedTheme = await this.storage.get('theme');
    console.log('Saved theme from storage:', savedTheme);
  
    if (savedTheme) 
      {
      // Apply the saved theme to the body
      document.body.classList.add(savedTheme);
      console.log('Applied theme:', savedTheme);
    }
  }
}


