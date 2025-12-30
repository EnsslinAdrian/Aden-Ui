import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapGenerator } from './sitemap-generator';

describe('SitemapGenerator', () => {
  let component: SitemapGenerator;
  let fixture: ComponentFixture<SitemapGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitemapGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitemapGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
