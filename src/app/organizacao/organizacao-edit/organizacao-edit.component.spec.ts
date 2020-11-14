import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacaoEditComponent } from './organizacao-edit.component';

describe('OrganizacaoEditComponent', () => {
  let component: OrganizacaoEditComponent;
  let fixture: ComponentFixture<OrganizacaoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizacaoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
