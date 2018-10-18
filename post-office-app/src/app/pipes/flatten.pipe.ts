import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flatten'
})
export class FlattenPipe implements PipeTransform {

  transform(value: any, skip:string[]=[], separator = ' - '): string {
    /**
     *  Show a javascript object as plain string. For example:
     * { name: 'John' , lastName: 'Smith' } | flatten => John - Smith 
     * Skip param is for skip certain properties to be shown, like id.
     */
    let values = [];
    for(let prop in value){
      if(value.hasOwnProperty(prop) && !skip.includes(prop) ){
        values.push(value[prop]);
      }
    }
    return values.join(separator);
  }

}
