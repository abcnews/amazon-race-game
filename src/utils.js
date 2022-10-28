import { selectMounts, getMountValue } from '@abcnews/mount-utils'

export function getNodesBetweenMarkers(marker) {
  const [openMarker] = selectMounts(marker);

  if (!openMarker) return [];

  let node = openMarker.nextSibling;
  let nodes = [];
  let hasMoreContent = true;

  while (hasMoreContent && node) {
    if (!node.tagName) {
      node = node.nextSibling;
      continue;
    }
    if (getMountValue(node).indexOf('end' + marker) > -1) {
      hasMoreContent = false;
    } else {
      nodes.push(node);

      const previousNode = node;
      node = node.nextSibling;
      previousNode.parentNode.removeChild(previousNode);
    }
  }

  return nodes;
}

export function resetMountNode() {
  const mountNode = document.querySelector('[data-component="Decoy"][data-key="page"]');

  // Remove everything from the underlying article
  [].slice.apply(mountNode.children).forEach(el => mountNode.removeChild(el));

  return mountNode;
}

export function loadEmojis(callback) {
  if (document.querySelector('script[src^="//twemoji"]')) return callback();

  const script = document.createElement('script');
  script.onload = e => callback();
  script.src = '//twemoji.maxcdn.com/2/twemoji.min.js?11.3';

  document.querySelector('head').appendChild(script);
}

export function prepare(callback) {
  window.__ABOUT = getNodesBetweenMarkers('about').map(node => {
    if (node.tagName === 'UL') {
      node.childNodes.forEach(child => {
        if (child.innerText.indexOf(':') > -1) {
          const text = child.innerText;
          child.innerText = '';
          const [role, name] = text.split(':');
          const roleNode = document.createElement('div');
          roleNode.style.setProperty('font-weight', 'bold');
          roleNode.innerText = role;
          child.appendChild(roleNode);
          const nameNode = document.createElement('div');
          nameNode.innerText = name;
          child.appendChild(nameNode);
        }
      });
    }

    return node;
  });

  let d;
  if (document.querySelector(`meta[property="article:published_time"]`)) {
    d = document.querySelector(`meta[property="article:published_time"]`).getAttribute('content');
  } else if (document.querySelector(`time`)) {
    d = document.querySelector(`time`).getAttribute('datetime');
  }
  if (d) {
    const date = new Date(d.split('T')[0]);
    let [h, m] = d.split('T')[1].split(':');
    h = parseInt(h, 10);
    m = m.replace(/\+.*/, '');
    const ampm = h > 12 ? 'PM' : 'AM';
    let [day, month, num, year] = date.toDateString().split(' ');
    window.__PUBLISHED_AT = `${day} ${num} ${month} ${year}, ${h % 12}:${m} ${ampm} AEDT`.toUpperCase();
  }

  window.__ARTICLE_LINK = document.querySelector('a[title="Read more"]').href;

  loadEmojis(() => {
    callback(resetMountNode());
  });
}
