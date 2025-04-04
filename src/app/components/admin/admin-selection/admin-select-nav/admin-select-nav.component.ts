import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-select-nav',
  imports: [],
  templateUrl: './admin-select-nav.component.html',
  styleUrl: './admin-select-nav.component.css'
})
export class AdminSelectNavComponent {

  @Input() items: string[] = [];
  @Input() displayedItems?: string[];
  @Input() selectedItems: boolean[] = [];
  @Output() deleteRequest = new EventEmitter<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  search(keyword: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: keyword }
    });
  }

  get hasSelectedItems(): boolean {
    return this.selectedItems.some(item => item);
  }

  requestDelete() {
    this.deleteRequest.emit();
  }
}
