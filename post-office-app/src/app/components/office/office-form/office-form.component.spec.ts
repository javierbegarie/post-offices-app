import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeFormComponent } from './office-form.component';
import { OfficeService } from 'src/app/services/office.service';
import { OfficeServiceStub } from 'src/app/test/stub/office.service.stub';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBarModule, MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRouteStub, ActivatedRouteStubModifier } from 'src/app/test/stub/activated.route.stub';

describe('OfficeFormComponent', () => {
  let component: OfficeFormComponent;
  let fixture: ComponentFixture<OfficeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeFormComponent ],
      imports:[
        MatCardModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers:[
        {provide: OfficeService, useValue: OfficeServiceStub},
        {provide: ActivatedRoute, useValue: ActivatedRouteStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeFormComponent);
    component = fixture.componentInstance;
  });

  it('Should create instance', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Should call postOffice at valid submitted form', () => {
      ActivatedRouteStubModifier.snapshotParam = null;

      let newOffice = {PLZ: '85652', name:'Test office'};
      const officeService = fixture.debugElement.injector.get(OfficeService);
      component.officeForm.get('PLZ').setValue(newOffice.PLZ);
      component.officeForm.get('name').setValue(newOffice.name);
      spyOn(component,"onSubmit").and.callThrough();
      spyOn(officeService,"postOffice").and.callThrough();

      fixture.autoDetectChanges();

      expect(component.officeForm.valid).toBe(true);

      fixture.nativeElement.querySelector('button[type="submit"]').click();
      
      expect(component.onSubmit).toHaveBeenCalled();
      expect(officeService.postOffice).toHaveBeenCalledWith(newOffice.PLZ,newOffice.name);
  });

  it('Should call updateOffice at editing an office', () => {
    ActivatedRouteStubModifier.snapshotParam = 'mockParam';

    let updateOffice = {PLZ: '85652', name:'Test office',id:'mockId'};
    let newName = 'New Test Office';
    const officeService = fixture.debugElement.injector.get(OfficeService);

    spyOn(officeService,"getOffice").and.callFake(()=>of(updateOffice))
    spyOn(component,"onSubmit").and.callThrough();
    spyOn(officeService,"updateOffice").and.callThrough();

    fixture.detectChanges();

    expect(component.isNew).toBe(false);
    component.officeForm.get('name').setValue(newName);

    fixture.detectChanges();
    expect(component.officeForm.valid).toBe(true);

    fixture.nativeElement.querySelector('button[type="submit"]').click();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(officeService.updateOffice).toHaveBeenCalled();
  });
});
