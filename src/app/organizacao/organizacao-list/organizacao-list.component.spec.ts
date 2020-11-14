import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacaoListComponent } from './organizacao-list.component';

describe('OrganizacaoListComponent', () => {
  let component: OrganizacaoListComponent;
  let fixture: ComponentFixture<OrganizacaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizacaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
