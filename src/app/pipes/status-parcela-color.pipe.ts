import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusParcelaColor',
  standalone: true
})
export class StatusParcelaColorPipe implements PipeTransform {

  transform(value: string, colorType: string): string {
    let backgroundColor = '';
    let color = '';
    let border = '';

    switch (value) {
      case 'PENDENTE':
        backgroundColor = '#FFF9EF';
        color = '#FF7F00';
        border = '#FF7F00';
        break;
      case 'PAGA':
        backgroundColor = '#ffe0b3';
        color = '#cc6600';
        border = '#ffe9c1e8';
        break;
      case 'ATRASADA':
        backgroundColor = '#ffcece';
        color = '#660000';
        border = '#ffe9c1e8';
        break;
      default:
        backgroundColor = '#e0e0e0';
        color = '#808080';
        border = '#ffe9c1e8';
        break;
    }

    if (colorType === 'backgroundColor') {
      return backgroundColor;
    } else if (colorType === 'color') {
      return color;
    } else {
      return `1px solid ${border}`;
    }
  }

}
