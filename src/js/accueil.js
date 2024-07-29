const Direction = {
  left: 'left',
  right: 'right',
};
  
let items = document.querySelectorAll('.item');
let maxLength = items.length;
let slideWrapper = document.querySelector('.wrap');

if (maxLength >= 3) {
  let leftButton = '<svg class="custom-arrows custom-arrows-left" data-action="left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>';
  let rightButton = '<svg class="custom-arrows custom-arrows-right" data-action="right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>';

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
  
  console.log(mute);
  console.log(unmute);

  mute.addEventListener('click', () => {
    console.log('mute clicked');
    mute.classList.add('hidden');
    unmute.classList.remove('hidden');
  })

  unmute.addEventListener('click', () => {
    unmute.classList.add('hidden');
    mute.classList.remove('hidden');
  })

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
});