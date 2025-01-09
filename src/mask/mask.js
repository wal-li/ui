import { nextTick } from 'vue';

const NUMBER_MASK = 'number';
const PLACEHOLDER_MASK = 'placeholder';

class Mask {
  constructor(el, mask) {
    this.el = el;

    this.value = '';
    this.maskType = '';
    this.mask = '';
    this.isFocus = false;

    this.value = '';

    el.addEventListener('focus', this.onFocus.bind(this));
    el.addEventListener('blur', this.onBlur.bind(this));

    nextTick(() => {
      this.update(mask);
    });
  }

  get displayValue() {
    return this.el.value;
  }

  set displayValue(newValue) {
    this.el.value = newValue;
  }

  /**
   * Update el.value to this.value
   */
  update(mask) {
    if (typeof mask === 'function') {
      this.maskType = mask.name.toLowerCase();
    } else if (typeof mask === 'string') {
      this.maskType = 'placeholder';
      this.mask = mask;
    }

    switch (this.maskType) {
      case NUMBER_MASK:
        this.value = parseFloat(this.el.value.toString());
        break;
      default:
        this.value = this.el.value;
    }

    this.format();
  }

  /**
   * format this.value to display in el.value
   */
  format() {
    // ignore if focusing
    if (this.isFocus) return;

    switch (this.maskType) {
      // number
      case NUMBER_MASK:
        this.displayValue = isNaN(this.value) ? '' : new Intl.NumberFormat('en-US').format(this.value);
        break;

      // placeholder
      case PLACEHOLDER_MASK:
        let value = (this.value || '').toString();

        const parts = this.mask.split(/[^a-z0-9]+/gi).map((i) => i.toLowerCase());
        const splits = this.mask.split(/[a-z0-9]+/gi);

        if (parts.length > 0 && parts[0] === '') parts.shift();
        if (parts.length > 0 && parts[parts.length - 1] === '') parts.pop();

        // remove chars
        const partStr = parts.join('').split('');
        let i = 0;
        while (i < value.length && i < partStr.length) {
          const c = partStr[i];

          // invalid char
          if (
            // alphabet
            (c === 'a' && !/[a-z]/i.test(value[i])) ||
            // digital
            (c === '0' && !/[0-9]/i.test(value[i])) ||
            // year
            (c === 'y' && !/[0-9]/i.test(value[i])) ||
            // month
            (c === 'm' &&
              ((partStr[i + 1] === 'm' && !/[0-1]/i.test(value[i])) ||
                (partStr[i - 1] === 'm' && value[i - 1] === '0' && !/[1-9]/i.test(value[i])) ||
                (partStr[i - 1] === 'm' && value[i - 1] === '1' && !/[0-2]/i.test(value[i])))) ||
            // day
            (c === 'd' &&
              ((partStr[i + 1] === 'd' && !/[0-3]/i.test(value[i])) ||
                (partStr[i - 1] === 'd' && value[i - 1] === '0' && !/[1-9]/i.test(value[i])) ||
                (partStr[i - 1] === 'd' && ['1', '2'].indexOf(value[i - 1]) !== -1 && !/[0-9]/i.test(value[i])) ||
                (partStr[i - 1] === 'd' && value[i - 1] === '3' && !/[0-1]/i.test(value[i])))) ||
            // hour
            (c === 'h' &&
              ((partStr[i + 1] === 'h' && !/[0-2]/i.test(value[i])) ||
                (partStr[i - 1] === 'h' && ['0', '1'].indexOf(value[i - 1]) !== -1 && !/[0-9]/i.test(value[i])) ||
                (partStr[i - 1] === 'h' && value[i - 1] === '2' && !/[0-3]/i.test(value[i])))) ||
            // min
            (c === 'i' &&
              ((partStr[i + 1] === 'i' && !/[0-5]/i.test(value[i])) ||
                (partStr[i - 1] === 'i' && !/[0-9]/i.test(value[i])))) ||
            // sec
            (c === 's' &&
              ((partStr[i + 1] === 's' && !/[0-5]/i.test(value[i])) ||
                (partStr[i - 1] === 's' && !/[0-9]/i.test(value[i])))) ||
            // others
            ('a0ymd'.indexOf(c) === -1 && !/[a-z0-9]/i.test(value[i]))
          ) {
            value = value.substring(0, i) + value.substring(i + 1, value.length);
            continue;
          }

          i++;
        }

        value = value.substring(0, i);

        // insert splits
        i = 0;

        const prefix = splits.shift();
        if (prefix.length) {
          value = prefix + value;
          i += prefix.length;
        }

        while (parts.length) {
          const part = parts.shift();
          const split = splits.shift();

          i += part.length;

          value = value.substring(0, i).padEnd(i, '_') + split + value.substring(i, value.length);
          i += split.length;
        }

        this.displayValue = value;

        break;
    }
  }

  /**
   * DOM focus event
   */
  onFocus() {
    this.isFocus = true;
    this.el.value = this.value;

    switch (this.maskType) {
      case NUMBER_MASK:
        this.el.setAttribute('type', 'number');
        break;
    }
  }

  /**
   * DOM blur event
   */
  onBlur() {
    this.isFocus = false;
    this.el.setAttribute('type', 'text');
    this.format();
  }

  destroy() {
    this.el.removeEventListener('focus', this.onFocus);
    this.el.removeEventListener('blur', this.onBlur);
  }
}

export default {
  mounted(el, binding) {
    el._wIns = new Mask(el, binding.value);
  },

  updated(el, binding) {
    el._wIns?.update(binding.value);
  },

  beforeUnmount(el) {
    el._wIns?.destroy();
  },
};
