import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSearchTableComponent } from './data-search-table.component';

describe('DataSearchTableComponent', () => {
  let component: DataSearchTableComponent;
  let fixture: ComponentFixture<DataSearchTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSearchTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
