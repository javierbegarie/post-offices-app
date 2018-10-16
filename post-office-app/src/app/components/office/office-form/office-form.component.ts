import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.css']
})
export class OfficeFormComponent implements OnInit {

  officeForm = this._fb.group({
    postalCode: ['', 
      Validators.required,
      Validators.pattern('^8[0-9]{4}')
    ],
    name: ['',
      Validators.required,
      Validators.min(3),
      Validators.max(50),
      Validators.pattern('[a-zA-Z ]*')
    ]
  });
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
  }

}
