const Direction = {
    left: 'left',
    right: 'right',
  };
  
  let items = document.querySelectorAll('.item');
  let maxLength = items.length;
  let slideWrapper = document.querySelector('.wrap');
  
  if (maxLength >= 3) {
    let leftButton = '<button type="button" class="custom-arrows custom-arrows--disappearing custom-arrows--prev" data-action="left">Prev</button>';
    let rightButton = '<button type="button" class="custom-arrows custom-arrows--disappearing custom-arrows--next" data-action="right">Next</button>';
  
    slideWrapper.insertAdjacentHTML('beforebegin', leftButton);
    slideWrapper.insertAdjacentHTML('afterend', rightButton);
  
    document.addEventListener('click', (evt) => {
      let eventTarget = evt.target;
      if (eventTarget.classList.contains('custom-arrows')) {
        nextSlide(eventTarget.getAttribute('data-action'));
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
  