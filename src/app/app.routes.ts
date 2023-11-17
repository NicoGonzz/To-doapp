import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TestsComponent } from './pages/tests/tests.component';

export const routes: Routes = [
          {
            path: '', component: HomeComponent
          },
          {
            path: 'tests', component: TestsComponent
          }
];
