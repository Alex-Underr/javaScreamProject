import { createNotificationMarkup } from '../markup/markup-notification';
import { refs } from './refs';

export function typeWriterEffect(name) {
  window.addEventListener('load', event => {
    refs.notifi.innerHTML = createNotificationMarkup(name);
    const timer = document.querySelector('.type');
    setTimeout(function () {
      timer.style.opacity = 1;
    }, 300);
  });
}

export function typeWriterEffectWatched(name) {
  refs.notifi.innerHTML = createNotificationMarkup(name);
  const timer = document.querySelector('.type');
  setTimeout(function () {
    timer.style.opacity = 1;
  }, 300);
}

export function typeWriterEffectQueue(name) {
  refs.notifi.innerHTML = createNotificationMarkup(name);
  const timer = document.querySelector('.type');
  setTimeout(function () {
    timer.style.opacity = 1;
  }, 300);
}
