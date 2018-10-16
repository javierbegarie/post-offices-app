import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flatten'
})
export class FlattenPipe implements PipeTransform {

  transform(value: any,skip?:string[]): string {
    let values = [];
    for(let prop in value){
      if(value.hasOwnProperty(prop) && skip.length && !skip.includes(prop) ){
        values.push(value[prop]);
      }
    }
    return values.join(' - ');
  }

}
