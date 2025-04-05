import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotProductFoundComponent } from './not-product-found.component';

describe('NotProductFoundComponent', () => {
  let component: NotProductFoundComponent;
  let fixture: ComponentFixture<NotProductFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotProductFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotProductFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
