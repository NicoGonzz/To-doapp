import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  tasks = signal([
    ' Casa',
    ' Cocina',
    ' Baño',
    'Dormitorio',
    'Oficina',
    'Jardín',
  ]);

  changeInput(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update((tasks) => [...tasks,newTask]); //agregamos un nuevo elemento al final del array creando un nuevo estado
  }

  deleteTask(index: number){ //Tomamos la posicion de la tarea para eliminarla
    this.tasks.update((tasks) => tasks.filter
    ((task, position) => position !== index)); //recibimos el estado de las tasks primeramente
  }
}
