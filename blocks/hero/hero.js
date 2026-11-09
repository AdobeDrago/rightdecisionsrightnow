export default function decorate(block) {
  // first row: background picture; second row: text
  const rows = [...block.children];
  if (rows.length === 1 && rows[0].children.length > 1) {
    const [pic, text] = [...rows[0].children];
    const textRow = document.createElement('div');
    textRow.append(text);
    rows[0].after(textRow);
    rows[0].replaceChildren(pic);
  }

  // headline words animate in individually on the source: one span per word
  const h1 = block.querySelector('h1');
  if (h1 && !h1.querySelector('span')) {
    const words = h1.textContent.trim().split(/\s+/);
    h1.replaceChildren(...words.map((word) => {
      const span = document.createElement('span');
      const i = document.createElement('i');
      i.textContent = word;
      span.append(i);
      return span;
    }));
  }

  // decorative corner shape
  const shape = document.createElement('img');
  shape.className = 'hero-shape';
  shape.src = 'https://www.rightdecisionsrightnow.com/wp-content/themes/rdrn/public/images/rdrn-hero-shape.b4ec0d.svg';
  shape.alt = 'Hero Section Shape';
  shape.width = 264;
  shape.height = 85;
  block.append(shape);
}
