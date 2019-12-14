// getting elements from the DOM
const stars = document.querySelector('.stars');
const timer = document.querySelector('.timer');
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const modal = document.querySelector(".modal");
const replay = document.querySelector('.replay-btn');
let cards = document.querySelectorAll('.card');
let movesCounter = document.querySelector('.moves');
let finalScore = document.querySelector('.final-score');
let shown = [];
let matched = 0;
let moves = 0;
let time = 0;

restartGame();
restart.addEventListener('click', restartGame);

replay.addEventListener('click', restartGame);

// restart and reset the values of the previous game
function restartGame(){
    modal.style.display = "none";
    renderCards();
    for (const card of cards){
        card.addEventListener('click', show);
    }
    stopTimer();
    matched = 0;
    moves = 0;
    time = 0;
    timer.innerHTML = time;
    startTimer();
    movesCounter.innerHTML = moves;
    stars.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
}

// shuffle and render the cards on deck
function renderCards() {
    for (const card of cards) {
        card.classList.remove('match', 'show', 'open');
    }
    cards = shuffle([...cards]);
    const fragment = document.createDocumentFragment();
    for (const card of cards) {
        fragment.appendChild(card);
    }
    deck.appendChild(fragment);
}

// show and close cards for every move
function show() {
    let target = event.target;
    if(shown.length < 2) {
        target.classList.add('show', 'open');
        shown.push(target)
        target.removeEventListener('click', show);
        if (shown.length == 2) {
            setTimeout('compare(shown)', 300);
        }
    }
}

function close(twoCards) {
    shown = [];
    twoCards[0].classList.remove('show', 'open');
    twoCards[0].addEventListener('click', show);
    twoCards[1].classList.remove('show', 'open');
    twoCards[1].addEventListener('click', show);
}

// lock the matched cards and let them show
function match(twoCards) {
    shown = [];
    for (const card of twoCards) {
        card.classList.add('match');
        card.classList.remove('show', 'open');
    }
    matched += 2;
    if(matched == cards.length){
        finishGame();
    }
}

// compare between the two selected cards
function compare(twoCards) {
    incrementMoves();
    if(twoCards[0].firstElementChild.classList[1] == twoCards[1].firstElementChild.classList[1]) {
        match(twoCards);
    }else {
        close(twoCards);
    }
}

function rateDown(){
    stars.removeChild(stars.firstElementChild);
}

function incrementMoves(){
    moves++
    movesCounter.innerHTML = moves;
    if (moves == 15 || moves == 25){
        rateDown();
    }
}

// start and stop the timer
var myTimer;
function startTimer(){
    myTimer = setInterval(function() {
    time++;
    timer.innerHTML = time;
    }, 1000);
}

function stopTimer() {
    clearInterval(myTimer);
}

// display the result of the game
function finishGame(){
    finalScore.innerHTML = `<p>You won with ${moves} moves and ${stars.childElementCount} stars</p>`
    stopTimer();
    modal.style.display = "block";
}

// hide the modal
window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}