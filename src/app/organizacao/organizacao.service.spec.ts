import { TestBed } from '@angular/core/testing';

import { OrganizacaoService } from './organizacao.service';

describe('OrganizacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizacaoService = TestBed.get(OrganizacaoService);
    expect(service).toBeTruthy();
  });
});
