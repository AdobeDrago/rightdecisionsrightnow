import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  block.textContent = '';
  const content = fragment.querySelector('.default-content-wrapper');
  if (!content) return;
  const brand = content.querySelector(':scope > p');
  const links = content.querySelector(':scope > ul');
  const cta = content.querySelector(':scope > p:last-of-type');

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Main navigation');

  const brandWrap = document.createElement('div');
  brandWrap.className = 'header-brand';
  if (brand) brandWrap.append(...brand.childNodes);
  const toggle = document.createElement('button');
  toggle.className = 'header-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Toggle navigation');
  toggle.append(document.createElement('span'));
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    block.classList.toggle('open', !open);
  });
  brandWrap.append(toggle);

  const sections = document.createElement('div');
  sections.className = 'header-sections';
  if (links) {
    // the pipeline wraps list-item content in <p>: unwrap so links sit directly in <li>
    links.querySelectorAll('li > p').forEach((p) => p.replaceWith(...p.childNodes));
    links.querySelectorAll(':scope > li').forEach((li) => {
      if (li.querySelector('ul')) li.classList.add('has-sub');
    });
    sections.append(links);
  }

  nav.append(brandWrap, sections);
  const ctaLink = cta && cta !== brand ? cta.querySelector('a') : null;
  if (ctaLink) {
    ctaLink.className = 'header-cta';
    const label = document.createElement('span');
    label.textContent = ctaLink.textContent;
    ctaLink.replaceChildren(label);
    nav.append(ctaLink);
  }
  block.append(nav);
}
