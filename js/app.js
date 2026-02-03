// Very simple choice tracker — easy to read
function pushChoice(name) {
  const path = JSON.parse(localStorage.getItem('cya_path') || '[]');
  path.push(name);
  localStorage.setItem('cya_path', JSON.stringify(path));
}

function getPath() {
  return JSON.parse(localStorage.getItem('cya_path') || '[]');
}

function updateBreadcrumb() {
  const el = document.getElementById('breadcrumb');
  if (!el) return;
  const path = getPath();
  el.textContent = path.length ? path.join(' → ') : '(no choices recorded)';
}

function setupChoices() {
  // When a choice link is clicked, store the label
  document.querySelectorAll('a.btn[data-choice]').forEach(function(a) {
    a.addEventListener('click', function() {
      const choice = this.dataset.choice || this.textContent.trim();
      pushChoice(choice);
    });
  });

  // Clear path when returning to index
  document.querySelectorAll('a[href$="/index.html"], a[href="../index.html"]').forEach(function(a) {
    a.addEventListener('click', function() {
      localStorage.removeItem('cya_path');
    });
  });

  updateBreadcrumb();
}

document.addEventListener('DOMContentLoaded', setupChoices);
