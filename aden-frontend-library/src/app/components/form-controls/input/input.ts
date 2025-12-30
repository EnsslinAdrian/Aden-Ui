import { Component } from '@angular/core';
import { FilterItem, ComponentsFilter } from '../../../shared/layout/components-filter/components-filter';
import { ComponentsHeadline } from "../../../shared/layout/components-headline/components-headline";
import { LiquidBorderInput } from "./animation/liquid-border-input/liquid-border-input";
import { CircuitLoaderInput } from "./animation/circuit-loader-input/circuit-loader-input";
import { FloatingLabelDateInput } from "./type-date/floating-label-date-input/floating-label-date-input";
import { PasswordInputWithToggle } from "./type-password/password-input-with-toggle/password-input-with-toggle";
import { NeonFocusInput } from "./type-text/neon-focus-input/neon-focus-input";
import { TextInputNeonStyle } from "./type-text/text-input-neon-style/text-input-neon-style";
import { FloatingLabelInput } from "./type-text/floating-label-input/floating-label-input";
import { RoundedIconSearch } from "./type-text/rounded-icon-search/rounded-icon-search";

@Component({
  selector: 'app-input',
  imports: [
    ComponentsFilter,
    ComponentsHeadline,
    LiquidBorderInput,
    CircuitLoaderInput,
    FloatingLabelDateInput,
    PasswordInputWithToggle,
    NeonFocusInput,
    TextInputNeonStyle,
    FloatingLabelInput,
    RoundedIconSearch
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  myFilters: FilterItem[] = [
    { label: 'Text & Standard', targetId: 'text' },
    { label: 'Security', targetId: 'password' },
    { label: 'Date & Time', targetId: 'date' },
    { label: 'Animation FX', targetId: 'animation' },
  ];
}
