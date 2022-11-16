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

let watchedLibrary = [];

function addToWatchedLibrary(movieObj) {
  return watchedLibrary.push(movieObj.id);
}

// //////////////////////// 👇 TEST //////////////////////////////////////

const firstMovie = {
  adult: false,
  backdrop_path: '/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg',
  id: 111111,
  title: 'Black Panther: Wakanda Forever',
  original_language: 'en',
  original_title: 'Black Panther: Wakanda Forever',
};

const secondMovie = {
  adult: false,
  backdrop_path: '/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg',
  id: 222222,
  title: 'Black Panther: Wakanda Forever',
  original_language: 'en',
};

const thirdMovie = {
  adult: false,
  backdrop_path: '/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg',
  id: 333333,
  title: 'Black Panther: Wakanda Forever',
  original_language: 'en',
};

addToWatchedLibrary(firstMovie);
addToWatchedLibrary(secondMovie);
addToWatchedLibrary(thirdMovie);

// console.log(watchedLibrary);

saveToLocStorage('wached', watchedLibrary);

const resFromLS = loadFromLocStorage('wached');
// console.log(resFromLS);

/// 👇 не працює, 😭 собака  !!!

// if (refs.watchedBtnEl) {
//   refs.watchedBtnEl.addEventListener('click', handleOfWatchedBtnClick);

//   function handleOfWatchedBtnClick() {
//     console.log('click');
//   }
// }
