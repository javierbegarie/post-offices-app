import { Component, OnInit } from '@angular/core';
import { DataSearchTableConfig } from '../../shared/data-search-table/data-search-table.component';
import Office from '../../../model/office';
import { OfficeService } from '../../../services/office.service';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit {

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
