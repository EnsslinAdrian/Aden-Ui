import { Component } from '@angular/core';
import { Notice } from "../../../shared/ui/notice/notice";
import { FormsModule } from '@angular/forms';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { PropertyBindingInteractiveDemo } from "./property-binding-interactive-demo/property-binding-interactive-demo";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-property-binding',
  imports: [Notice, FormsModule, HeadlineGuides, PropertyBindingInteractiveDemo, CodeBlockGuide],
  templateUrl: './property-binding.html',
  styleUrl: './property-binding.scss',
})
export class PropertyBinding {

  // 1. Standard Binding
  standardBindingCode = `<!-- 1. Dynamic Attributes (Expects string) -->
<img [src]="userProfileImage" alt="User Avatar">

<!-- 2. Boolean Properties (Expects boolean) -->
<!-- If isProcessing is true, the button is disabled -->
<button [disabled]="isProcessing">
  Save Changes
</button>

<!-- 3. Component Communication (@Input) -->
<!-- We pass the entire 'currentUser' object to the child -->
<app-user-card [user]="currentUser"></app-user-card>`;

  // 2. Special Bindings (Class & Style)
  specialBindingCode = `<!-- 1. Style Binding -->
<!-- Logic directly in the template: Red if error, Green if fine -->
<div [style.color]="isError ? 'red' : 'green'">
  {{ statusMessage }}
</div>

<!-- 2. Single Class Binding (The Clean Way) -->
<!-- Adds the class 'active' ONLY if isActive is true -->
<div [class.active]="isActive">
  Tab Content
</div>

<!-- 3. Multiple Classes (Object Syntax) -->
<div [ngClass]="{ 'valid': isValid, 'required': isRequired }">
  Form Field
</div>`;

}
