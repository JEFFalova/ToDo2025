import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs'; // For converting Observable to Promise

// defien structure of each todo item
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private todos: Todo[] = []; // Array to hold the list of To-Dos

  constructor(private storage: Storage, private http: HttpClient) {}

  // Method to initialize storage (needed when using IonicStorage)
  async initStorage() 
  {
    await this.storage.create(); // Create storage instance
  }

  // Method to load todos either from storage or API
  async loadTodos(): Promise<Todo[]> 
  {
    const savedTodos = await this.storage.get('todos'); // Check if todos are saved in storage
    if (savedTodos) 
    {
      // If saved todos found in storage, use them
      this.todos = savedTodos;
    } 
    else 
    {
      // If no todos in storage, get from the API
      const data = this.http.get<Todo[]>('https://jsonblob.com/api/jsonBlob/1366118241017192448');
      this.todos = await firstValueFrom(data); // get and wait for the data
      await this.storage.set('todos', this.todos); // Save them to storage for future use
    }
    return this.todos; // Return the todos
  }

  // Method to add a new todo
  async addTodo(title: string) 
  {
    const newTodo: Todo = 
    {
      id: this.todos.length + 1, // Simple ID logic
      title,
      completed: false, // New todos are not completed
    };
    this.todos.push(newTodo); // Add to the local todos array
    await this.storage.set('todos', this.todos); // Save to storage
  }

  // Method to toggle the completion status of a todo
  async toggleTodoCompletion(todo: Todo) 
  {
    todo.completed = !todo.completed; // Flip the completion status
    await this.storage.set('todos', this.todos); // Save updated todos to storage
  }
  async deleteTodo(todoId: number) 
  {
    this.todos = this.todos.filter(todo => todo.id !== todoId); // Remove todo by ID
    await this.storage.set('todos', this.todos); // Save updated list to storage
  }

  async editTodo(todoId: number, newTitle: string) 
  {
    const todo = this.todos.find(todo => todo.id === todoId);
    if (todo) 
    {
      todo.title = newTitle; // Update the todo title
      await this.storage.set('todos', this.todos); // Save updated list to storage
    }
  }
  // Method to get all todos
  getTodos() 
  {
    return this.todos; // Return the list of todos
  }
}

  
