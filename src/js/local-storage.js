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
  if (watchedLibrary.includes(id)) {
    return;
  }
  watchedLibrary.push(id);
  saveToLocStorage('watched', watchedLibrary);
}

let queueLibrary = localStorage.getItem('queue')
  ? JSON.parse(localStorage.getItem('queue'))
  : [];

export function addToQueueLibrary(id) {
  if (queueLibrary.includes(id)) {
    return;
  }
  queueLibrary.push(id);
  saveToLocStorage('queue', queueLibrary);
}

export function removeFromWatched (id){
  const indexOfId = watchedLibrary.indexOf(id);
  if (indexOfId === -1){
    return; 
  }
  watchedLibrary.splice(indexOfId, 1);
  saveToLocStorage('watched', watchedLibrary);
}

export function removeFromQueue (id){ 
  const indexOfId = queueLibrary.indexOf(id);
  if (indexOfId === -1){
    return; 
  }
  queueLibrary.splice(indexOfId, 1);
  saveToLocStorage('queue', queueLibrary);
}
