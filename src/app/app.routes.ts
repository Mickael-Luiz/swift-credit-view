import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { EmprestimosClienteComponent } from './pages/emprestimos-cliente/emprestimos-cliente.component';

export const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'clientes', component: ClienteComponent},
    {path: 'emprestimos', component: EmprestimosClienteComponent},
    {path: 'clientes/:id/emprestimos', component: EmprestimosClienteComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
  ]}
];
