import { saveToLocStorage, loadFromLocStorage } from './local-storage';

const toggleSwitch = document.querySelector('.toggle-button');

function switchTheme(e) {
  if (e.target.checked) {
    saveToLocStorage('theme', 'dark');
    onStart();
  } else {
    saveToLocStorage('theme', 'light');
    onStart();
  }
}

toggleSwitch.addEventListener('change', switchTheme, false);

function onStart() {
  let status = loadFromLocStorage('theme');
  if (status === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

onStart();
