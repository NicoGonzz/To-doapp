import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Arreglar la casa',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Arreglar la Cocina',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Arreglar el baño',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Arreglar el dormitorio',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Arreglar la oficina',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Arreglar el jardin',
      completed: false
    },
  ]);

  changeInput(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
   // this.tasks.update((tasks) => [...tasks,newTask]); //agregamos un nuevo elemento al final del array creando un nuevo estado
  }

  addTask(title:string){
    const newTask ={
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks,newTask]);
  }

  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task,position)=> {
        if (position ===index){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

  deleteTask(index: number){ //Tomamos la posicion de la tarea para eliminarla
    this.tasks.update((tasks) => tasks.filter
    ((task, position) => position !== index)); //recibimos el estado de las tasks primeramente
  }
}
