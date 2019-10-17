import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(arr: any[], searchValue: string) {
    if (!searchValue) return arr;

    return arr.filter((value: any) => {
      return value.description.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    });
  }
}
