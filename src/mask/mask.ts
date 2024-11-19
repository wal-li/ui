const MASKS = {
  number: /^-{0,1}[\d,]*(\.\d*){0,1}$/,
};

const BYPASS_KEYS = [
  'ArrowLeft',
  'ArrowRight',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'Tab',
  'Home',
  'End',
];

export default {
  mounted(el, binding, vnode) {
    let maskType;
    let mask;

    if (typeof binding.value === 'function') {
      maskType = binding.value.name.toLowerCase();
      mask = MASKS[maskType];
    } else if (typeof binding.value === 'string') {
      maskType = 'placeholder';
      mask = binding.value;
    } else if (binding.value instanceof RegExp) {
      maskType = 'regexp';
      mask = binding.value;
    }

    // skip invalif mask
    if (!mask) return;

    el._lastValue = el.value;

    function formatValue(insertMode = true) {
      let currentSelectionStart = el.selectionStart;
      let currentValue = el.value;

      // format number
      if (maskType === 'number') {
        // remove delimiter
        for (let i = currentValue.length; i > 0; i--) {
          if (currentValue[i] === ',') {
            currentValue = currentValue.substring(0, i) + currentValue.substring(i + 1, currentValue.length);

            // decrease current selection
            if (i < currentSelectionStart) currentSelectionStart--;
          }
        }

        // skip decimal part
        let i = currentValue.indexOf('.');
        if (i < 0) i = currentValue.length;

        let c = 0;
        while (i > 0 && currentValue[i - 1] !== '-') {
          // insert delimiter every 3 digits
          if (c !== 0 && c % 3 === 0) {
            currentValue = currentValue.substring(0, i) + ',' + currentValue.substring(i, currentValue.length);

            // increase currrent selection
            if (i < currentSelectionStart) currentSelectionStart++;
          }

          c++;
          i--;
        }
      }

      // placeholder
      if (maskType === 'placeholder') {
        let value = currentValue || '';
        let cursor = currentSelectionStart;

        const parts = mask.split(/[^a-z0-9]+/gi).map((i) => i.toLowerCase());
        const splits = mask.split(/[a-z0-9]+/gi);

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
            if (cursor > i) cursor--;
            continue;
          }

          i++;
        }

        value = value.substring(0, i);
        cursor = Math.min(cursor, value.length);

        // insert splits
        i = 0;

        const prefix = splits.shift();
        if (prefix.length) {
          value = prefix + value;
          cursor += prefix.length;
          i += prefix.length;
        }

        while (parts.length) {
          const part = parts.shift();
          const split = splits.shift();

          i += part.length;

          if (cursor > i) cursor += split.length;
          if (cursor === i && insertMode) cursor += split.length;

          value = value.substring(0, i).padEnd(i, '_') + split + value.substring(i, value.length);
          i += split.length;
        }

        // set
        currentValue = value;
        currentSelectionStart = cursor;
      }

      el.value = currentValue;
      el._lastValue = currentValue;
      el.setSelectionRange(currentSelectionStart, currentSelectionStart);
    }

    el._keydown = (e) => {
      // global keys
      if (BYPASS_KEYS.includes(e.key)) {
        return;
      }

      // skip ctrl a
      if (e.key.toLowerCase() === 'a' && e.ctrlKey) {
        return;
      }

      e.preventDefault();

      // handle printable character key
      if (!e.ctrlKey && !e.altKey && /^.$/.test(e.key)) {
        let currentSelectionStart = el.selectionStart;
        let currentSelectionEnd = el.selectionEnd;
        let currentValue =
          el.value.substring(0, currentSelectionStart) +
          e.key +
          el.value.substring(currentSelectionEnd, el.value.length);

        // if not valid value in mask type allowed list
        if (mask instanceof RegExp && !mask.test(currentValue)) return;

        // allowed insert
        currentSelectionStart += 1;
        currentSelectionEnd = currentSelectionStart;

        // update
        el.value = currentValue;
        el.setSelectionRange(currentSelectionStart, currentSelectionEnd);

        formatValue();

        if (vnode.props['onUpdate:modelValue']) vnode.props['onUpdate:modelValue'](el.value);
        return;
      }

      // handle delete
      if (e.key === 'Backspace') {
        let currentSelectionStart = el.selectionStart;
        let currentSelectionEnd = el.selectionEnd;
        let currentValue =
          el.value.substring(0, currentSelectionStart - 1) + el.value.substring(currentSelectionEnd, el.value.length);

        currentSelectionStart--;

        // update
        el.value = currentValue;
        el.setSelectionRange(currentSelectionStart, currentSelectionStart);

        if (el.value) formatValue(false);

        if (vnode.props['onUpdate:modelValue']) vnode.props['onUpdate:modelValue'](el.value);
        return;
      }

      if (e.key === 'Delete') {
        let noDel = 1;
        let lastValue;

        do {
          lastValue = el.value;

          let currentSelectionStart = el.selectionStart;
          let currentSelectionEnd = el.selectionEnd;

          let currentValue =
            el.value.substring(0, currentSelectionStart) +
            el.value.substring(currentSelectionEnd + noDel, el.value.length);

          // update
          el.value = currentValue;
          el.setSelectionRange(currentSelectionStart, currentSelectionStart);

          if (el.value) formatValue(false);

          noDel++;
        } while (el.value.length && lastValue === el.value && noDel <= el.value.length);

        if (vnode.props['onUpdate:modelValue']) vnode.props['onUpdate:modelValue'](el.value);
        return;
      }
    };

    el._prevent = (e) => {
      e.preventDefault();
    };

    // format init
    formatValue();

    // format when outer changes
    el._interval = setInterval(() => {
      if (el.value !== el._lastValue) formatValue();
    }, 100);

    // prevent changable by other methods
    el.addEventListener('keydown', el._keydown);
    el.addEventListener('input', el._prevent);
    el.addEventListener('drop', el._prevent);
    el.addEventListener('paste', el._prevent);
    el.addEventListener('contextmenu', el._prevent);
  },

  beforeUnmount(el) {
    clearInterval(el._interval);

    el.removeEventListener('keydown', el._keydown);
    el.removeEventListener('input', el._prevent);
    el.removeEventListener('drop', el._prevent);
    el.removeEventListener('paste', el._prevent);
    el.removeEventListener('contextmenu', el._prevent);
  },
};
