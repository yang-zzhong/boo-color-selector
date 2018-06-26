import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js'
import '@polymer/iron-iconset-svg/iron-iconset-svg.js'
import '@polymer/iron-flex-layout/iron-flex-layout.js'
import '@polymer/paper-icon-button/paper-icon-button.js'
import 'boo-window/boo-window.js'
import './boo-color-content.js'

class BooColorDialog extends PolymerElement {
  static get template() {
    return html`
      <style>
        app-toolbar {
          @apply --layout-horizontal;
          @apply --layout-justified;
        }
        boo-window {
          --boo-window-container: {
            box-shadow: 0px 0px 10px rgba(0, 0, 0, .4);
            z-index: 100000;
          }
        }
        .container {
          padding: 10px;
        }
      </style>
      <iron-iconset-svg size="24" name="boo-color-dialog">
        <svg><defs>
          <g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
        </defs></svg>
      </iron-iconset-svg>

      <span on-click="_openSelector">
        <slot></slot>
      </span>

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
        <div class="container" slot="content">

          <boo-color-content 
            color="{{color}}"
            colors="{{colors}}"
            on-selected="select"></boo-color-content>

        </div>

      </boo-window>
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
      }
    };
  }

  _openSelector() {
    this.opened = true;
  }

  _close() {
    this.opened = false;
  }

  select() {
    this.dispatchEvent(new CustomEvent("selected"));
  }
}

window.customElements.define("boo-color-dialog", BooColorDialog);
