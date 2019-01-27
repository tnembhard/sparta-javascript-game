class Snatcher{
    constructor(){
        this.grid = document.getElementsByClassName(`grids`);
        this.coin = document.createElement(`img`);
        this.coin.setAttribute(`id`, `coin`); 
        this.coin.src = `./images/yen.png`; 
        this.bird = document.createElement(`img`); 
        this.bird.src = `./images/bird.png`; 
        this.bird.style.position = "absolute";
        this.box = document.getElementById("box");
        this.interval;
        this.click = document.createElement(`div`); 
        this.score = 0;
        this.scoreTxt = document.getElementById(`score`);
        this.gameBtn = document.getElementById(`gameBtn`);
        this.resetBtn = document.getElementById(`resetBtn`); 
        this.coinSound = document.createElement(`audio`);
        this.coinSound.src = `./audio/Sonic_Ring_Sound_Effect.mp3`;
        this.coinSound.type = "audio/mpeg";
        this.crowSound = document.createElement(`audio`);
        this.crowSound.src = `./audio/Crow_Sound_Effect.mp3`;
        this.crowSound.type = "audio/mpeg";
    }
    
    gridItems() {    
        // Creates the grid for the bird and coin 
        const inputRow = 40; 
        const inputCol = 19;     
        // Row Creator
        for (let i = 0; i < inputRow; i++) {
          const row = document.createElement(`div`);
          row.setAttribute(`class`, `row`);
          this.box.appendChild(row);      
          // Collumn Creator
          for (let j = 0; j < inputCol; j++) {
            const col = document.createElement(`div`);
            col.setAttribute(`class`, `col grids`); 
            row.appendChild(col);
          }    
        }   
    }    

    imgGrid(image){ 
        // Randomly attaches the coin image to a cell in the grid  
        let num = Math.floor(Math.random() * this.grid.length);
        this.grid[num].appendChild(image);
        if (image === this.coin) {
            this.coinPos(this.grid[num]);
        } else if (image === this.click){
            this.clickPos(this.grid[num]);
        };
    }

    coinPos(img) {
        //Function to get the coordinates of the coin.
        let rect=img.getBoundingClientRect();
        this.coinY = rect.top;
        this.coinX = rect.left;            
    }

    clickPos(img) {
        //Function to get random coordinates to help ramdomly generate the crows location.
        let rect=img.getBoundingClientRect();
        this.clickY = rect.top;
        this.clickX = rect.left;            
    }

    birdMove(){
        //Function that moves the birds position to the coin.
        this.box.appendChild(this.bird);
        this.crowSound.load();
        this.crowSound.play();
        this.interval = setInterval( () => { 
            if (Math.round(this.birdX) < Math.round(this.coinX-20)) {
                this.birdX += 1;
                this.bird.style.left = this.birdX+'px';           
            } if (Math.round(this.birdX) > Math.round(this.coinX-20)){
                this.birdX -= 1;
                this.bird.style.left = this.birdX+'px';
            }  if (Math.round(this.birdY) < Math.round(this.coinY-23)){  
                this.birdY += 1;
                this.bird.style.top = this.birdY+'px';         
            } if (Math.round(this.birdY) > Math.round(this.coinY-23)){
                this.birdY -= 1;
                this.bird.style.top = this.birdY+'px';               
            } this.loseCondition();                
        }, 10); 
    }

    placeBird() {
        // Function to randomly place the bird 
        this.bird.style.position = "absolute";
        this.birdX = this.clickX;
        this.birdY = this.clickY;
        this.bird.style.left = this.clickX+'px';
        this.bird.style.top = this.clickY+'px';
    }

    loseCondition(){
        //Function to dictate the conditions for the user to lose the game.
        if (Math.round(this.birdX) == Math.round(this.coinX-20) && Math.round(this.birdY) == Math.round(this.coinY-23)) {          
            this.scoreTxt.innerText=`You lose, your score is: ${this.score} points.`;
            clearInterval(this.interval);
            this.resetBtn.style.display = "block";               
        };
    }

    coinClick(){
        // Method used to click the coin before the bird reaches the coin.
        this.coin.addEventListener(`mouseover`, event => {
            this.imgGrid(event.target);
            clearInterval(this.interval);
            this.imgGrid(this.click);
            this.placeBird();
            this.birdMove();
            this.score += 10;
            this.scoreTxt.innerText=`Your score is: ${this.score} points.`;
            this.coinSound.load();
            this.coinSound.play();
        });   
    }

    startGame(){
        // Method which calls buttons to start and reset the game
        this.gridItems();
        this.gameBtn.style.display = "block";
        this.gameBtn.addEventListener(`click`, () => {
            this.gameBtn.style.display = "none";
            // this.gameBtn.disabled = true;
            this.imgGrid(this.coin);
            this.imgGrid(this.click);
            this.placeBird();
            this.birdMove();
            this.scoreTxt.innerText =`Your score is: ${this.score} points.`;
            this.coinClick();
        },);
        this.resetBtn.addEventListener(`click`, () => {
            location.reload();
        });
    }
}

class Modal{
    constructor(){
        this.modal = document.getElementById('myModal');
        this.moBtn = document.getElementById(`modalBtn`);
        this.moClose = document.getElementById(`modalClose`);        
    }

    button(){
        this.moBtn.addEventListener(`click`, () => {
                this.modal.style.display = "block";
            });
        window.addEventListener(`click`, event => {
                if (event.target == this.modal) {
                    this.modal.style.display = "none";
                }
            });
        this.moClose.addEventListener(`click`, event => {            
                this.modal.style.display = "none";
        });
    }        
}

const newGame = new Snatcher();
const newModal = new Modal();

newGame.startGame();
newModal.button();