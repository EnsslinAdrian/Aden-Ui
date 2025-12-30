import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-btn',
  imports: [],
  templateUrl: './auth-btn.html',
  styleUrl: './auth-btn.scss',
})
export class AuthBtn {
  @Input() isLoading: boolean = false;
  @Input() formInvalid: boolean = false;
  @Input() buttonText: string = 'Sign In';
  @Input() loadingText: string = 'Signing In...';
}
