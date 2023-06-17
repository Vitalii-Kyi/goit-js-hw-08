import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(saveFormState, 500));
window.addEventListener('load', loadSavedFormState);
form.addEventListener('submit', handleSubmit);

function saveFormState() {
  const currentState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  saveToLocalStorage(STORAGE_KEY, currentState);
}

function loadSavedFormState() {
  const savedState = getFromLocalStorage(STORAGE_KEY);
  if (savedState) {
    emailInput.value = savedState.email;
    messageInput.value = savedState.message;
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const currentState = getFromLocalStorage(STORAGE_KEY);
  if (currentState) {
    console.log('Form submitted with state', currentState);
    clearFormState();
  } else {
    console.log('Form submitted with empty state');
  }
}

function saveToLocalStorage(key, value) {
  try {
    const serialLizedValue = JSON.stringify(value);
    localStorage.setItem(key, serialLizedValue);
  } catch (error) {
    console.error('Error saving to local storage', error.message);
  }
}

function getFromLocalStorage(key) {
  try {
    const serialLizedValue = localStorage.getItem(key);
    return serialLizedValue ? JSON.parse(serialLizedValue) : null;
  } catch (error) {
    console.error('Error retrieving from local storage', error.message);
    return null;
    }
  }
  
function clearFormState() {
  localStorage.removeItem(STORAGE_KEY);
  form.requestFullscreen();
  }
