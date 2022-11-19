import { refs } from './refs';

const { scrollButton, rocketTail } = refs;

scrollButton.addEventListener('click', scrollToTop);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 400) {
    addClass(scrollButton, 'icon-up-arrow--active');
    removeClass(scrollButton, 'icon-up-arrow--hidden');
  } else {
    removeClass(scrollButton, 'icon-up-arrow--active');
  }

  if (window.pageYOffset < 20) {
    removeClass(rocketTail, 'rocket-running');
    setOpacity(rocketTail, 0);
    addClass(scrollButton, 'icon-up-arrow--hidden');
  }
});

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  addClass(rocketTail, 'rocket-running');
  rocketTail.style.opacity = 1;
}

function addClass(element, classToAdd) {
  element.classList.add(classToAdd);
}
function removeClass(element, classToRemove) {
  element.classList.remove(classToRemove);
}
function setOpacity(element, value) {
  element.style.opacity = value;
}