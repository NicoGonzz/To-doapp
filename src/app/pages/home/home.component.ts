import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
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

    newTaskControl = new FormControl('',{
      nonNullable: true,
      validators:
        Validators.required,
    })

  changeInput(){
    if(this.newTaskControl.valid){
      const value = this.newTaskControl.value.trim();
      if(value != ''){
        this.addTask(value);
        this.newTaskControl.setValue('');
      }
    }
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
    });
    /*this.tasks.mutate(state =>{
      const currentTask = state[index];
      state[index] ={
        ...currentTask,
        completed: !currentTask.completed
      }
    })*/
  }

  deleteTask(index: number){ //Tomamos la posicion de la tarea para eliminarla
    this.tasks.update((tasks) => tasks.filter
    ((task, position) => position !== index)); //recibimos el estado de las tasks primeramente
  }

  updateTaskEditingMode(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task,position)=> {
        if (position ===index){
          return {
            ...task,
            editing: true
          }
        }
        return{
          ...task,
          editing: false
        };
      })
    });
  }

  updateTaskEditedText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => {
      return tasks.map((task,position)=> {
        if (position ===index){
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    });

  }
}
