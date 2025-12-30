import { Routes } from "@angular/router";
import { premiumGuard } from "../../guards/premium/premium-guard";

export const COMPONENT_ROUTES: Routes = [
  // -------------------------------------------------------------------------
  // Form Controls
  // -------------------------------------------------------------------------
  {
    path: 'components/input',
    loadComponent: () => import('../components/form-controls/input/input').then(m => m.Input),
    canActivate: [premiumGuard],
    data: {
      title: 'Angular Input Fields',
      description: 'Flexible text fields with validation, floating labels, icons, and prefix/suffix support.',
      breadcrumb: 'Inputs'
    }
  },
  {
    path: 'components/autocomplete',
    loadComponent: () => import('../components/form-controls/autocomplete/autocomplete').then(m => m.Autocomplete),
    canActivate: [premiumGuard],
    data: {
      title: 'Autocomplete & Typeahead',
      description: 'Smart search input with dropdown suggestions, filtering, and highlighting.',
      breadcrumb: 'Autocomplete'
    }
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('../components/form-controls/checkbox/checkbox').then(m => m.Checkbox),
    canActivate: [premiumGuard],
    data: {
      title: 'Custom Checkbox',
      description: 'Animated checkboxes with indeterminate state and full keyboard control.',
      breadcrumb: 'Checkbox'
    }
  },
  {
    path: 'components/radio',
    loadComponent: () => import('../components/form-controls/radio/radio').then(m => m.Radio),
    canActivate: [premiumGuard],
    data: {
      title: 'Radio Button Group',
      description: 'Accessible radio buttons for selection groups with custom styling.',
      breadcrumb: 'Radio'
    }
  },
  {
    path: 'components/formfield',
    loadComponent: () => import('../components/form-controls/formfield/formfield').then(m => m.Formfield),
    canActivate: [premiumGuard],
    data: {
      title: 'Form Field Wrapper',
      description: 'Unified container for inputs. Automatically manages labels, error messages, and hints.',
      breadcrumb: 'Form Field'
    }
  },
  {
    path: 'components/slider',
    loadComponent: () => import('../components/form-controls/slider/slider').then(m => m.Slider),
    canActivate: [premiumGuard],
    data: {
      title: 'Range Slider',
      description: 'Sliders for numeric values. Continuous or stepped, perfect for settings.',
      breadcrumb: 'Slider'
    }
  },
  {
    path: 'components/range',
    loadComponent: () => import('../components/form-controls/range/range').then(m => m.Range),
    canActivate: [premiumGuard],
    data: {
      title: 'Date & Number Range Picker',
      description: 'Selection of value ranges. Ideal for filters, price ranges, or time periods.',
      breadcrumb: 'Range'
    }
  },
  {
    path: 'components/button',
    loadComponent: () => import('../components/form-controls/button/button').then(m => m.Button),
    canActivate: [premiumGuard],
    data: {
      title: 'Angular Buttons',
      description: 'Versatile buttons: primary, secondary, ghost, icon buttons, and loading states with ripple effect.',
      breadcrumb: 'Button'
    }
  },

  // -------------------------------------------------------------------------
  // Navigation
  // -------------------------------------------------------------------------
  {
    path: 'components/tap',
    loadComponent: () => import('../components/navigation/tap/tap').then(m => m.Tap),
    canActivate: [premiumGuard],
    data: {
      title: 'Tab Navigation',
      description: 'Organize content in tabs. Animated indicator and lazy-loading support for tab content.',
      breadcrumb: 'Tabs'
    }
  },
  {
    path: 'components/menu',
    loadComponent: () => import('../components/navigation/menu/menu').then(m => m.Menu),
    canActivate: [premiumGuard],
    data: {
      title: 'Dropdown Menu',
      description: 'Overlay menus for actions and navigation. Intelligently positioned at the trigger.',
      breadcrumb: 'Menu'
    }
  },

  // -------------------------------------------------------------------------
  // Media & Interaction
  // -------------------------------------------------------------------------
  {
    path: 'components/drag-and-drop',
    loadComponent: () => import('../components/media-interaction/drag-and-drop/drag-and-drop').then(m => m.DragAndDrop),
    canActivate: [premiumGuard],
    data: {
      title: 'Drag & Drop Lists',
      description: 'Intuitive drag & drop interactions. Sort lists or move items between containers.',
      breadcrumb: 'Drag & Drop'
    }
  },

  // -------------------------------------------------------------------------
  // Typography
  // -------------------------------------------------------------------------
  {
    path: 'components/text-component',
    loadComponent: () => import('../components/typography/text-component/text-component').then(m => m.TextComponent),
    canActivate: [premiumGuard],
    data: {
      title: 'Typography System',
      description: 'Consistent text styles, headlines, and responsive typography components for your app.',
      breadcrumb: 'Typography'
    }
  },

  // -------------------------------------------------------------------------
  // Layout
  // -------------------------------------------------------------------------
  {
    path: 'components/expansion-panel',
    loadComponent: () => import('../components/layout/expanison-panel/expansion-panel').then(m => m.ExpansionPanel),
    canActivate: [premiumGuard],
    data: {
      title: 'Accordion / Expansion Panel',
      description: 'Expandable sections to save space. Perfect for FAQ sections or detail views.',
      breadcrumb: 'Expansion Panel'
    }
  },
  {
    path: 'components/grid',
    loadComponent: () => import('../components/layout/grid/grid').then(m => m.Grid),
    canActivate: [premiumGuard],
    data: {
      title: 'Responsive Grid Layout',
      description: 'A powerful grid system based on CSS Grid/Flexbox for responsive designs.',
      breadcrumb: 'Grid'
    }
  },
  {
    path: 'components/scrollbar',
    loadComponent: () => import('../components/layout/scrollbar/scrollbar').then(m => m.Scrollbar),
    canActivate: [premiumGuard],
    data: {
      title: 'Custom Scrollbar',
      description: 'Styling for scrollbars. Ensure a consistent look and feel across all browsers and operating systems.',
      breadcrumb: 'Scrollbar'
    }
  },

  // -------------------------------------------------------------------------
  // Feedback & Indicators
  // -------------------------------------------------------------------------
  {
    path: 'components/tooltip',
    loadComponent: () => import('../components/feedback-indicators/tootltip/tootltip').then(m => m.Tootltip),
    canActivate: [premiumGuard],
    data: {
      title: 'Angular Tooltip',
      description: 'Informative popups on hover. Positioning automatically calculated.',
      breadcrumb: 'Tooltip'
    }
  },
  {
    path: 'components/snackbar',
    loadComponent: () => import('../components/feedback-indicators/snackbar/snackbar').then(m => m.Snackbar),
    canActivate: [premiumGuard],
    data: {
      title: 'Snackbar / Toast Notifications',
      description: 'Non-intrusive notifications at the screen edge. Ideal for success messages or info.',
      breadcrumb: 'Snackbar'
    }
  },
  {
    path: 'components/progress',
    loadComponent: () => import('../components/feedback-indicators/progress/progress').then(m => m.Progress),
    canActivate: [premiumGuard],
    data: {
      title: 'Progress Indicators & Spinner',
      description: 'Loading bars and spinners. Show your users that background work is in progress.',
      breadcrumb: 'Progress'
    }
  },
  {
    path: 'components/badge',
    loadComponent: () => import('../components/feedback-indicators/badge/badge').then(m => m.Badge),
    canActivate: [premiumGuard],
    data: {
      title: 'Notification Badge',
      description: 'Small counters and status indicators on icons or buttons.',
      breadcrumb: 'Badge'
    }
  },
  {
    path: 'components/dialog',
    loadComponent: () => import('../components/feedback-indicators/dialog/dialog').then(m => m.Dialog),
    canActivate: [premiumGuard],
    data: {
      title: 'Modal Dialog',
      description: 'Overlay windows for confirmations, forms, or important information. Fully customizable.',
      breadcrumb: 'Dialog'
    }
  },
  {
    path: 'components/confetti',
    loadComponent: () => import('../components/feedback-indicators/confetti/confetti').then(m => m.Confetti),
    canActivate: [premiumGuard],
    data: {
      title: 'Confetti Animation Effect',
      description: 'Celebrate achievements! Performant canvas-based confetti explosions for gamification moments.',
      breadcrumb: 'Confetti'
    }
  },

  // -------------------------------------------------------------------------
  // Dynamic Viewer (Fallback)
  // -------------------------------------------------------------------------
  {
    path: 'components/:subcategory/:slug',
    loadComponent: () => import('../user/components-viewer/components-viewer').then(m => m.ComponentsViewer)

  },
];
