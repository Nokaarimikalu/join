import { Routes } from '@angular/router';
import { ContactsComponent } from "../app/contacts/contacts.component";
import { KanbanEditComponent } from './kanban/kanban-edit/kanban-edit.component';
import { KanbanComponent } from "./kanban/kanban.component";

export const routes: Routes = [
    {path: '', component:KanbanComponent},
  {path: 'board', component:KanbanComponent},
  {path: 'edit', component:KanbanEditComponent},
  {path: 'contacts', component: ContactsComponent },
];
