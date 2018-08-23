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
          height: 124px;
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
          --paper-input-container-label: {
            color: var(--boo-color-fg-color);
          }
          --paper-input-container-label-focus: {
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

      <paper-input value="{{iColor}}" label="手动输入颜色"></paper-input>

      <div class="colorMixer">
        <div class="preview" style="background:[[color]];"></div>
        <div class="controller">
          <paper-slider min="0" pin max="255" class="red"
            immediate-value="{{_red}}" value="[[_red]]"></paper-slider>
          <paper-slider min="0" pin max="255" class="green"
            immediate-value="{{_green}}" value="[[_green]]"></paper-slider>
          <paper-slider min="0" pin max="255" class="blue"
            immediate-value="{{_blue}}" value="[[_blue]]"></paper-slider>
          <paper-slider min="0" pin max="100" class="opacity"
            immediate-value="{{_opacity}}"></paper-slider>
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
      _opacity: {
        type: Number,
        observer: "_colorChanged",
        value: 100
      },
      color: {
        type: String,
        notify: true,
        reflectToAttribute: true,
        observer: '_colorToSliders'
      },
      colors: {
        type: Array,
        value: []
      },
      iColor: {
        type: String,
        observer: '_iColorChanged',
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
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.color = 'rgba(' + [
        this._red,
        this._green,
        this._blue,
        (this._opacity || 100) / 100
      ].join(',') + ')';
    }, 1);
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

  _colorToSliders(color) {
    if (color) {
      let cs = color.replace(/^rgba\(/, '').replace(/\)$/, '').split(',');
      this._red = parseInt((cs[0] || "0").trim());
      this._green = parseInt((cs[1] || "0").trim());
      this._blue = parseInt((cs[2] || "0").trim());
      this._opacity = parseFloat((cs[3] || "100").trim()) * 100;
      this.iColor = color;
    }
  }

  _iColorChanged(color) {
    if (/^\#[a-fA-F0-9]{6}$/.test(color.trim())) {
      this.color = this._convert(color);
    }
    if (/^rgba\(\d{0,3}\,\s*\d{0,3}\,\s*\d{0,3}(\,\s*\d{0,3}){0,1}\)$/.test(color)) {
      this._colorToSliders(color);
    }
  }

  _convert(color) {
    if (color) {
      this._red = parseInt(color.substring(1, 3), 16);
      this._green = parseInt(color.substring(3, 5), 16);
      this._blue = parseInt(color.substring(5, 7), 16);
      this._opacity = 100;
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
