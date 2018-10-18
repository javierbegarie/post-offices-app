import { Component, OnInit, ApplicationRef, ViewChild } from '@angular/core';
import { DataSearchTableConfig, DataSearchTableComponent } from '../../shared/data-search-table/data-search-table.component';
import Office from '../../../model/office';
import { OfficeService } from '../../../services/office.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteConfirmDialogComponent, DialogData } from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit {

  officesTableConfig: DataSearchTableConfig<Office>;
  @ViewChild(DataSearchTableComponent) dataTable: DataSearchTableComponent<Office>;
  constructor(
    private _officeService: OfficeService,  
    private _router: Router,
    public dialog: MatDialog) { 

    this.officesTableConfig = {
      dataColumns:[
        {
          name: 'name',
          header: 'Name',
          property: 'name'
        },
        {
          name: 'postal-code',
          header: 'Postal Code',
          property: 'PLZ'
        }
      ],
      actionColumns:[
        {
          name:'Edit',
          header: 'Edit',
          onclick: this.editOffice
        },
        {
          name:'Delete',
          header: 'Delete',
          onclick: this.deleteOffice
        }
      ],
      dataStream: this._officeService.getOffices
    }

  }

  editOffice = (office:Office)=>{
    this._router.navigate([`offices/update/${office.id}`]);
  }

  deleteOffice = (office:Office)=>{
    const dialogConfig = {
      width: '350px',
      data: {header:'Office',text: `${office.name} - ${office.PLZ}`}
    };

    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent,dialogConfig);
    
    dialogRef.afterClosed().subscribe(confirm => {
      if(confirm === true) {
        this._officeService.deleteOffice(office).subscribe(()=>{
            this.dataTable.refreshList();
        });
      }
    });
  }

  ngOnInit() {
  }

}
