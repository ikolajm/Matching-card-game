// =============
// Difficulty Logic
  // Difficulty Init (Easy by default)
  let difficulty = "Easy";

  const difficulties = document.querySelectorAll(".difficulty");

  for (let i = 0; i < difficulties.length; i++) {
    difficulties[i].addEventListener("click", function() {
      // Set difficulty to button
      difficulty = difficulties[i].textContent;
      checkDeck();
      // Reset function
      resetGame();
    });
  }


// =============
// Deck Logic

  // Deck init
  let deck = [];

  function checkDeck() {
    deck = [];
    if (difficulty == "Easy") {
      deck.push("fas fa-cat", "fas fa-cat",
      "fas fa-crow", "fas fa-crow",
      "fas fa-dog", "fas fa-dog",
      "fas fa-dove", "fas fa-dove");
    } else {
      deck.push("fas fa-cat", "fas fa-cat",
      "fas fa-crow", "fas fa-crow",
      "fas fa-dog", "fas fa-dog",
      "fas fa-dove", "fas fa-dove",
      "fas fa-dragon", "fas fa-dragon",
      "fas fa-fish", "fas fa-fish",
      "fas fa-frog", "fas fa-frog",
      "fas fa-hippo", "fas fa-hippo");
    }
  }

  // Init deck container
  const container = document.querySelector("#tile-container");

  // Shuffle the deck and deal to tiles
  function shuffle(array) {
    let count = array.length;
    let temp;
    let index;

      // While there are elements in the array
      while (count > 0) {
      // Pick a random index
        index = Math.floor(Math.random() * count);
      // Decrease count by 1
        count--;
      // And swap the last element with it
        temp = array[count];
        array[count] = array[index];
        array[index] = temp;
      }
      // For each tile, create a tile div inside of container div
      array.forEach(function(card) {
        // Create cardHTML
        let cardHTML = "<div class='card-container'>" +
                          "<div class='card'>" +
                            "<i class='" + card + "'></i>" +
                          "</div>"
                        "</div>";
        // Append to tile container div
        container.insertAdjacentHTML("afterbegin", cardHTML);
      });
      // Add event listeners for cards on click, on click show card
      const cards = document.querySelectorAll(".card");
      for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", showCard);
      }
    }

// =============
// Matching Logic

  // Match counter on game start
  let matches = 0;

  // Init the flipped array
  let flipped = [];

  // Show card function
  function showCard() {
    // Show choice of card
    this.style.opacity = 1;
    // Place choice in flipped array
    flipped.push(this);
    // Remove ability to click card
    this.removeEventListener("click", showCard);
    // Check if two cards are selected
    if (flipped.length === 2) {
      // Increase move count
      moveCounter();
      // Check if they match
      if (flipped[0].outerHTML === flipped[1].outerHTML) {
        match();
      } else {
        noMatch();
      }
      // Reset array
      flipped = [];
    }
  }

  // If they match, turn green and keep flipped
  function match() {
    // Add number to matched counter
    matches++
    // For loop
    for (i = 0; i < flipped.length; i++) {
      // Make matched cards green
      flipped[i].classList.add("matched");
      // Disable the cards from being clicked again
      flipped[i].removeEventListener("click", showCard);
    }
    checkWin();
  }

  // If they don't, turn red and turn over
  function noMatch() {
    // For loop
    for (i = 0; i < flipped.length; i++) {
      // Make cards red
      flipped[i].classList.add("wrong");
    }
    // UGLY CODE TO FIGHT ERROR REGARDING QUERYSELECTORALL
    setTimeout(function() {
      let wrong = document.querySelector(".wrong");
      wrong.classList.remove("wrong");
      wrong.style.opacity = 0;
      wrong.addEventListener("click", showCard);
      wrong = document.querySelector(".wrong");
      wrong.classList.remove("wrong");
      wrong.style.opacity = 0;
      wrong.addEventListener("click", showCard);
    }, 500);
  }

// ============
// Win Logic

function checkWin() {
  let shownMinutes = document.querySelector("#minutes").textContent;
  let shownSeconds = document.querySelector("#seconds").textContent;
  let timeDisplay = shownMinutes + ":" + shownSeconds;
  if (difficulty == "Easy") {
    if (matches === 4) {
      alert("You won with a time of " +  timeDisplay + " and a rating of " + starCount + " stars!  To play again, close this window and choose a difficulty.");
    }
  } else {
    if (matches === 8) {
      alert("You won with a time of " +  timeDisplay + " and a rating of " + starCount + " stars!  To play again, close this window and choose a difficulty.");
    }
  }
  clearInterval(clock);
}

// ============
// Stars Logic

  // Init starCount
  let starCount = 3;

  // The more moves you make, the lower your star rating
  function starCheck() {
    if (difficulty == "Easy") {
      if (moveCount > 6) {
        // Two stars gold
        document.querySelector(".stars").children[2].style.color = "transparent";
        starCount = 2;
      } else if (moveCount > 10) {
        // One star gold
        document.querySelector(".stars").children[2].style.color = "transparent";
        document.querySelector(".stars").children[1].style.color = "transparent";
        starCount = 1;
      }
    } else {
      if (moveCount > 15) {
        // Two stars gold
        document.querySelector(".stars").children[2].style.color = "transparent";
        starCount = 2;
      } else if (moveCount > 25) {
        // One star gold
        document.querySelector(".stars").children[2].style.color = "transparent";
        document.querySelector(".stars").children[1].style.color = "transparent";
        starCount = 1;
      }
    }
    console.log("Move made");
  }

// =============
// Moves Logic

  let moveCount = 0;

  function moveCounter() {
    moveCount++;
    document.querySelector("#move-count").textContent = moveCount;
    starCheck();
  }

// =============
// Reset Logic

const reset = document.querySelector("#reset");

// Reset game on button press
reset.addEventListener("click", resetGame);

function resetGame() {
  // Reset matches
  matches = 0;
  // Reset moves count
  moveCount = 0;
  document.querySelector("#move-count").textContent = moveCount;
  // Reset Stars
  starCount = 3;
  document.querySelector(".stars").children[2].style.color = "gold";
  document.querySelector(".stars").children[1].style.color = "gold";
  document.querySelector(".stars").children[0].style.color = "gold";
  // Reset deck
    // Remove all children of container node
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    // Shuffle deck
    shuffle(deck);
  // Stop Clock
  clearInterval(clock);
  // Reset values (seconds to -1 to count on a 0)
  secondCount = -1;
  minuteCount = 0;
  // Restart clock
  clock = setInterval(startClock, 1000);
  console.log("Game is reset");
}

// =============
// Stopwatch Logic

  // Init clock
  let clock = setInterval(startClock, 1000);
  // Stop Clock
  clearInterval(clock);

  // Declare the counters for JS purposes
  let secondCount = 0;
  let minuteCount = 0;

  function startClock() {
    // Declare html variables
    let seconds = document.querySelector("#seconds");
    let minutes = document.querySelector("#minutes");

    // Set html variables to show what counters are at
    seconds.textContent = secondCount;
    minutes.textContent = minuteCount;

    // Stopwatch Logic (This is processed every second)
    secondCount++;
      // Handle tenths and spillover
      if (secondCount === 60) {
        secondCount = 0;
        minuteCount++;
      }
      if(secondCount < 10) {
        seconds.textContent = "0" + secondCount;
      } else {
        seconds.textContent = secondCount;
      }
      if (minuteCount < 9) {
        minutes.textContent = "0" + minuteCount;
      } else {
        minutes.textContent = minuteCount;
      }
  }
