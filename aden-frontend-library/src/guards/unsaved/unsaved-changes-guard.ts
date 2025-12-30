// unsaved-changes.guard.ts
import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../../interface/can-deactivate.interface';

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> =
  (component) => {
    return component.canDeactivate();
  };
