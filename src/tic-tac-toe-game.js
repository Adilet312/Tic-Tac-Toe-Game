import "./css/styles.css";
/*Players*/
let playerX = {player:"X",switchOn:true}
let playerO = {player:"O",switchOn:false}
// const playerX = 'X';
// const playerO = 'O';
/*Original board*/
let origin_board;
/*Winning scenerio*/
let win_scenerios = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [6,4,2]
]


/*
Get all boxes by class name
*/
const cells= document.querySelectorAll('.item');//Get all cells
startGame()
/*
Start game by cleaning each cell and setting initial position for origin board.
*/
function startGame(){
  document.querySelector(".end-game").style.display = "none";
  origin_board = [0,1,2,3,4,5,6,7,8];//setting initial elements for origin board
  for(let idx = 0; idx < cells.length; idx++){
    cells[idx].innerHTML = '';//Empty each cell's value
    cells[idx].addEventListener('click',onClick, false);//passonClick function when cell clicked
  }
}

/*
  Get id of each box by event listener.
*/
function onClick(cellId){//Get event target (cell's id)
  if(playerX.switchOn){
    playerX.switchOn = false; playerO.switchOn = true;
    turn(cellId.target.id,playerX.player);//Give two argument such as cell's id and player.
  }
  else if(playerO.switchOn){
    playerX.switchOn = true; playerO.switchOn = false;
    turn(cellId.target.id,playerO.player);//Give two argument such as cell's id and player.
  }
}

/*
  Insert values(X,O) into origin_board and display inserted values on browser.
*/
function turn(cellId,player){
  origin_board[cellId] = player;
  document.getElementById(cellId).innerText = player;
  let gameWon = checkWin(origin_board,player);
  if(gameWon) {gameOver(gameWon);}
}

/*
  Check origin_board with winning scenerio array.
*/
function checkWin(board,player){
  let gameWinner= null;
  let indexMarkedBoxes = board.reduce((indexOfMarkedElements,currentElement,index) => (currentElement===player) ? indexOfMarkedElements.concat(index) : indexOfMarkedElements,[]);
  for(let [index,winingScenerio] of win_scenerios.entries()){
    if(winingScenerio.every((element) => indexMarkedBoxes.indexOf(element) > -1)){
        gameWinner = {index:index,player:player}
        break;
    }
  }
  return gameWinner;
}
/*Marked wining rows and disable all cells that will not be  clickable*/
function gameOver(gameWon){
  for(let idx of win_scenerios[gameWon.index]){
    document.getElementById(idx).style.background = "red";
  }
  for(let idx = 0; idx < cells.length; idx++){
    cells[idx].removeEventListener('click',onClick, false);
  }
  displayWinner(gameWon.player);


}
/*Display winner */
function displayWinner(player){
  /*Div element*/
  let overlay = document.createElement('div');
  overlay.style.position = "absolute";
  overlay.style.top = window.pageYOffset + "px";
  overlay.style.left =  window.pageXOffset + "px";
  overlay.style.background = 'rgba(0,0,0,0.7)';
  overlay.style.cursor = "pointer";
  overlay.style.width = window.innerWidth + "px";
  overlay.style.height = window.innerHeight + "px";
  /*Show winner*/
  let winner = document.createElement('span');
  winner.innerHTML ="Congratulations! Winner is "+player;
  winner.style.color = "white";
  winner.style.fontSize = "100px";
  winner.style.position = "absolute";
  winner.style.top = "30%";
  winner.style.left = "10%";
  winner.style.display = "flex";
  winner.style.flexWrap = "wrap";
  overlay.appendChild(winner);
  /*close icon*/
  let close = document.createElement('span');
  close.innerHTML ="X";
  close.style.color = "white";
  close.style.fontSize = "20px";
  close.style.position = "absolute";
  close.style.top = "10px";
  close.style.right = "10px";
  overlay.appendChild(close);
  document.body.appendChild(overlay);
  /*Close overlay when it is clicked*/
  close.addEventListener('click',function(){
    if(overlay){
      overlay.parentNode.removeChild(overlay);
      for(let idx = 0; idx < cells.length; idx++){
        cells[idx].style.background = "black";
      }
      startGame();
    }
  },false);

}
/*Clean board*/
document.querySelector('button').addEventListener('click',function(){
  for(let idx = 0; idx < cells.length; idx++){
    cells[idx].style.background = "black";
  }
  startGame();
},false)
