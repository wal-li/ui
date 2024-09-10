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

export { joinPaths, extractForm };
