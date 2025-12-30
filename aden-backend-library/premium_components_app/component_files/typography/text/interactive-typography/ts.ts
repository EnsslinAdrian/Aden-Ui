import { Component } from '@angular/core';

@Component({
    selector: 'example-component',
    imports: [],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    @Input() text: string = '';
    @Input() size: 'xs' | 'small' | 'base' | 'large' | 'xl' | 'xxl' | 'xxxl' = 'base';
    @Input() color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'white' | 'black' | 'text-light' | 'text-dark' = 'black';
    @Input() weight: 400 | 500 | 600 = 400;
    @Input() align: 'left' | 'center' | 'right' = 'left';

    /* How to use this component */
    // <app-example-component [text]="text" [size]="size" [color]="color" [weight]="weight" [align]="align"></app-example-component>
}
