const Direction = {
  left: 'left',
  right: 'right',
};
  
let items = document.querySelectorAll('.item');
let maxLength = items.length;
let slideWrapper = document.querySelector('.wrap');

if (maxLength >= 3) {
  let leftButton = '<svg class="custom-arrows custom-arrows-left hover-element change-element" data-action="left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>';
  let rightButton = '<svg class="custom-arrows custom-arrows-right hover-element change-element" data-action="right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>';

  slideWrapper.insertAdjacentHTML('afterbegin', leftButton);
  slideWrapper.insertAdjacentHTML('beforeend', rightButton);

  antispam = true;

  document.addEventListener('click', (evt) => {
    let eventTarget = evt.target;
    if (eventTarget.classList.contains('custom-arrows') && antispam) {
      antispam = !antispam;
      nextSlide(eventTarget.getAttribute('data-action'));
      setTimeout(() => {
        antispam = !antispam;
      }, "900");
    }
  });
}

items.forEach((it, index) => {
  it.setAttribute('position', index + 1);
});

function nextSlide(direction) {
  if (Direction.right === direction) {
    items.forEach((it, index) => {
      let prevValue = +it.getAttribute('position');
      let nextValue = prevValue - 1 < 1 ? maxLength : prevValue - 1;
      it.setAttribute('position', nextValue);
    });
  } else {
    items.forEach((it, index) => {
      let prevValue = +it.getAttribute('position');
      let nextValue = prevValue + 1 > maxLength ? 1 : prevValue + 1;
      it.setAttribute('position', nextValue);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll('#many_card_selector div button');
  const mute = document.querySelector('.mute');
  const unmute = document.querySelector('.unmute');
  const hoverElements = document.querySelectorAll('.hover-element');
  const hoverSound = document.getElementById('hover-sound');
  hoverSound.volume = 0.05;
  const changeElements = document.querySelectorAll('.change-element');
  const changeElements2 = document.querySelectorAll('.change-element2');
  const changeSound = document.getElementById('change');
  changeSound.volume = 0.5;
  antispam2 = true;
  antispam3 = true;
  const playbutton = document.querySelector('#play_button button');
  const playSound = document.getElementById('play');
  playSound.volume = 0.3;
  antispam4 = true;

  const muteAll = () => {
    playSound.volume = 0;
    hoverSound.volume = 0;
    changeSound.volume = 0;
  }

  const unmuteAll = () => {
    playSound.volume = 0.3;
    hoverSound.volume = 0.05;
    changeSound.volume = 0.5;
  }
  function loadSelectedSkin() {
    const savedSkin = localStorage.getItem('selectedSkin');
    if (savedSkin){
      console.log(savedSkin);
      items.forEach( it => {
        if(it.querySelector('h2').textContent == savedSkin){
          while(it.getAttribute('position') != 2){
            nextSlide("right");
          }
        }
      });
    }
  }
  loadSelectedSkin()

  function loadSelectedManyCards() {
    const savedManyCards = localStorage.getItem('selectedManyCards');
    if (savedManyCards){
      console.log(savedManyCards);
      changeElements2.forEach( el => {
        el.classList.remove('active');
        if(el.textContent == savedManyCards){
          el.classList.add('active');
        }
      })
    }
  }
  loadSelectedManyCards()

  function loadMuted() {
    const muted = localStorage.getItem('muted');
    if (muted){
      console.log(typeof(muted));
      if(muted == 'true'){
        unmute.classList.add('hidden');
        mute.classList.remove('hidden');
        muteAll();
      }
      else{
        mute.classList.add('hidden');
        unmute.classList.remove('hidden');
        unmuteAll();
      }
      
    }
  }
  loadMuted()



  mute.addEventListener('click', () => {
    mute.classList.add('hidden');
    unmute.classList.remove('hidden');
    unmuteAll();
  })

  unmute.addEventListener('click', () => {
    unmute.classList.add('hidden');
    mute.classList.remove('hidden');
    muteAll();
  })

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });



  hoverElements.forEach(element => {
    element.addEventListener('mouseover', () => {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(error => {
        console.log('Autoplay was prevented. Audio play() must be triggered by user interaction:', error);
      });;
    });
  });


  changeElements.forEach(element => {
    element.addEventListener('click', () => {
      if(antispam2){
        antispam2 = !antispam2
        changeSound.currentTime = 0;
        changeSound.play().catch(error => {
          console.log('Autoplay was prevented. Audio play() must be triggered by user interaction:', error);
        });
      }

      setTimeout(() => {
        antispam2 = !antispam2;
      }, "900");
    });
  });

  changeElements2.forEach(element => {
    element.addEventListener('click', () => {
      if(antispam3){
        antispam3 = !antispam3
        changeSound.currentTime = 0;
        changeSound.play().catch(error => {
          console.log('Autoplay was prevented. Audio play() must be triggered by user interaction:', error);
        });;
      }
      setTimeout(() => {
        antispam3 = !antispam3;
      }, "100");

    });
  });


  playbutton.addEventListener('click', () => {
    if(antispam4){
      antispam4 = !antispam4;
      playSound.currentTime = 0;
      playSound.play().catch(error => {
        console.log('Autoplay was prevented. Audio play() must be triggered by user interaction:', error);
      });;
    }
    
    items.forEach(it => {
      if(it.getAttribute('position') == 2){
        let selectedSkin = it.querySelector('h2').textContent;
        localStorage.setItem('selectedSkin', selectedSkin);
      }
    })
    changeElements2.forEach(it => {
      if(it.classList.contains('active')){
        let selectedManyCards = it.textContent;
        localStorage.setItem('selectedManyCards', selectedManyCards);
      }
    })

    if(mute.classList.contains('hidden')){
      let muted = false;
      localStorage.setItem('muted', muted);
    }
    else{
      let muted = true;
      localStorage.setItem('muted', muted);
    }

    setTimeout(() => {
      antispam4 = !antispam4;
      window.location.href = 'game/game.html';
    }, "300");

  });

  // const gameSound = document.getElementById('game_music');
  // gameSound.play().catch(error => {
  //   console.log('Autoplay was prevented. Audio play() must be triggered by user interaction:', error);
  // });



});