import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanEditComponent } from './kanban-edit.component';

describe('KanbanEditComponent', () => {
  let component: KanbanEditComponent;
  let fixture: ComponentFixture<KanbanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
