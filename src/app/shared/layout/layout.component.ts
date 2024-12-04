import { Component } from '@angular/core';
import { TopbarComponent } from "./topbar/topbar.component";
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopbarComponent, RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
