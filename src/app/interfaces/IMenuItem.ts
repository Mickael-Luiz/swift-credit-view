import { MenuItem } from "primeng/api"

export interface IMenuItem {
  lista: CustomMenuItem[]
}

export interface CustomMenuItem extends MenuItem {
  isActive?: boolean;
}