import { Notify } from "notiflix";

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
    Notify.failure('This movie has already been added to the Wathed list');
    return;
  }
  watchedLibrary.push(id);
  saveToLocStorage('watched', watchedLibrary);
  Notify.success('Film added to the Watched list')
}

let queueLibrary = localStorage.getItem('queue')
  ? JSON.parse(localStorage.getItem('queue'))
  : [];

export function addToQueueLibrary(id) {
  if (queueLibrary.includes(id)) {
    Notify.failure('This movie has already been added to the Queue list!');
    return;
  }
  queueLibrary.push(id);
  saveToLocStorage('queue', queueLibrary);
  Notify.success('Film added to the Queued list')
}

export function removeFromWatched (id){
  const indexOfId = watchedLibrary.indexOf(id);
  if (indexOfId === -1){    
    Notify.failure('Oops, there isn`t  selected film in Wathed list');
    return; 

  }
  watchedLibrary.splice(indexOfId, 1);
  saveToLocStorage('watched', watchedLibrary);
  
}

export function removeFromQueue (id){ 
  const indexOfId = queueLibrary.indexOf(id);
  if (indexOfId === -1){
    Notify.failure('Oops, there isn`t  selected film in Queued list');
    return; 
  }
  queueLibrary.splice(indexOfId, 1);
  saveToLocStorage('queue', queueLibrary);
  
}
