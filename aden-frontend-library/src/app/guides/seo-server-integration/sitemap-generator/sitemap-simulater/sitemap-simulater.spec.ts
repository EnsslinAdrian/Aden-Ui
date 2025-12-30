import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapSimulater } from './sitemap-simulater';

describe('SitemapSimulater', () => {
  let component: SitemapSimulater;
  let fixture: ComponentFixture<SitemapSimulater>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitemapSimulater]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitemapSimulater);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
