import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanAddOverlayComponent } from './kanban-add-overlay.component';

describe('KanbanAddOverlayComponent', () => {
  let component: KanbanAddOverlayComponent;
  let fixture: ComponentFixture<KanbanAddOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanAddOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanAddOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
