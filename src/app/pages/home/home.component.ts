import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
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
  ]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByfilter = computed(()=>{
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed)
    }
    if(filter === 'completed'){
      return tasks.filter(task => task.completed)
    }
    return tasks;
  })

    newTaskControl = new FormControl('',{
      nonNullable: true,
      validators:
        Validators.required,
    });

    injector = inject(Injector);

    ngOnInit(){
        const storage = localStorage.getItem('tasks');
        if(storage){
          const tasks = JSON.parse(storage);
          this.tasks.set(tasks);
        }
        this.trackTasks();
    }

    trackTasks(){
      effect(()=>{
        const tasks  = this.tasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
      },{injector: this.injector})
    }

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

  changeFilter(filter:'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }
}
