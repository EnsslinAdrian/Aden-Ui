import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubBasicsLiveDemo } from './github-basics-live-demo';

describe('GithubBasicsLiveDemo', () => {
  let component: GithubBasicsLiveDemo;
  let fixture: ComponentFixture<GithubBasicsLiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubBasicsLiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubBasicsLiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
