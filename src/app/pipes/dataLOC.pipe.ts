import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataLoc',
  standalone: true
})
export class DataLocPipe implements PipeTransform {

  transform(value: string): string {
    const arrayData = value.split('-')
    const ano = arrayData[0]
    const mes = arrayData[1]
    const dia = arrayData[2]

    return `${dia}/${mes}/${ano}`
  }

}
