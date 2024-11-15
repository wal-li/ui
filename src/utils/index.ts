function joinPaths(...args) {
  const u = new URL(location.href);
  u.pathname = args.join('/');
  return u.pathname.replace(/\/+/g, '/');
}

function extractForm(e) {
  const form = {};
  for (const element of e.target.elements) {
    if (element.name) form[element.name] = element.value;
  }
  return form;
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Prevent scrolling to the bottom of the page in mobile Safari
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      console.log('Text copied to clipboard (fallback)');
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    document.body.removeChild(textArea);
  }
}

export { joinPaths, extractForm, copyToClipboard };
