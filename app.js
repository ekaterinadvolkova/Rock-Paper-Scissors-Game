const game = () => {
  let pScore = 0;
  let cScore = 0;
  let winHistory = [];

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    let introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  //Play Match
  const playMatch = () => {
    let options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    //animationed event
    for (const hand of hands) { 
      hand.addEventListener("animationend", () => {
        // option refers to current item, no need for 'this'
        hand.style.animation = "";
      })
    }
    
    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    
    for (const option of options)  {
      option.addEventListener("click", () => {
        function myFunction() {
          document.querySelector(".options").disabled = true;
        }
        
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
        
          //Here is where we call compare hands
          compareHands(option.textContent, computerChoice);
          //Update Images
          playerHand.src = `./assets/${option.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);
          //Animation
          playerHand.style.animation = "shakePlayer 2s ease";
          computerHand.style.animation = "shakeComputer 2s ease";
      });

    };
  };
  
  
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;  
    console.log('winHistory ' + winHistory);  
    console.log(checkWinsInRow(3));
    
    if (checkWinsInRow(3)){
      console.log('Game Over!');

      //display winner      
      //reset all history
      resetGame();
      //hide images and option buton
      hideEverything();
      
    } else {
      console.log('game continues');
    }
  };


  const compareHands = (playerChoice, computerChoice) => {

    //Update Text
    const winner = document.querySelector(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";
        pScore++;
        winHistory.push('p');
        
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        winHistory.push('c');  
          
        updateScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        winHistory.push('c');
       
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        winHistory.push('p');
        
        updateScore();
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";
        cScore++;
        winHistory.push('c');
        
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        winHistory.push('p');
       
        updateScore();
        return;
      }
    }

  };

  const checkWinsInRow = (winCount) => {
    if(winHistory.length < winCount ){
      return false;
    }
    const itemsCompared = winHistory.slice(winHistory.length - winCount);
    console.log('itemscompared', itemsCompared);

    const last=itemsCompared[winCount-1];
    console.log('last ', last);
    let counter =1;

    for(let i = winCount-2; i>=0; i--){
      console.log(itemsCompared[i]);
      if(itemsCompared[i]===last){
        counter++;
        console.log('counter', counter);
      } else {
        break;
      }

      if(counter===winCount){
        if(last==='c'){
          return winCount + ' wins in a row for computer';
        } 
        if (last ==='p'){
          return winCount + ' wins in a row for the user';
        }
      }
    };

    return false;
  };

//function to hide all images and options
  const hideEverything = () =>{
    let hideOptions = document.querySelector(".options");
    hideOptions.style.display="none";
    let hideimages = document.querySelector(".hands");
    hideimages.style.display="none";
    let hideComputerScore =document.querySelector(".computer-score");
    hideComputerScore.style.display="none";
    let hidePlayerScore =document.querySelector(".player-score");
    hidePlayerScore.style.display="none";
    
  }

//reset the history  
  const resetGame= () => {
    pScore = 0;
    cScore = 0;
    winHistory = [];
  }
 
  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();

