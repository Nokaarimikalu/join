import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanAddComponent } from './kanban-add.component';

describe('KanbanAddComponent', () => {
  let component: KanbanAddComponent;
  let fixture: ComponentFixture<KanbanAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
