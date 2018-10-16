import { Component, OnInit } from '@angular/core';
import { OfficeService } from '../../../services/office.service';
import { MatTableDataSource } from '@angular/material';
import Office from '../../../model/office';
import { DataSearchTableConfig } from '../../shared/data-search-table/data-search-table.component';

@Component({
  selector: 'app-office-page',
  templateUrl: './office-page.component.html',
  styleUrls: ['./office-page.component.css']
})
export class OfficePageComponent implements OnInit {

  officesTableConfig: DataSearchTableConfig<Office>;
  constructor(private officeService: OfficeService) { 

    this.officesTableConfig = {
      columns:[
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
      dataStream: this.officeService.getOffices
    }

  }

  ngOnInit() {
    
  }
}
