import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const feedbackStateKey = 'feedback-form-state';


let savedState = {};



const saveStateToLocalStorage = (e) => {
  savedState[e.target.name] = e.target.value.trim();
  localStorage.setItem(feedbackStateKey, JSON.stringify(savedState))
};


const throttledSaveStateToLocalStorage = throttle(saveStateToLocalStorage, 500);

feedbackForm.addEventListener("input", throttledSaveStateToLocalStorage);

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.removeItem(feedbackStateKey);
  console.log(savedState);
  savedState = {}
  e.target.reset()
});

const onLoad = () => {
  try {
    const data = localStorage.getItem(feedbackStateKey);
    if (!data) return;
    savedState = JSON.parse(data);
    Object.entries(feedbackFormState).forEach(([key, val]) => {
      feedbackForm.elements[key].value = val;
    })
  } catch (error) {
    console.log(error.message);
  }
};
window.addEventListener("load", onLoad);