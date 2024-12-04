import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomMenuItem, IMenuItem } from '../../../interfaces/IMenuItem';
import { PrimeIcons } from 'primeng/api';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  listaMenu: CustomMenuItem[] = [
    { label: 'Dashboard', icon: 'fa-chart-pie', routerLink: 'home' },
    { label: 'Clientes', icon: 'fa-users', routerLink: 'clientes' },
  ]



rotaAtiva = ''
menuAberto = false

constructor(private router: Router) {
  setTimeout(() => {
    this.selecionarLink()
  }, 100)
}

setRota(rota: string) {
  this.router.navigate([rota])
  setTimeout(() => {
    this.selecionarLink()
  }, 100)
}

selecionarLink() {
  this.rotaAtiva = this.router.url.split('/')[1] || 'home';
}

expandirMenu() {
  this.menuAberto = true;
}

retrairMenu() {
  this.menuAberto = false;
}

navegar(rota: string) {
  this.router.navigate([rota]);
}

ativarRota(rota: string) {
  const rotaAtual = this.router.url === '/' && rota === 'home' ? '' : rota;
  return this.router.isActive(rotaAtual, {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored'
  })
}

}
