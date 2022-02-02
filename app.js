document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []
  let vidas = 4;
  let acciones = 0;

  const tablero = document.querySelector('.grid');

  const score = document.querySelector('.score');

  const cardNames = document.querySelector('.nom-carta');

  const historial = document.querySelector('.historial');

  const historialBtn = document.getElementById("showHistorial");

  tablero.addEventListener('mouseout', cambioAVerde);

  tablero.addEventListener('mouseover', cambioAAzul);

  historialBtn.addEventListener('click', muestraHistorial);

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    let vidasContainer = document.getElementById("vidas");
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('You have clicked the same image!')
      cardNames.innerHTML = '';
      vidas--;

      acciones++;

      const historialRow = document.createElement('div');
      const historialContent = `
      <div class="historial-row">
      <p>Accio ${acciones}: You have clicked the same image!</p>
      </div>`;
      
      historial.append(historialRow);
      historialRow.innerHTML = historialContent;

    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match!')
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
      cardNames.innerHTML = '';

      acciones++;

      const historialRow = document.createElement('div');
      const historialContent = `
      <div class="historial-row">
      <p>Accio ${acciones}: You found a match!</p>
      </div>`;
      
      historial.append(historialRow);
      historialRow.innerHTML = historialContent;

    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('Sorry, try again')
      cardNames.innerHTML = '';
      vidas--;

      acciones++;

      const historialRow = document.createElement('div');
      const historialContent = `
      <div class="historial-row">
      <p>Accio ${acciones}: Sorry, try again</p>
      </div>`;
      
      historial.append(historialRow);
      historialRow.innerHTML = historialContent;

    }

    vidasContainer.innerHTML= vidas;
     
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'

      acciones++;

      const historialRow = document.createElement('div');
      const historialContent = `
      <div class="historial-row">
      <p>Accio ${acciones}: Congratulations! You found them all!</p>
      </div>`;
      
      historial.append(historialRow);
      historialRow.innerHTML = historialContent;
    }
    if (vidas <= 0){
      alert('Has perdut Alex Arredondo Rodriguez');
      acciones++;

      const historialRow = document.createElement('div');
      const historialContent = `
      <div class="historial-row">
      <p>Accio ${acciones}: Has perdut Alex Arredondo Rodriguez</p>
      </div>`;
      
      historial.append(historialRow);
      historialRow.innerHTML = historialContent;
    }

  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)

    const card = document.createElement('div');
        const rowContent = `
        <div class="card">
        <h3>${cardArray[cardId].name}</h3>
        </div>`;
        
        cardNames.append(card);
        card.innerHTML = rowContent;

    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()

  function cambioAVerde() {
    score.style.color = "green";
  }
  function cambioAAzul() {
    score.style.color = "blue";
  }

  function muestraHistorial (){
    historial.className = "show";
  }
})
