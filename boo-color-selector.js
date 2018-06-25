import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-media-query/iron-media-query.js';
import './boo-color-dialog.js';
import './boo-color-dropdown.js';

class BooColorSelector extends PolymerElement {
  static get template() {
    return html`
      <iron-media-query 
        query="(max-width: 768px)" 
        query-matches="{{smallScreen}}"></iron-media-query>

      <boo-color-dropdown
        id="dropdown"
        colors="{{colors}}"
        color="{{color}}"></boo-color-dropdown>

      <span on-click="_beginSelect">
        <slot></slot>
      </span>

      <boo-color-dialog
        id="dialog"
        colors="{{colors}}"
        color="{{color}}"></boo-color-dialog>
    `;
  }

  static get properties() {
    return {
      smallScreen: {
        type: Boolean,
      },
      color: {
        type: String,
        notify: true
      },
      colors: {
        type: String,
        notify: true
      }
    };
  }

  _beginSelect() {
    let trigger = null;
    if (this.smallScreen) {
      this.$.dialog.opened = true;
    } else {
      this.$.dropdown.opened = true;
    }
  }
}

window.customElements.define('boo-color-selector', BooColorSelector);
