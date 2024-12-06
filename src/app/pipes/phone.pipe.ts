import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    value = value.replace(/\D/g, '');

    if (value.length <= 10) {
      return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
      return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
  }

}
