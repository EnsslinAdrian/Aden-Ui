import { Type } from "@angular/core";
import { NeonFocusInput } from "../../../app/components/form-controls/input/type-text/neon-focus-input/neon-focus-input";
import { TextInputNeonStyle } from "../../../app/components/form-controls/input/type-text/text-input-neon-style/text-input-neon-style";
import { RoundedIconSearch } from "../../../app/components/form-controls/input/type-text/rounded-icon-search/rounded-icon-search";
import { FloatingLabelInput } from "../../../app/components/form-controls/input/type-text/floating-label-input/floating-label-input";
import { PasswordInputWithToggle } from "../../../app/components/form-controls/input/type-password/password-input-with-toggle/password-input-with-toggle";
import { FloatingLabelDateInput } from "../../../app/components/form-controls/input/type-date/floating-label-date-input/floating-label-date-input";
import { CircuitLoaderInput } from "../../../app/components/form-controls/input/animation/circuit-loader-input/circuit-loader-input";
import { LiquidBorderInput } from "../../../app/components/form-controls/input/animation/liquid-border-input/liquid-border-input";
import { NeonCheckbox } from "../../../app/components/form-controls/checkbox/components/neon-checkbox/neon-checkbox";
import { NeonRadioInput } from "../../../app/components/form-controls/radio/components/neon-radio-input/neon-radio-input";
import { NeonValidationForm } from "../../../app/components/form-controls/formfield/components/neon-validation-form/neon-validation-form";
import { GsapReactiveHoverButton } from "../../../app/components/form-controls/button/components/gsap-reactive-hover-button/gsap-reactive-hover-button";
import { NeonGlowHoverButton } from "../../../app/components/form-controls/button/components/neon-glow-hover-button/neon-glow-hover-button";
import { SmartAutocomplete } from "../../../app/components/form-controls/autocomplete/components/smart-autocomplete/smart-autocomplete";
import { MultiItemSlider } from "../../../app/components/form-controls/slider/components/multi-item-slider/multi-item-slider";
import { NeonRangeSlider } from "../../../app/components/form-controls/range/components/neon-range-slider/neon-range-slider";
import { ContentCarousel } from "../../../app/components/form-controls/slider/components/content-carousel/content-carousel";
import { StatusBadges } from "../../../app/components/feedback-indicators/badge/components/status-badges/status-badges";
import { NeonTooltip } from "../../../app/components/feedback-indicators/tootltip/components/neon-tooltip/neon-tooltip";
import { NeonSnackbar } from "../../../app/components/feedback-indicators/snackbar/components/neon-snackbar/neon-snackbar";
import { NeonProgressBar } from "../../../app/components/feedback-indicators/progress/components/neon-progress-bar/neon-progress-bar";
import { NeonBlurDialog } from "../../../app/components/feedback-indicators/dialog/components/neon-blur-dialog/neon-blur-dialog";
import { ConfettiExplosionEffect } from "../../../app/components/feedback-indicators/confetti/components/confetti-explosion-effect/confetti-explosion-effect";
import { GsapBurstConfetti } from "../../../app/components/feedback-indicators/confetti/components/gsap-burst-confetti/gsap-burst-confetti";
import { NeonDropdownMenu } from "../../../app/components/navigation/menu/components/neon-dropdown-menu/neon-dropdown-menu";
import { NeonTabs } from "../../../app/components/navigation/tap/components/neon-tabs/neon-tabs";
import { TabNavigation } from "../../../app/components/navigation/tap/components/tab-navigation/tab-navigation";
import { KanbanDragDrop } from "../../../app/components/media-interaction/drag-and-drop/components/kanban-drag-drop/kanban-drag-drop";
import { NeonDropzone } from "../../../app/components/media-interaction/drag-and-drop/components/neon-dropzone/neon-dropzone";
import { InteractiveTypography } from "../../../app/components/typography/text-component/components/interactive-typography/interactive-typography";
import { NeonExpansionPanel } from "../../../app/components/layout/expanison-panel/components/neon-expansion-panel/neon-expansion-panel";
import { DynamicExpansionPanel } from "../../../app/components/layout/expanison-panel/components/dynamic-expansion-panel/dynamic-expansion-panel";
import { BentoGridSystem } from "../../../app/components/layout/grid/components/bento-grid-system/bento-grid-system";
import { CustomAreaGrid } from "../../../app/components/layout/grid/components/custom-area-grid/custom-area-grid";
import { NeonRailScrollbar } from "../../../app/components/layout/scrollbar/components/neon-rail-scrollbar/neon-rail-scrollbar";
import { NeonScrollbar } from "../../../app/components/layout/scrollbar/components/neon-scrollbar/neon-scrollbar";



export const COMPONENT_REGISTRY: Record<string, Type<any>> = {
  //Form Controls - Input
  'neon-focus-input': NeonFocusInput,
  'text-input-neon-style': TextInputNeonStyle,
  'rounded-icon-search': RoundedIconSearch,
  'floating-label-input': FloatingLabelInput,
  'password-input-with-toggle': PasswordInputWithToggle,
  'floating-label-date-input': FloatingLabelDateInput,
  'circuit-loader-input': CircuitLoaderInput,
  'liquid-border-input': LiquidBorderInput,

  // Form Controls - Checkbox
  'neon-checkbox': NeonCheckbox,

  // Form Controls - Radio
  'neon-radio-input': NeonRadioInput,

  // Form Controls - Formfield
  'neon-validation-form': NeonValidationForm,

  // Form Controls - Button
  'gsap-reactive-hover-button': GsapReactiveHoverButton,
  'neon-glow-hover-button': NeonGlowHoverButton,

  // Form Controls - Autocomplete
  'smart-autocomplete': SmartAutocomplete,

  // Form Controls - Slider
  'multi-item-slider': MultiItemSlider,
  'content-carousel': ContentCarousel,

  // Form Controls - Range
  'neon-range-slider': NeonRangeSlider,



  //Feedback Indicators - Badge
  'status-badges': StatusBadges,

  //Feedback Indicators - Tooltip
  'neon-tooltip': NeonTooltip,

  //Feedback Indicators - Snackbar
  'neon-snackbar': NeonSnackbar,

  //Feedback Indicators - Progress
  'neon-progress-bar': NeonProgressBar,

  //Feedback Indicators - Dialog
  'neon-blur-dialog': NeonBlurDialog,

  //Feedback Indicators - Confetti
  'confetti-explosion-effect': ConfettiExplosionEffect,
  'gsap-burst-confetti': GsapBurstConfetti,



  // Navigation - Menu
  'neon-dropdown-menu': NeonDropdownMenu,

  // Navigation - Tap
  'neon-tabs': NeonTabs,
  'tab-navigation': TabNavigation,



  // Media & Interaction - Drag and Drop
  'kanban-drag-drop': KanbanDragDrop,
  'neon-dropzone': NeonDropzone,



  // Typography - Text Component
  'interactive-typography': InteractiveTypography,



  // Layout - Expansion-Panel
  'neon-expansion-panel': NeonExpansionPanel,
  'dynamic-expansion-panel': DynamicExpansionPanel,

  // Layout - Grid
  'bento-grid-system': BentoGridSystem,
  'custom-area-grid': CustomAreaGrid,

  // Layout - Scrollbar
  'neon-rail-scrollbar': NeonRailScrollbar,
  '	neon-scrollbar': NeonScrollbar,
};
