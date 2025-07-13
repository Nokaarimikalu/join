import { Routes } from '@angular/router';
import { ContactsComponent } from "../app/contacts/contacts.component";
import { KanbanEditComponent } from './kanban/kanban-edit/kanban-edit.component';
import { KanbanComponent } from "./kanban/kanban.component";
import { KanbanAddComponent } from "./kanban/kanban-add/kanban-add.component";
import { HelpMeComponent } from './shared/help-me/help-me.component';
import { PrivacyComponent } from './shared/privacy/privacy.component';
import { LegalNoticeComponent } from './shared/legal-notice/legal-notice.component';


export const routes: Routes = [
  {path: '', component:KanbanComponent},
  {path: 'privacy', component:PrivacyComponent},
  {path: 'help', component:HelpMeComponent},
  {path: 'legalNotice', component:LegalNoticeComponent},
  {path: 'task', component:KanbanAddComponent},
  {path: 'board', component:KanbanComponent},
  {path: 'edit', component:KanbanEditComponent},
  {path: 'contacts', component: ContactsComponent },
];
