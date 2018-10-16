import { Pipe, PipeTransform } from '@angular/core';
import { DataSearchTablePipe } from '../components/shared/data-search-table/data-search-table.component';
import { TitleCasePipe } from '@angular/common';
import { EllipsisPipe } from './ellipsis.pipe';
import { FlattenPipe } from './flatten.pipe';

/*
  Due to Angular's interpolation sintax doesn't support to have multiple  

*/

@Pipe({
  name: 'pipeSwitch'
})
export class PipeSwitchPipe implements PipeTransform {

  transform(value: any, pipeName:string): any {
    switch(pipeName){
      case(DataSearchTablePipe.TITLE_CASE): return new TitleCasePipe().transform(value);
      case(DataSearchTablePipe.PRE_ELLIPSIS): return new EllipsisPipe().transform(value, 4 , true);
      case(DataSearchTablePipe.POST_ELLIPSIS): return new EllipsisPipe().transform(value, 4 );
      case(DataSearchTablePipe.FLATTEN): return new FlattenPipe().transform(value,['id']);
      default: return value
    }
  }

}
