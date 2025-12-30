import { Component, Input } from '@angular/core';
import { CodeHighlight } from "../code-highlight/code-highlight";
import { Typografie } from "../../text/typografie/typografie";

@Component({
  selector: 'app-code-block-guide',
  imports: [CodeHighlight, Typografie],
  templateUrl: './code-block-guide.html',
  styleUrl: './code-block-guide.scss',
})
export class CodeBlockGuide {
  @Input() headline = '';
  @Input({ required: true }) code = '';
  @Input() filename = '';
  @Input() language = 'typescript';
}
