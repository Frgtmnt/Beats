// $('.player').click(e => {
//   const player = $(e.currentTarget);
//   const splash = player.find('.player__splash');
//   const startButton = player.find('.player__start')

  
//   const playerCond = player => {
//     startButton.click(() => {
//       if (player.hasClass('active')) {
//         player.addClass('paused');
//         player.removeClass('active');
//         splash.css('display', 'none');
//       }else {
//         player.addClass('active');
//         player.removeClass('paused');
//         splash.css('display', 'block');
//       }
//     });
    
//     // if (player.hasClass('active')) {
//     //   splash.css('display', 'none');
//     // }
  
//     // if (player.hasClass('paused')) {
//     //   splash.css('display', 'block');
//     // }
//   }


//   playerCond(player);
// })

// const player1 = document.querySelector('.player');
// const splash = document.querySelector('.player__splash');

// const playerCond = player => {
  
//   $('.player__start').click(e => {
//     e.preventDefault();

//     if (player.classList.contains('active')) {
//       player.classList.add('paused');
//       player.classList.remove('active');
//     } else {
//       player.classList.add('active');
//       player.classList.remove('paused');
//     }  

//     if (player.classList.contains('active')) {
//       splash.style.setProperty('display', 'none');
//     }
  
//     if (player.classList.contains('paused')) {
//       splash.style.setProperty('display', 'block');
//     }

//   })
  
// }

// playerCond(player1);




let player;
const playerContainer = $('.player');

let eventsInit = () => {
  $('.player__start').click(e => {
    e.preventDefault();

    if (playerContainer.hasClass('active')) {
      player.pauseVideo();
    }else {
      player.playVideo();
    }
  });

  $('player__playback').click(e => {
    const bar = $(e.currentTarget);
    const clickedPoint = e.originalEvent.layerX;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;
  
    const newButtonPositionPercent = clickedPoint/bar.width() * 100;
  
    $('.player__playback-button').css({
      left: `${newButtonPositionPercent}%`
    })
  
    player.seekTo(newPlaybackPositionSec)
  });

  $('.player__splash').click(e => {
    player.playVideo();
  })
};

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    if (num < 10) {
      return `0${num}`;
    }else {
      return num;
    }
  }
  return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
  const durationSec = player.getDuration();
  let interval;

  $('.player__duration-estimate').text(formatTime(durationSec));

  if (typeof interval !== 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec/durationSec)*100;

    $('.player__duration-complete').text(formatTime(completedSec));

    $('.player__playback-button').css({
      left : `${completedPercent}%`
    });

    $('.player__playback-completed').css({
      width : `${completedPercent}%`
    })
  }, 1000)
}

const onPlayerStateChange = event => {

   /*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики).
 */

  switch (event.data) {
    case 1:
      playerContainer.addClass('active');
      playerContainer.removeClass('paused');
      break;

    case 2:
      playerContainer.addClass('paused');
      playerContainer.removeClass('active');
      break;
  }
}
      
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '392',
    width: '662',
    videoId: 'O_4JSm376Go',
    playerVars: {
      'controls': 0,
      'rel': 0,
      'disablekb': 1,
      'modestbranding': 0,
      'showinfo': 0,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

eventsInit();
