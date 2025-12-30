import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitVisualizer } from './git-visualizer';

describe('GitVisualizer', () => {
  let component: GitVisualizer;
  let fixture: ComponentFixture<GitVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitVisualizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitVisualizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
