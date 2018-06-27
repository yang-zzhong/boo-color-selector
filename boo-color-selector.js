import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-media-query/iron-media-query.js';
import './boo-color-dialog.js';
import './boo-color-dropdown.js';

class BooColorSelector extends PolymerElement {
  static get template() {
    return html`
      <style>
        boo-color-dropdown {
          --boo-color-dropdown: {
            @apply --boo-color-selector;
          }
          --boo-color-dropdown-input: {
            @apply --boo-color-selector-input;
          }
        }
        boo-color-dialog {
          --boo-color-dialog: {
            @apply --boo-color-selector;
          }
          --boo-color-dialog-input: {
            @apply --boo-color-selector-input;
          }
        }
      </style>
      <iron-media-query 
        query="(max-width: 768px)" 
        query-matches="{{smallScreen}}"></iron-media-query>

      <span id="trigger" on-click="_beginSelect">
        <slot></slot>
      </span>

      <boo-color-dropdown
        id="dropdown"
        name="[[name]]"
        colors="{{colors}}"
        horizontal-align="[[horizontalAlign]]"
        vertical-align="[[verticalAlign]]"
        horizontal-offset="[[_ho]]"
        color="{{color}}"></boo-color-dropdown>

      <boo-color-dialog
        id="dialog"
        name="[[name]]"
        colors="{{colors}}"
        color="{{color}}"></boo-color-dialog>
    `;
  }

  static get properties() {
    return {
      smallScreen: {
        type: Boolean,
      },
      name: {
        type: String,
        value: "选择颜色"
      },
      horizontalAlign: String,
      verticalAlign: String,
      color: {
        type: String,
        notify: true
      },
      colors: {
        type: String,
        notify: true
      },
      _ho: Number
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.horizontalAlign != 'right') {
      let rect = this.$.trigger.getBoundingClientRect();
      this._ho = -1 * rect.width;
    }
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
