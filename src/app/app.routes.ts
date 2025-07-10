import { Routes } from '@angular/router';
import { ContactsComponent } from "../app/contacts/contacts.component";
import { KanbanEditComponent } from './kanban/kanban-edit/kanban-edit.component';
export const routes: Routes = [
  {path: '', component:KanbanEditComponent}
];
// { path: '', component: ContactsComponent },