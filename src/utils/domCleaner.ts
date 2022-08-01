export default function (raw: string): string {
  const parser = new DOMParser();
  const parsedDom = parser.parseFromString(raw, 'text/html');

  // Remove language-specifying header
  const headline = parsedDom.querySelector('h2');
  if (headline) {
    headline.parentElement?.removeChild(headline);
  }

  // Remove 'Edit' links
  const edits = parsedDom.querySelectorAll('.mw-editsection');
  if (edits && edits.length > 0) {
    edits.forEach((edit) => {
      edit.parentElement?.removeChild(edit);
    });
  }

  // Remove internal links
  const anchors  = parsedDom.querySelectorAll('a');
  if (anchors && anchors.length > 0) {
    anchors.forEach((anchor) => {
      if (anchor.pathname.startsWith('/w/') ||
        anchor.pathname.startsWith('/wiki')) {
        const span = document.createElement('span');
        span.innerHTML = anchor.innerHTML;
        anchor.parentElement?.replaceChild(span, anchor);
      }
    });
  }
  return parsedDom.body.innerHTML;
}