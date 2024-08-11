import getFlashCardDatabase from './helpers/database.js';
import registerServiceWorker from './helpers/install-sw.js';

let flashcards = [];
let currentCard = 0;

const frontText = document.getElementById('front');
const backText = document.getElementById('back');
const infoText = document.getElementById('info');

function updateInfoText() {
  var isFront = document.querySelector('.flashcard').classList.contains('flipped');
  if (isFront) {
    infoText.textContent = 'Back';
  } else {
    infoText.textContent = 'Front';
  }
}

async function updateFlashcardUI() {
  flashcards = await getFlashcards();
  if (flashcards.length > 0) {
    currentCard = (currentCard + flashcards.length) % flashcards.length;
    frontText.textContent = flashcards[currentCard].front;
    backText.textContent = flashcards[currentCard].back;
  } else {
    currentCard = 0;
    frontText.textContent = "No cards";
    backText.textContent = "Add new ones!";
  }
  updateInfoText();
}

document.getElementById('flip-btn').addEventListener('click', () => {
  document.querySelector('.flashcard').classList.toggle('flipped');
  updateInfoText();
});

document.getElementById('dropbtnId').addEventListener('click', () => {
  alert("This feature is under development")
});

document.getElementById('next-card').addEventListener('click', () => {
  currentCard++;
  document.querySelector('.flashcard').classList.remove('flipped');
  updateFlashcardUI();
});

document.getElementById('prev-card').addEventListener('click', () => {
  currentCard--;
  document.querySelector('.flashcard').classList.remove('flipped');
  updateFlashcardUI();
});

document.getElementById('add-card').addEventListener('click', async () => {
  const newFront = prompt("Enter front text:");
  const newBack = prompt("Enter back text:");

  if (newFront && newBack) {
    const newCard = { front: newFront, back: newBack };
    await addFlashcard(newCard);
    updateFlashcardUI();
  }
});

document.getElementById('update-card').addEventListener('click', async () => {
  const updatedFront = prompt("Enter new front text:", flashcards[currentCard].front);
  const updatedBack = prompt("Enter new back text:", flashcards[currentCard].back);

  if (updatedFront && updatedBack) {
    const updatedCard = { front: updatedFront, back: updatedBack };
    await updateFlashcard(flashcards[currentCard].id, updatedCard);
    updateFlashcardUI();
  }
});

document.getElementById('delete-card').addEventListener('click', async () => {
  await deleteFlashcard(flashcards[currentCard].id);
  currentCard--;
  updateFlashcardUI();
});

document.getElementById('load-csv').addEventListener('click', async () => {
  const csvUrl = document.getElementById('csv-url').value;
  if (csvUrl) {
      try {
          const response = await fetch(csvUrl);
          const csvText = await response.text();
          const parsedCards = parseCSV(csvText);
          for (let card of parsedCards) {
              await addFlashcard(card);
          }
          updateFlashcardUI();
      } catch (error) {
          alert("Failed to load CSV file. Please check the URL and try again.");
      }
  }
});

//#region database
const db = await getFlashCardDatabase();

async function getFlashcards() {
  let cards = await db.flashcards.toArray();
  return cards;
}

async function addFlashcard(flashcard) {
  await db.flashcards.add(flashcard);
}

async function updateFlashcard(id, flashcard) {
  flashcard.id = id;
  await db.flashcards.put(flashcard);
}

async function deleteFlashcard(id) {
  await db.flashcards.delete(id);
}
//#endregion

function parseCSV(csvText) {
  const rows = csvText.split('\n');
  return rows.map(row => {
      const [front, back] = row.split(',');
      return { front, back };
  }).filter(card => card.front && card.back);
}

registerServiceWorker();

window.onload = async () => {
  updateFlashcardUI();
};