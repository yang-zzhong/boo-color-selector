import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import './boo-color-content.js';

class BooColorDropdown extends PolymerElement {
  static get template() {
    return html`
      <style>
        [slot=dropdown-content] {
          padding: 10px 15px 10px 10px;
        }
      </style>
      <paper-menu-button 
        horizontal-align="[[horizontalAlign]]"
        vertical-align="[[verticalAlign]]"
        opened="{{opened}}"
        id="dropdown" ignore-select> 

        <div slot="dropdown-trigger">
          <slot></slot>
        </div>

        <div slot="dropdown-content">
          <boo-color-content 
            color={{color}}
            colors={{colors}}
            on-selected="select"></boo-color-content>
        </div>

      </paper-menu-button>
    `;
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        value: false
      },
      color: {
        type: String,
        notify: true
      },
      colors: {
        type: Array,
        notify: true
      },
      verticalAlign: String,
      horizontalAlign: String
    };
  }

  select() {
    this.dispatchEvent(new CustomEvent("selected"));
  }
}

window.customElements.define("boo-color-dropdown", BooColorDropdown);
