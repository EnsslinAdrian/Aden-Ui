import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlerSimulator } from './crawler-simulator';

describe('CrawlerSimulator', () => {
  let component: CrawlerSimulator;
  let fixture: ComponentFixture<CrawlerSimulator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrawlerSimulator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrawlerSimulator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
