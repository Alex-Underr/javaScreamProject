export const saveToLocStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error >>> ', error.message);
  }
};

export const loadFromLocStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error >>> ', error.message);
  }
};

let watchedLibrary = localStorage.getItem('watched')
  ? JSON.parse(localStorage.getItem('watched'))
  : [];

export function addToWatchedLibrary(id) {
  watchedLibrary.push(id);
  saveToLocStorage('watched', watchedLibrary);
}

let queueLibrary = localStorage.getItem('queue')
  ? JSON.parse(localStorage.getItem('queue'))
  : [];

export function addToQueueLibrary(id) {
  queueLibrary.push(id);
  saveToLocStorage('queue', queueLibrary);
}
