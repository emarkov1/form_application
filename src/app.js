import { authWithEmailAndPassword, getAuthForm } from './auth';
import { Question } from './question';
import './styles.css';
import { createModal, isValid } from './utils';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const button = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');

window.addEventListener('load', Question.renderList());
modalBtn.addEventListener('click', openModal);
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
  button.disabled = !isValid(input.value);
});

function openModal() {
  createModal('authorization', getAuthForm());
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, { once: true });
}

function authFormHandler(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const email = e.target.querySelector('#email').value;
  const password = e.target.querySelector('#password').value;
  btn.disabled = true;
  authWithEmailAndPassword(email, password).then((token) => {
    return Question.fetch(token)
      .then(renderModalAfterAuth)
      .then(() => (btn.disabled = false));
  });
}

function renderModalAfterAuth(content) {
  console.log(content);
}

function submitFormHandler(e) {
  e.preventDefault();
  if (isValid(input.value)) {
    const quest = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    button.disabled = true;
    // async request to a server
    Question.create(quest).then(() => {
      input.value = '';
      input.className = '';
      button.disabled = false;
    });
  }
}
