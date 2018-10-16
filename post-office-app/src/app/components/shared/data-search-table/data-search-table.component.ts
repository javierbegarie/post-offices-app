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
    this.columns = this.config.columns;
    this.displayedColumns = this.columns.map(c=>c.name);
    this.config.dataStream().subscribe(data=>{
      console.log(data);
      this.dataSource.data = data;
    });
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
  titleCase?:boolean;
}

export interface DataSearchTableConfig<T>{
  columns:DataSeachColumnInterface[];
  dataStream: ()=>Observable<T[]>
}
