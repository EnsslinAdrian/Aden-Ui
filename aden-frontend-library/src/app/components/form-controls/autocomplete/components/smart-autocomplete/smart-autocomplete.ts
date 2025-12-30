import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UiPlayground } from "../../../../../shared/ui/ui-playground/ui-playground";
import { BaseUi, FileType } from '../../../../../shared/base/base-ui/base-ui';
import { ComponentMeta } from '../../../../../../interface/component-meta';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-smart-autocomplete',
  imports: [UiPlayground, FormsModule],
  templateUrl: './smart-autocomplete.html',
  styleUrl: './smart-autocomplete.scss',
})
export class SmartAutocomplete extends BaseUi {
  override meta: ComponentMeta = {
    title: 'Smart Autocomplete',
    description: 'An intelligent input field with suggestion list and keyboard navigation.',
    slug: 'smart-autocomplete',
  };

  get FILE_CATEGORY() { return 'form-controls'; }
  get FILE_COMPONENT() { return 'autocomplete'; }
  get FILE_VERSION() { return this.meta.slug; }

  override get filesToLoad(): FileType[] {
    return ['html', 'scss', 'ts'];
  }

  @ViewChild('dropdown') dropdownRef!: ElementRef;

  options: string[] = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Grape', 'Lemon',
    'Mango', 'Orange', 'Peach', 'Pear', 'Pineapple',
    'Strawberry', 'Watermelon'
  ];

  filteredOptions: string[] = [];
  inputValue: string = '';
  activeIndex: number = -1;
  isDropdownOpen: boolean = false;


  /**
   * Filters options based on input value and updates dropdown state.
   */
  onInputChange() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.inputValue.toLowerCase())
    );
    this.activeIndex = -1;
    this.isDropdownOpen = this.filteredOptions.length > 0;
  }

  /**
   * Handles focus event on input.
   * Filters options based on current input value and opens dropdown if options exist.
   */
  onFocus() {
    if (!this.inputValue) {
      this.filteredOptions = [...this.options];
    } else {
      this.onInputChange();
    }
    this.isDropdownOpen = this.filteredOptions.length > 0;
  }

  /**
   * Handles keyboard navigation for the dropdown menu.
   * @param event - The keyboard event
   */
  onKeyDown(event: KeyboardEvent) {
    if (!this.isDropdownOpen) return;
    const dropdownEl = document.querySelector('.dropdown');

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % this.filteredOptions.length;
      this.scrollIntoView(dropdownEl, this.activeIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex - 1 + this.filteredOptions.length) % this.filteredOptions.length;
      this.scrollIntoView(dropdownEl, this.activeIndex);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (this.activeIndex >= 0) {
        this.selectOption(this.filteredOptions[this.activeIndex]);
      }
    } else if (event.key === 'Escape') {
      this.isDropdownOpen = false;
    }
  }

  /**
   * Scrolls a dropdown element to make the item at the specified index visible.
   * @param dropdown - The dropdown container element
   * @param index - Index of the item to scroll into view
   */
  scrollIntoView(dropdown: Element | null, index: number) {
    if (!dropdown) return;

    const items = dropdown.querySelectorAll('.dropdown-item');
    if (!items[index]) return;

    const item = items[index] as HTMLElement;
    const dropdownHeight = dropdown.clientHeight;
    const dropdownScrollTop = dropdown.scrollTop;
    const itemOffsetTop = item.offsetTop;
    const itemHeight = item.offsetHeight;

    if (itemOffsetTop < dropdownScrollTop) {
      dropdown.scrollTop = itemOffsetTop;
    } else if (itemOffsetTop + itemHeight > dropdownScrollTop + dropdownHeight) {
      dropdown.scrollTop = itemOffsetTop + itemHeight - dropdownHeight;
    }
  }

  /**
   * Selects an option and updates the input value.
   * @param option - The selected option value
   */
  selectOption(option: string) {
    this.inputValue = option;
    this.filteredOptions = [];
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  /**
   * Closes the dropdown when clicking outside of it.
   * @param event - The mouse click event
   */
  onClickOutside(event: MouseEvent) {
    if (this.dropdownRef && !this.dropdownRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}
