import './css/image.css';
import image1 from './assets/jeans1.jpeg';
import image2 from './assets/jeans2.jpeg';
import image3 from './assets/jeans3.jpeg';
import image4 from './assets/jeans4.jpeg';

const generateImages = function(){
  let images = document.querySelector('.imageItems');
  let children = images.children;
  for(let idx = 0; idx <children.length; idx++){
  let image = document.createElement('img');
  let number = Number(1+idx);
  switch(number){
    case 1 : image.setAttribute('src',`${image1}`);
  break;
    case 2 : image.setAttribute('src',`${image2}`);
    break;
    case 3 : image.setAttribute('src',`${image3}`);
    break;
    case 4 : image.setAttribute('src',`${image4}`);
    break;
    }

    children[idx].appendChild(image);
  }
}();

const enlargeTarget = function(){
  let myPictures = document.querySelector(".imageItems");
  myPictures.addEventListener('click',function(event){
    if(event.target.tagName==='IMG'){
      /*Div element*/
      let overlay = document.createElement('div');
      overlay.style.position = "absolute";
      overlay.style.top = window.pageYOffset + "px";
      overlay.style.left =  window.pageXOffset + "px";
      overlay.style.background = 'rgba(0,0,0,0.7)';
      overlay.style.cursor = "pointer";
      overlay.style.width = window.innerWidth + "px";
      overlay.style.height = window.innerHeight + "px";

      /*Get image*/
      let image_url = event.target.src;
      /*Set image*/
      let imgTag = document.createElement('img');
      imgTag.setAttribute("src",`${image_url}`);
      imgTag.style.position = "absolute";
      imgTag.style.display = "block";
      /*Button*/
      let close = document.createElement('span');
      close.innerHTML ="X";
      close.style.color = "white";
      close.style.fontSize = "20px";
      close.style.position = "absolute";
      close.style.top = "10px";
      close.style.right = "10px";
      overlay.appendChild(close);
      overlay.appendChild(imgTag);
      /*Close overlay when it is clicked*/
      close.addEventListener('click',function(){
        if(overlay){
          overlay.parentNode.removeChild(overlay);
        }
      });
      /*Cover window with overlay when it is resized.*/
      window.addEventListener('scroll',function(){
        if(overlay){
          overlay.style.top = window.pageYOffset + "px";
          overlay.style.left =  window.pageXOffset + "px";
          overlay.style.width = window.innerWidth + "px";
          overlay.style.height = window.innerHeight + "px";
        }
      })
      document.querySelector('body').appendChild(overlay);

    }
  },false);
};

enlargeTarget();
