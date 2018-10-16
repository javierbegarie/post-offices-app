import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-data-search-table',
  templateUrl: './data-search-table.component.html',
  styleUrls: ['./data-search-table.component.css']
})
export class DataSearchTableComponent<T> implements OnInit {

  @Input() config: DataSearchTableConfig<T>;
  @Input('showFilter') showFilterInput: boolean = true;
  @Input('placeholder') filterPlaceholder: string = 'Search';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSource = new MatTableDataSource<T>();
  public displayedColumns = [];
  public columns = [];

  constructor() { }

  ngOnInit() {

    /* Total data columns */ 
    this.columns = this.config.columns;

    /* UI displayed columns only */
    this.displayedColumns = this.columns.filter(c=>!c.hidden).map(c=>c.name);

    /* binding paginator */
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = this.filterPredicate;

    /* fetching data */
    this.config.dataStream().subscribe(data=>{
      this.dataSource.data = data;
    });
  }

  /* Supports for non primitive values filtering */
  filterPredicate = (data: T, filter: string) =>{
      let isObject = p => (p && typeof p === 'object');
      let includes = (p,f)=>p.toString().toLowerCase().includes(f);
      let checkObj = obj => {
        let res = Object.values(obj).some(p=>(!isObject(p) && includes(p,filter)));
        console.log(res,obj);
        return res;
      };
      let objs = Object.values(data).filter(isObject);
      
      return objs.concat([data]).some(checkObj);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
export interface DataSeachColumnInterface{
  name:string;
  header:string;
  property:string;
  pipe?:DataSearchTablePipe;
  hidden?:boolean;
}

export interface DataSearchTableConfig<T>{
  columns:DataSeachColumnInterface[];
  dataStream: ()=>Observable<T[]>
}

export enum DataSearchTablePipe{
  TITLE_CASE = 'titlecase',
  PRE_ELLIPSIS = 'pre-ellipsis',
  POST_ELLIPSIS = 'post-ellipsis',
  FLATTEN = 'flatten'
}
