// Simple choice-path tracker for the choose-your-own-adventure tree
(function () {
  function pushChoice(name) {
    try {
      const path = JSON.parse(localStorage.getItem('cya_path') || '[]');
      path.push(name);
      localStorage.setItem('cya_path', JSON.stringify(path));
      return path;
    } catch (e) {
      console.warn('Could not push choice', e);
      return [];
    }
  }

  function getPath() {
    try {
      return JSON.parse(localStorage.getItem('cya_path') || '[]');
    } catch (e) {
      return [];
    }
  }

  function renderBreadcrumb(el) {
    if (!el) return;
    const path = getPath();
    el.textContent = path.length ? path.join(' → ') : '(no choices recorded)';
  }

  // Attach click handlers to all choice links on a page
  function wireChoices() {
    document.querySelectorAll('a.btn[data-choice]').forEach(a => {
      a.addEventListener('click', function (ev) {
        // store the choice label
        const choice = this.dataset.choice || this.textContent.trim();
        pushChoice(choice);
        // allow navigation to proceed normally
      });
    });

    // For ending pages, show a breadcrumb label and provide a console view
    const bc = document.getElementById('breadcrumb');
    if (bc) renderBreadcrumb(bc);

    const vp = document.getElementById('view-path');
    if (vp) {
      vp.addEventListener('click', function (ev) {
        ev.preventDefault();
        console.log('Path taken:', getPath());
        alert('Path printed to console. Open your dev console to inspect it.');
      });
    }

    // Allow a "restart" to clear path
    document.querySelectorAll('a[href$="/index.html"], a[href="../index.html"]').forEach(a => {
      a.addEventListener('click', function () {
        localStorage.removeItem('cya_path');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireChoices);
  } else {
    wireChoices();
  }
})();