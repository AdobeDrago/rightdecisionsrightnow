export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const [quote, name] = [...row.children];
    const li = document.createElement('li');
    if (quote) {
      quote.className = 'testimonials-quote';
      li.append(quote);
    }
    if (name) {
      name.className = 'testimonials-name';
      li.append(name);
    }
    ul.append(li);
  });
  block.replaceChildren(ul);

  const perPage = 3;
  const pages = Math.ceil(ul.children.length / perPage);
  if (pages < 2) return;
  const dots = document.createElement('div');
  dots.className = 'testimonials-dots';
  const go = (n) => {
    ul.style.transform = `translateX(-${n * 100}%)`;
    [...dots.children].forEach((d, i) => d.setAttribute('aria-current', String(i === n)));
  };
  for (let i = 0; i < pages; i += 1) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to page ${i + 1}`);
    dot.addEventListener('click', () => go(i));
    dots.append(dot);
  }
  block.append(dots);
  go(0);
}
