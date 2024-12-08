const INDENT = '  ';
const TAB_SIZE = INDENT.length;
const LISTS = ['- [ ] ', '- [x] ', '- ', '+ '];

export default {
  mounted(el, props) {
    let lastKey;
    let isShift;

    function removeIndent(s) {
      return s.substring(0, TAB_SIZE) === INDENT ? s.substring(TAB_SIZE) : s.trimStart();
    }

    function formatEditor() {
      if (props.value?.autoHeight) el.style.height = el.scrollHeight + 'px';
    }

    el._editor_keydown = (e) => {
      lastKey = e.key;
      isShift = e.shiftKey;

      if (lastKey === 'Tab') {
        e.preventDefault();
        el._editor_input();
      }
    };

    el._editor_input = () => {
      let currentValue = el.value;
      let currentSelectionStart = el.selectionStart;
      let currentSelectionEnd = el.selectionEnd;

      if (lastKey === 'Tab') {
        let currentSelectionText = currentValue.substring(currentSelectionStart, currentSelectionEnd);

        // remove indent
        if (isShift) {
          currentSelectionText = currentSelectionText
            .split('\n')
            .map((i) => removeIndent(i))
            .join('\n');
        }
        // insert indent
        else {
          currentSelectionText = currentSelectionText
            .split('\n')
            .map((i) => INDENT + i)
            .join('\n');
        }

        // insert selection content
        currentValue =
          currentValue.substring(0, currentSelectionStart) +
          currentSelectionText +
          currentValue.substring(currentSelectionEnd, currentValue.length);

        if (currentSelectionStart === currentSelectionEnd) {
          currentSelectionStart += currentSelectionText.length;
          currentSelectionEnd = currentSelectionStart;
        } else currentSelectionEnd = currentSelectionStart + currentSelectionText.length;

        // remove indent of current line
        if (isShift) {
          const currentLineStart = currentValue.lastIndexOf('\n', currentSelectionStart - 1) + 1;
          const currentLine = currentValue.substring(currentLineStart, currentSelectionStart);
          const newCurrentLine = removeIndent(currentLine);

          currentValue =
            currentValue.substring(0, currentLineStart) +
            newCurrentLine +
            currentValue.substring(currentSelectionStart, currentValue.length);

          currentSelectionStart -= currentLine.length - newCurrentLine.length;
          currentSelectionEnd -= currentLine.length - newCurrentLine.length;
        }
      } else if (lastKey === 'Enter') {
        const prevLinePos = currentValue.lastIndexOf('\n', currentSelectionStart - 2) + 1;
        const prevLine = currentValue.substring(prevLinePos, currentSelectionStart - 1);

        // indent
        let localIndent = '';
        for (let i = 0; i < prevLine.length; i++) {
          if (prevLine[i] !== ' ') break;
          localIndent += ' ';
        }

        for (const item of LISTS) {
          if (prevLine.substring(localIndent.length, localIndent.length + item.length) === item) {
            localIndent += item;
            break;
          }
        }

        // remove empty indent
        if (!prevLine.substring(localIndent.length).trim()) {
          currentValue =
            currentValue.substring(0, prevLinePos) +
            '\n' +
            currentValue.substring(currentSelectionStart, currentValue.length);

          currentSelectionStart -= prevLine.length;
        }

        // add indent
        else {
          currentValue =
            currentValue.substring(0, currentSelectionStart) +
            localIndent +
            currentValue.substring(currentSelectionStart, currentValue.length);

          currentSelectionStart += localIndent.length;
        }

        currentSelectionEnd = currentSelectionStart;
      }

      el.value = currentValue;
      el.setSelectionRange(currentSelectionStart, currentSelectionEnd);

      formatEditor();
    };

    el._editor_interval = setInterval(() => {
      formatEditor();
    }, 100);

    el.addEventListener('keydown', el._editor_keydown);
    el.addEventListener('input', el._editor_input);

    formatEditor();
  },

  beforeUnmount(el) {
    clearInterval(el._editor_interval);

    el.removeEventListener('keydown', el._editor_keydown);
    el.removeEventListener('input', el._editor_input);
  },
};
