import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avaliacaoPipe',
  standalone: true
})
export class AvaliacaoPipe implements PipeTransform {

  transform(value: number): string {
    const filledStars = `<i class="pi pi-star-fill" style="font-size: 13px; color: yellow;"></i>`.repeat(value);
    const emptyStars = `<i class="pi pi-star" style="font-size: 13px;"></i>`.repeat(5 - value);
    return filledStars + emptyStars;
  }

}
