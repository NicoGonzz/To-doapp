import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss'
})
export class TestsComponent {
  descripcion = 'To do app made with Angular 17';
  tasks = signal([
    ' Casa',
    ' Cocina',
    ' Baño'
  ]);
  name = signal('Nicolas');
  disabled = true;
  imgRender = 'https://picsum.photos/200';

  person = signal({
    name: 'admin',
    age: 19,
    img: 'https://picsum.photos/200/300.jpg'
  });

  colorControl = new FormControl();
  widthControl = new FormControl(50,{
    nonNullable: true,
  });

  constructor(){
    this.colorControl.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

//LLamadas a los metodos
inputValue: string = '';
//Metodos
  clickHandler(){
  alert('Estas presionando el boton');
  }

  doubleClick(){
    alert('Estas presionando el segundo boton');
  }

  changeInput(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  changeAge(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(estadoAnterior =>{
      return{
        ...estadoAnterior,
        age: parseInt(newValue,10)
      }
    })
  }
  changeName(event:Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(estadoAnterior =>{
      return{
        ...estadoAnterior,
        name: newValue,
      }
    })
  }
  keyDownHandler(event: KeyboardEvent){
      const input = event.target as HTMLInputElement;
      console.log(input.value);
      this.inputValue = input.value;
    }
}
