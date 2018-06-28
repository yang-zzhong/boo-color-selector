import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';

/**
 * `boo-color-content`
 * a color selector
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BooColorContent extends PolymerElement {
  static get template() {
    return html`
      <style>
        div.used {
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-center;
          padding-top: 8px;
          background-color: inherit;
          color: inherit;
        }
        div.used>div>span {
          display: inline-block;
          border: 1px solid rgba(0, 0, 0, .4);
          height: 30px;
          width: 30px;
        }
        div.used>div>span:hover {
          cursor: pointer;
        }
        .preview {
          min-width: 50px;
          width: 100px;
          height: 100px;
          border: 1px solid rgba(0, 0, 0, .4);
          background-color: black;
        }
        .colorMixer {
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-end;
          background-color: inherit;
          color: inherit;
        }
        .red {
          --paper-slider-active-color: red;
          --paper-slider-knob-color: red;
          --paper-slider-pin-color: red;
        }
        .green {
          --paper-slider-active-color: green;
          --paper-slider-knob-color: green;
          --paper-slider-pin-color: green;
        }
        .blue {
          --paper-slider-active-color: blue;
          --paper-slider-knob-color: blue;
          --paper-slider-pin-color: blue;
        }
        @media screen and (max-width: 768px) {
          .colorMixer {
            @apply --layout-vertical;
          }
          .used {
            @apply --layout-vertical;
          }
          .preview {
            width: 100%;
          }
        }
        paper-input {
          --paper-input-container-input: {
            color: var(--boo-color-fg-color);
          }
          --paper-input-container-color: var(--boo-color-fg-color);
          width: 100%;
        }
      </style>

      <array-selector 
        id="selector" 
        items=[[colors]] 
        selected={{_color}}></array-selector>

      <paper-input on-input="_inputColor" value="[[color]]" label="手动输入颜色"></paper-input>

      <div class="colorMixer">
        <div class="preview" style="background:[[color]];"></div>
        <div class="controller">
          <paper-slider min="0" pin max="255" class="red"
            immediate-value="{{_red}}" value="[[_red]]"></paper-slider>
          <paper-slider min="0" pin max="255" class="green"
            immediate-value="{{_green}}" value="[[_green]]"></paper-slider>
          <paper-slider min="0" pin max="255" class="blue"
            immediate-value="{{_blue}}" value="[[_blue]]"></paper-slider>
        </div>
      </div>
      <div class="used">
        <div>
          <template is="dom-repeat" id="colors" items=[[colors]]>
            <span style="background-color:[[item]]" on-click="_colorFromUsed"></span>
          </template>
        </div>
        <paper-button on-click="select">选择</paper-button>
      </div>
    `;
  }
  static get properties() {
    return {
      _red: {
        type: Number,
        observer: "_colorChanged",
      },
      _green: {
        type: Number,
        observer: "_colorChanged",
      },
      _blue: {
        type: Number,
        observer: "_colorChanged",
      },
      color: {
        type: String,
        notify: true,
        observer: '_rgbToSliders'
      },
      colors: {
        type: Array,
        value: []
      },
      _color: {
        type: String,
        observer: '_selectedColorChanged'
      },
      colorsLength: {
        type: Number,
        value: 6
      }
    };
  }

  _colorChanged() {
    if(this._red === '' || this._green === '' || this._blue === '') {
      return
    }
    var r = this._red.toString(16);
    r = r.length<2 ? "0"+ r : r;
    var g = this._green.toString(16);
    g = g.length< 2 ? "0" + g : g;
    var b = this._blue.toString(16);
    b = b.length<2 ? "0" + b : b;
    this.color = "#" + r + g + b;
  }

  _colorFromUsed(e) {
    let item = this.$.colors.itemForElement(e.target);
    this.$.selector.select(item);
  }

  _inputColor(e) {
    this._color = e.target.value;
  }

  _selectedColorChanged(color) {
    if (color) {
      this.color = color;
    }
  }

  _rgbToSliders(color) {
    if (color) {
      this._red = parseInt(color.substring(1, 3), 16);
      this._green = parseInt(color.substring(3, 5), 16);
      this._blue = parseInt(color.substring(5, 7), 16);
    }
  }

  select() {
    let colors = [];
    for(let i in this.colors) {
      if (i == this.colorsLength) {
        break;
      }
      colors.push(this.colors[i]);
    }
    if (colors.indexOf(this.color) == -1) {
      if (this.colorsLength == colors.length) {
        colors.pop();
      }
      colors.unshift(this.color);
    }
    this.colors = colors;
    this.dispatchEvent(new CustomEvent("selected"));
  }
}

window.customElements.define('boo-color-content', BooColorContent);
