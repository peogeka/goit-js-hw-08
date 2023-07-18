import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const currentTimeKey = 'videoplayer-current-time';


const savedTime = localStorage.getItem(currentTimeKey);


player.ready().then(() => {
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
});


const saveCurrentTime = () => {
  player.getCurrentTime().then((time) => {
    localStorage.setItem(currentTimeKey, time);
  });
};


const throttledSaveCurrentTime = throttle(saveCurrentTime, 1000);


player.on('timeupdate', throttledSaveCurrentTime);
