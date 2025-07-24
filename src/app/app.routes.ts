import { Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
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
import { PrivacySignInComponent } from './shared/privacy-sign-in/privacy-sign-in.component';
import { LegalNoticeSignInComponent } from './shared/legal-notice-sign-in/legal-notice-sign-in.component';

const redirectUnauthorizedToLogIn = () => redirectUnauthorizedTo(['/login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['/']);
const redirectLoggedInToprivacy = () => redirectLoggedInTo(['/privacy']);
const redirectLoggedInToLegal = () => redirectLoggedInTo(['/legalNotice']);
const redirectUnauthorizedToPrivacy = () => redirectUnauthorizedTo(['/privacy-sign-in']);
const redirectUnauthorizedToLegal = () => redirectUnauthorizedTo(['/legal-notice-sign-in']);


export const routes: Routes = [
  {path: '', redirectTo: '/summary', pathMatch: 'full'},
  {path: 'login', component:LoginComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToItems}},
  {path: 'signup', component:SignupOverlayComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToItems}},
  {path: 'summary', component:SummaryComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogIn}},
  {path: 'privacy', component:PrivacyComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToPrivacy}},
  {path: 'help', component:HelpMeComponent,  canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogIn}},
  {path: 'legalNotice', component:LegalNoticeComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLegal}},
  {path: 'task', component:KanbanAddComponent,  canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogIn}},
  {path: 'board', component:KanbanComponent,  canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogIn}},
  {path: 'contacts', component: ContactsComponent,  canActivate: [AuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogIn}},
  {path: 'privacy-sign-in', component: PrivacySignInComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToprivacy} },
  {path: 'legal-notice-sign-in', component: LegalNoticeSignInComponent, canActivate: [AuthGuard], data: {authGuardPipe: redirectLoggedInToLegal}}
];
