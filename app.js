import registerServiceWorker from './helpers/install-sw.js';

const flashcard = document.querySelector('.flashcard');
const flipBtn = document.getElementById('flip-btn');

flipBtn.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
});


const flashcards = [
  { front: "Hello", back: "Hola" },
  { front: "Thank you", back: "Gracias" },
  { front: "Goodbye", back: "Adiós" }
];

let currentCard = 0;

const frontText = document.getElementById('front');
const backText = document.getElementById('back');

function updateFlashcard() {
  frontText.textContent = flashcards[currentCard].front;
  backText.textContent = flashcards[currentCard].back;
}

document.getElementById('flip-btn').addEventListener('click', () => {
  flashcard.classList.toggle('flipped');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
      currentCard = (currentCard + 1) % flashcards.length;
      updateFlashcard();
      flashcard.classList.remove('flipped');
  } else if (e.key === 'ArrowLeft') {
      currentCard = (currentCard - 1 + flashcards.length) % flashcards.length;
      updateFlashcard();
      flashcard.classList.remove('flipped');
  }
});

updateFlashcard();


registerServiceWorker();