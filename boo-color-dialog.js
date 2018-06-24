import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js'
import '@polymer/iron-flex-layout/iron-flex-layout.js'
import '@polymer/paper-icon-button/paper-icon-button.js'
import 'boo-window/boo-window.js'

class BooColorDialog extends PolymerElement {
  static get template() {
    return html`
      <style>
        app-toolbar {
          @apply --layout-horizontal;
          @apply --layout-justified;
        }
      </style>
      <iron-iconset-svg size="24" name="boo-color-dialog">
        <svg><defs>
          <g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
        </defs></svg>
      </iron-iconset-svg>

      <div id="trigger">
        <slot></slot>
      </div>

      <boo-window
        width="400"
        opened="{{opened}}"
        pos-policy="center">

        <app-toolbar slot="move-trigger">

          <span>选择颜色</span>
          <paper-icon-button 
            icon="boo-color-dialog:close" 
            on-click="_close"></paper-icon-button>

        </app-toolbar>

        <boo-color-selector 
          slot="content"
          color="{{color}}"
          colors="{{colors}}"
          on-selected="select"></boo-color-selector>

      </boo-window>
    `;
  }

  static get properties() {
    return {
      _opened: {
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
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.trigger.addEventListener("click", function() {
      this._opened = !this._opened;
    }.bind(this));
  }

  select() {
    this.dispatchEvent(new CustomEvent("selected"));
  }
}

window.customElements.define("boo-color-dialog", BooColorDialog);
