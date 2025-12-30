import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeDialog } from './upgrade-dialog';

describe('UpgradeDialog', () => {
  let component: UpgradeDialog;
  let fixture: ComponentFixture<UpgradeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpgradeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
