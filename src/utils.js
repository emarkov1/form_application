export function isValid(text) {
  return text.length > 10;
}

export function createModal(title, content) {
  var modalEl = document.createElement('div');
  modalEl.className = 'modal';
  const html = `
    <h1>${title}</h1>
    <div class="modal-content">${content}</div>`;
  modalEl.innerHTML = html;
  mui.overlay('on', modalEl);
}
