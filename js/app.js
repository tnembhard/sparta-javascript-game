
class Bird {
    constructor(){
        this.grid = document.getElementsByClassName(`grids`);
        this.coin = document.createElement(`img`)
        this.coin.setAttribute(`id`, `coin`); 
        this.coin.src = `/images/coin.png`; 
        this.bird = document.createElement(`img`) 
        this.bird.src = `/images/bird.png`;
        this.coinClick;
        this.box = document.getElementById("box");   
    }
    
    gridItems() {    
        // Creates the grid for the bird and coin 
        const inputRow = 18; 
        const inputCol = 18; 
    
        // Row Creator
        for (let i = 0; i < inputRow; i++) {
          const row = document.createElement(`div`);
          row.setAttribute(`class`, `row`);
          this.box.appendChild(row);
      
          // Collumn Creator
          for (let j = 0; j < inputCol; j++) {
            const col = document.createElement(`div`);
            col.setAttribute(`class`, `col grids`);            
            // col.innerText=`${j}`;
            row.appendChild(col) 
          }    
        }   
    }    

    imgPos(image){ 
        // Randomly attaches the coin image to a cell in the grid     
          
        let num = Math.floor(Math.random() * Math.floor(this.grid.length));
        this.grid[num].appendChild(image);
        console.log(num);
        let valY;
        let valX;

        function getPos(item) {
            let rect=item.getBoundingClientRect();
            valY = rect.top;
            valX = rect.left;
            return {x:rect.left,y:rect.top};  
        }
        console.log(getPos(this.grid[num]));
        getPos(this.grid[num]);
        this.placeBird(valX, valY);
    }

    birdMove(){
        // Method to test moving the bird using css and intervals
        this.box.appendChild(this.bird);
        this.bird.setAttribute(`id`, `bird`);    
    }

    placeBird(x, y) {
        this.bird.style.position = "absolute";
        this.bird.style.left = x+'px';
        this.bird.style.top = y+'px';
    }

    birdMove2(){
        // Method to move the bird using the grid and intervals

    }

    coinClick(){
        // Method used to click the coin before the bird reaches the coin.

    }

    loseCondition(){

    }

    startGame(){
        // Method to start the game
        this.gridItems()
        this.imgPos(newGame.coin)
        this.birdMove()
        // this.imgPos(newGame.bird)
    }

}


const newGame = new Bird();

newGame.startGame()







function showCoords(event) {
    var x = parseFloat(event.clientX);
    var y = parseFloat(event.clientY);
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = coords;
  }


