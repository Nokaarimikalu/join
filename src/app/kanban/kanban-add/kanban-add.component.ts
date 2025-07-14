import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskItem } from '../../shared/interface/task.interface';
import { TaskService } from '../../services/addtask/task.service';
import { OverlayState } from '../../services/contacts/overlayState.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-kanban-add',
  imports: [TaskItem, OverlayState, TaskService],
  templateUrl: './kanban-add.component.html',
  styleUrls: ['./kanban-add.component.scss']
})
export class KanbanAddComponent {
  taskForm: FormGroup;
  users: any[] = [];
  selectedUsers: string[] = [];
  subtasks: string[] = [];
  newSubtask: string = '';
  priority: string = 'medium';
  isUserDropdownOpen = false;
  allUsers: any;
  filteredUsers: any[] | undefined;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: OverlayState
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      category: ['']
    });

    this.loadUsers();
  }

  async loadUsers() {
  try {
    this.allUsers = await lastValueFrom(this.userService.getContacts());
    this.filteredUsers = [...this.allUsers];
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  toggleUserSelection(userId: string): void {
    const index = this.selectedUsers.indexOf(userId);
    if (index === -1) {
      this.selectedUsers.push(userId);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  isUserSelected(userId: string): boolean {
    return this.selectedUsers.includes(userId);
  }

  setPriority(priority: string): void {
    this.priority = priority;
  }

  addSubtask(): void {
    if (this.newSubtask.trim()) {
      this.subtasks.push(this.newSubtask.trim());
      this.newSubtask = '';
    }
  }

  removeSubtask(index: number): void {
    this.subtasks.splice(index, 1);
  }

  clearForm(): void {
    this.taskForm.reset();
    this.selectedUsers = [];
    this.subtasks = [];
    this.priority = 'medium';
    this.isUserDropdownOpen = false;
  }

  async createTask() {
    if (this.taskForm.valid) {
      const newTask: TaskItem = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
        priority: this.priority,
        category: this.taskForm.value.category,
        assignedTo: this.selectedUsers.map(userId => ({ user: userId })),
        subTask: this.subtasks,
        status: 'todo'
      };

      try {
        await this.taskService.createTask(newTask);
        console.log('Task created successfully');
        this.clearForm();
        // Hier könntest du eine Erfolgsmeldung anzeigen
      } catch (error) {
        console.error('Error creating task:', error);
        // Hier könntest du eine Fehlermeldung anzeigen
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}