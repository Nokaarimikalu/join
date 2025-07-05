import { Component } from '@angular/core';
import { OverlayState } from '../../services/contacts/overlayState.service';

@Component({
    selector: 'app-overlay-contacts',
    imports: [],
    templateUrl: './overlay-contacts.component.html',
    styleUrl: './overlay-contacts.component.scss',
})
export class OverlayContactsComponent {
    constructor(public overlayState: OverlayState) {}

    toggleOverlay() {
        this.overlayState.toggleOverlay();
    }
}
