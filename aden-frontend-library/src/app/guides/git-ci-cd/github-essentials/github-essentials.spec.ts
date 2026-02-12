import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubEssentials } from './github-essentials';

describe('GithubEssentials', () => {
  let component: GithubEssentials;
  let fixture: ComponentFixture<GithubEssentials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubEssentials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubEssentials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
