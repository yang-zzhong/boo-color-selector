import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/paper-button/paper-button.js';

/**
 * `boo-color-selector`
 * a color selector
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BooColorSelector extends PolymerElement {
  static get template() {
    return html`
      <style>
        div.used {
          @apply --layout-horizontal;
          @apply --layout-justified;
          @apply --layout-center;
          padding-top: 8px;
        }
        div.used>div>span {
          display: inline-block;
          height: 30px;
          width: 30px;
        }
        div.used>div>span:hover {
          cursor: pointer;
        }
        .preview {
          width: 100px;
          height: 100px;
          background-color: black;
        }
        .colorMixer {
          @apply --layout-horizontal;
          @apply --layout-justify;
          @apply --layout-end;
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
      </style>

      <array-selector 
        id="selector" 
        items=[[colors]] 
        selected={{_color}}></array-selector>

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

window.customElements.define('boo-color-selector', BooColorSelector);
