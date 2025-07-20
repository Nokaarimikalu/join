import { Routes } from '@angular/router';
import { ContactsComponent } from "../app/contacts/contacts.component";
import { KanbanEditComponent } from './kanban/kanban-edit/kanban-edit.component';
import { KanbanComponent } from "./kanban/kanban.component";
import { KanbanAddComponent } from "./kanban/kanban-add/kanban-add.component";
import { HelpMeComponent } from './shared/help-me/help-me.component';
import { PrivacyComponent } from './shared/privacy/privacy.component';
import { LegalNoticeComponent } from './shared/legal-notice/legal-notice.component';
import { SummaryComponent } from './summary/summary.component';
import { LoginComponent } from './login/login.component';
import { SignupOverlayComponent } from './signup-overlay/signup-overlay.component';



export const routes: Routes = [
  {path: '', component:SummaryComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupOverlayComponent},
  {path: 'summary', component:SummaryComponent},
  {path: 'privacy', component:PrivacyComponent},
  {path: 'help', component:HelpMeComponent},
  {path: 'legalNotice', component:LegalNoticeComponent},
  {path: 'task', component:KanbanAddComponent},
  {path: 'board', component:KanbanComponent},
  {path: 'contacts', component: ContactsComponent },
];
