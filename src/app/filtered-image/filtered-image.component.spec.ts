import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredImageComponent } from './filtered-image.component';

describe('FilteredImageComponent', () => {
  let component: FilteredImageComponent;
  let fixture: ComponentFixture<FilteredImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
