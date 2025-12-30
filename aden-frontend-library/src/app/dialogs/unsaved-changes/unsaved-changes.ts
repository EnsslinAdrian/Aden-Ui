import { Component, Output, EventEmitter } from '@angular/core';
import { CloseBtn } from "../../shared/btn-ui/close-btn/close-btn";
import { CancelBtn } from "../../shared/btn-ui/cancel-btn/cancel-btn";
import { Typografie } from "../../shared/text/typografie/typografie";

@Component({
  selector: 'app-unsaved-changes',
  imports: [CloseBtn, CancelBtn, Typografie],
  templateUrl: './unsaved-changes.html',
  styleUrl: './unsaved-changes.scss',
})
export class UnsavedChanges {
/**
   * Emits true wenn der User die Seite verlassen will (Daten verwerfen).
   * Emits false wenn der User bleiben will.
   */
  @Output() decision = new EventEmitter<boolean>();

  onLeave() {
    this.decision.emit(true);
  }

  onStay() {
    this.decision.emit(false);
  }
}
