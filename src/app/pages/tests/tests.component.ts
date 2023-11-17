import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss'
})
export class TestsComponent {
  descripcion = 'To do app made with Angular 17';
  tasks = [
    'Casa',
    'Cocina',
    'Baño'
  ]
}
