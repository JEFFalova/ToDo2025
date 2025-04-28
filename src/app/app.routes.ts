import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'atu',
    loadComponent: () => import('./atu/atu.page').then( m => m.AtuPage)
  },
  {
    path: 'to-do',
    loadComponent: () => import('./to-do/to-do.page').then( m => m.ToDoPage)
  },
];
