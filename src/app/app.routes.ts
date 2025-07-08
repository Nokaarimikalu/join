import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpSiteComponent } from './help-site/help-site.component';

export const routes: Routes = [
    {path: '', component: ContactsComponent},
    {path: 'help-site', component:HelpSiteComponent}
];
