import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OfficeService } from '../../../services/office.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import Office from 'src/app/model/office';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.css']
})
export class OfficeFormComponent implements OnInit {

  officeForm = this._fb.group({
    PLZ: ['', 
      [Validators.required,
        // Five digits starting with 8 i.e. 84945
      Validators.pattern('^8[0-9]{4}')]
    ],
    name: ['',
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-Z ]*')]
    ]
  });

  isNew = true;
  office:Office = null;

  constructor(
    private _fb: FormBuilder, 
    private _officeService: OfficeService,
    private _snackBar: MatSnackBar,
    private _route:ActivatedRoute) {

  }

  ngOnInit() {
    let id = this._route.snapshot.paramMap.get('id');
    if(id){
      this._officeService.getOffice(id).subscribe(office=>{
        this.isNew = false;
        this.office= <Office> office;
        this.officeForm.get('PLZ').setValue(this.office.PLZ);
        this.officeForm.get('name').setValue(this.office.name);
      });
    }
  }

  onSubmit() {
    if(this.isNew){
      this.createOffice();
    }else{
      this.updateOffice();
    }
  }

  createOffice(){
    let { PLZ, name } = this.officeForm.value;
    this._officeService.postOffice(PLZ,name)
    .subscribe(()=>{
      this._snackBar.open(`Office ${name} created successfully`, null ,{duration: 1000});
      this.officeForm.reset();
    });
  }

  updateOffice(){
    let { PLZ, name } = this.officeForm.value;
    let office = new Office( this.office.id, name, PLZ );
    this._officeService.updateOffice(office)
    .subscribe(()=>{
      this._snackBar.open(`Office ${name} updated successfully`, null ,{duration: 1000});
    });
  }
}
