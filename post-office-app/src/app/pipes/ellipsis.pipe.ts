import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  /* Created for a better object Id presentation */

  transform(value: string, shownChars:number, ahead?:boolean): string {
    return ahead? `... ${value.substring(value.length - shownChars)}`: 
                  `${value.substring(0, shownChars)} ...`;
  }

}
