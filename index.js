const elApp = document.querySelector("#app");

const elImages = Array.from(document.querySelectorAll('.gallery-image'));

const elDetail = document.querySelector('.detail');

function flipImages(firstEl, lastEl, change) {
  const firstRect = firstEl.getBoundingClientRect();
  //console.log('FIRST', firstRect);
  //elDetail.innerHTML = '';
  /* requestAnimationFrame(() => {

  }) */
  const lastRect = lastEl.getBoundingClientRect();
    //console.log('LAST', lastRect);
  // INVERT
  const deltaX = firstRect.left - lastRect.left;
  const deltaY = firstRect.top - lastRect.top;
  const deltaW = firstRect.width / lastRect.width;
  const deltaH = firstRect.height / lastRect.height;
  
  change();
  lastEl.parentElement.dataset.flipping = true;
  
  const animation = lastEl.animate([
    {
      transform: `translateX(${deltaX}px) 
      translateY(${deltaY}px) 
      scaleX(${deltaW})
      scaleY(${deltaH})`
    },
    {
      transform: 'none'
    }
  ], {
    duration: 600, // milliseconds
    easing: 'cubic-bezier(.5, 0, .5, 1)'
  });

  animation.onfinish = () => {
    delete lastEl.parentElement.dataset.flipping;
  }
}

elImages.forEach(figure => {
  figure.addEventListener('click', () => {
    const elImage = figure.querySelector('img');
    //console.log(elImage);
    //const firstRect = elImage.getBoundingClientRect();
   // console.log('FIRST', firstRect);

    elDetail.innerHTML = '';
    //console.log(figure);

    const elClone = figure.cloneNode(true);
    elDetail.appendChild(elClone);
    //console.log(elClone);
       
    const elCloneImage = elClone.querySelector('img');
      
    flipImages(elImage, elCloneImage, () => {
      elApp.dataset.state = "detail";
    });

    function revert() {
      flipImages(elCloneImage, elImage, () => {
        elApp.dataset.state = "gallery";
      });

      elDetail.removeEventListener('click', revert);

    }
    
    elDetail.addEventListener('click', revert);
  });
});

elDetail.addEventListener('click', () => {
  elApp.dataset.state="gallery";
});