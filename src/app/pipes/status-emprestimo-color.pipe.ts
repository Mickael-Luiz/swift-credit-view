import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusEmprestimoColor',
  standalone: true
})
export class StatusEmprestimoColorPipe implements PipeTransform {

  transform(value: string, colorType: string): string {
    let light = '';
    let dark = '';

    switch (value) {
      case 'PENDENTE':
        light = '#FFF9EF';
        dark = '#FF7F00';
        break;
      case 'CONCLUIDO':
        light = '#E4FFED';
        dark = 'green';
        break;
      case 'ATRASADO':
        light = '#FFF1F1';
        dark = 'red';
        break;
      default:
        light = '#F1F1F1';
        dark = 'gray';
        break;
    }

    return colorType === 'light' ? light : dark;
  }

}
