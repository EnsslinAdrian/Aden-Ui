import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubBasics } from './github-basics';

describe('GithubBasics', () => {
  let component: GithubBasics;
  let fixture: ComponentFixture<GithubBasics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubBasics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubBasics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
