import './styles.css';
import { isValid } from './utils';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const button = form.querySelector('#submit');

form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
  button.disabled = !isValid(input.value);
});

function submitFormHandler(e) {
  e.preventDefault();
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    button.disabled = true;
    // async request to a server
    console.log('question', question);

    input.value = '';
    input.className = '';
    button.disabled = false;
  }
}
