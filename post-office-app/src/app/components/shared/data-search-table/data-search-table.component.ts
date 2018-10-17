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
  /* In case another component needs to change the filter placeholder */
  @Input('placeholder') filterPlaceholder: string = 'Search';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /* Utility object for paginating and filtering data */
  public dataSource = new MatTableDataSource<T>();
  public displayedColumns = [];
  public dataColumns = [];
  public actionColumns = [];

  constructor() { }

  ngOnInit() {

    /* Total data columns */ 
    this.dataColumns = this.config.dataColumns;

    /* Total action columns */ 
    this.actionColumns = this.config.actionColumns || [];

    /* UI displayed columns only */
    this.displayedColumns = [...this.dataColumns.filter(c=>!c.hidden).map(c=>c.name),
                             ...this.actionColumns.map(c=>c.name)]

    /* binding paginator */
    this.dataSource.paginator = this.paginator;

    /* Changing default filter criteria */
    this.dataSource.filterPredicate = this.filterPredicate;

    /* fetching data */
    this.loadData();
  }

  /* Supports for non primitive values filtering */
  filterPredicate = (data: T, filter: string) =>{
      let isObject = p => (p && typeof p === 'object');
      let includes = (p,f)=>p.toString().toLowerCase().includes(f);
      let checkObj = obj => Object.values(obj).some(p=>(!isObject(p) && includes(p,filter)));
 
      let objs = Object.values(data).filter(isObject);
      
      return objs.concat([data]).some(checkObj);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    /* Reset paginator every time filter changes */
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshList(){
    this.loadData();
  }

  private loadData = () =>{
    this.config.dataStream().subscribe(data=>{
      this.dataSource.data = data;
    });
  }
}
export interface DataSearchColumnInterface{
  name:string;
  header:string;
  property:string;
  pipe?:DataSearchTablePipe;
  hidden?:boolean;
}

export interface ActionColumnInterface<T>{
  name:string;
  header:string;
  onclick: (data:T)=>void;
}

export interface DataSearchTableConfig<T>{
  dataColumns:DataSearchColumnInterface[];
  actionColumns?: ActionColumnInterface<T>[];
  dataStream: ()=>Observable<T[]>
}

export enum DataSearchTablePipe{
  TITLE_CASE = 'titlecase',
  PRE_ELLIPSIS = 'pre-ellipsis',
  POST_ELLIPSIS = 'post-ellipsis',
  FLATTEN = 'flatten'
}
