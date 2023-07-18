import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('[name="email"]');
const messageTextarea = feedbackForm.querySelector('[name="message"]');
const feedbackStateKey = 'feedback-form-state';


const savedState = JSON.parse(localStorage.getItem(feedbackStateKey)) || {};


emailInput.value = savedState.email || '';
messageTextarea.value = savedState.message || '';


const saveStateToLocalStorage = () => {
  const currentState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(feedbackStateKey, JSON.stringify(currentState));
};


const throttledSaveStateToLocalStorage = throttle(saveStateToLocalStorage, 500);


feedbackForm.addEventListener('input', () => {
  throttledSaveStateToLocalStorage();
});


feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();
  localStorage.removeItem(feedbackStateKey);
  console.log('Form data:', {
    email: emailInput.value,
    message: messageTextarea.value,
  });
  emailInput.value = '';
  messageTextarea.value = '';
});
