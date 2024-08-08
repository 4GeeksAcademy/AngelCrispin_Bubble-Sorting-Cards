/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

var suits = ["♦", "♥", "♠", "♣"];
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var listCards = [];
var sorted = true;

window.onload = function() {
  var draw = document.getElementById("draw");
  draw.addEventListener("click", generateListOriginal);
  var sort = document.getElementById("sort");
  sort.addEventListener("click", generateListBubbleLog);
};

function generateListOriginal() {
  listCards = [];
  var htmlListOriginal = "";

  var amount = document.getElementById("amount").value.trim();
  var listOriginal = document.getElementById("listOriginal");

  if (amount == "" || amount == "0") {
    return 0;
  }

  for (let index = 0; index < amount; index++) {
    var newCard = generateCard();
    listCards.push(newCard);
    var htmlCard = paintCard(newCard[0], newCard[1]);
    htmlListOriginal += htmlCard;
  }
  listOriginal.innerHTML = htmlListOriginal;
  sorted = false;
}

function generateListBubbleLog() {
  if (sorted) {
    return 0;
  }

  var listBubbleLog = document.getElementById("listBubbleLog");
  var listBubbleLogHTML = "";
  const length = listCards.length;

  var count = 0;

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (listCards[j][1] > listCards[j + 1][1]) {
        //Swap number card
        const tempCard = listCards[j][1];
        listCards[j][1] = listCards[j + 1][1];
        listCards[j + 1][1] = tempCard;
        //Swap suit card
        const tempSuit = listCards[j][0];
        listCards[j][0] = listCards[j + 1][0];
        listCards[j + 1][0] = tempSuit;

        listBubbleLogHTML += paintSwapCards(count);
        count++;
      }
    }
  }
  sorted = true;
  listBubbleLog.innerHTML = listBubbleLogHTML;
}

function generateCard() {
  let randSuit = Math.floor(Math.random() * 4);
  let randNumber = Math.floor(Math.random() * 12);

  let card = [randSuit, randNumber];
  return card;
}

function paintCard(randSuit, randNumber) {
  let colorSuit = randSuit > 1 ? "black" : "red";
  var htmlCard = `
          <div  class="cardPlay">
            <div class="suitTopLeft" style="color:${colorSuit}">${suits[randSuit]}</div>
            <div class="number">${cards[randNumber]}</div>
            <div class="suitBottomRight" style="color:${colorSuit}">${suits[randSuit]}</div>
          </div>
    `;
  return htmlCard;
}

function paintSwapCards(index) {
  var htmlListSwapCards = `
          <div class="row">
            <span>${index}</span>
    `;

  for (let i = 0; i < listCards.length; i++) {
    htmlListSwapCards += paintCard(listCards[i][0], listCards[i][1], index);
  }

  htmlListSwapCards += `
          </div>
          <br>
    `;

  return htmlListSwapCards;
}
