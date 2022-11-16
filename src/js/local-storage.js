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

let watchedLibrary
if (localStorage.getItem('queue')) {
  watchedLibrary = JSON.parse(localStorage.getItem('queue'))
} else {
  watchedLibrary = []
}

export function addToWatchedLibrary(id) {
   watchedLibrary.push(id);
  saveToLocStorage('watched', watchedLibrary)
}

let queueLibrary
if (localStorage.getItem('queue')) {
  queueLibrary = JSON.parse(localStorage.getItem('queue'))
} else {
  queueLibrary = []
}

export function addToQueueLibrary(id) {
  queueLibrary.push(id);
 saveToLocStorage('queue', queueLibrary)
}