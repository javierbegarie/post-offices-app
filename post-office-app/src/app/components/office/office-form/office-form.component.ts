import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OfficeService } from '../../../services/office.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.css']
})
export class OfficeFormComponent implements OnInit {

  officeForm = this._fb.group({
    PLZ: ['', 
      [Validators.required,
      Validators.pattern('^8[0-9]{4}')]
    ],
    name: ['',
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-Z ]*')]
    ]
  });
  constructor(
    private _fb: FormBuilder, 
    private _officeService: OfficeService,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }

  onSubmit() {
    let office = this.officeForm.value;
    this._officeService.postOffice(office.PLZ,office.name)
    .subscribe(()=>{
      this._snackBar.open(`Office ${office.name} created successfully`, null ,{duration: 1000});
      this.officeForm.reset();
    });
  }
}
