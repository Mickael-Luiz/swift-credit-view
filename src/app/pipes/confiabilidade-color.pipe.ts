import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'confiabilidadeColor',
  standalone: true
})
export class ConfiabilidadeColorPipe implements PipeTransform {

  transform(value: string, colorType: string): string {
    let backgroundColor = '';
    let color = '';

    switch (value) {
      case 'Alta':
        backgroundColor = '#d6f2d3';
        color = '#006400';
        break;
      case 'Média':
        backgroundColor = '#ffe0b3';
        color = '#cc6600';
        break;
      case 'Baixa':
        backgroundColor = '#ffcece';
        color = '#660000';
        break;
      default:
        backgroundColor = '#e0e0e0';
        color = '#808080';
        break;
    }

    return colorType === 'backgroundColor' ? backgroundColor : color;
  }

}
