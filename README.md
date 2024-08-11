# Flashcards PWA

This is a Progressive Web App (PWA) using flashcards. The app allows users to create, update, and delete flashcards, import flashcards from a CSV file, and even works offline thanks to its service worker.

## Features

- **Create, Update, Delete Flashcards:** Manage your flashcards directly within the app.
- **Deck Selection:** A dropdown menu to switch between different decks (future feature).
- **CSV Import:** Import multiple flashcards at once by providing a URL to an external CSV file.
- **Offline Support:** Works offline due to service worker caching.
- **Installable:** Can be installed on mobile devices and desktops as a PWA.

## Demo

You can try the app live on GitHub Pages: [Language Flashcards PWA](https://yourusername.github.io/language-flashcards/)

## Usage

### Adding and Managing Flashcards

- **Adding a Flashcard:** Use the "Add" button to create a new flashcard with a front and back side.

- **Updating a Flashcard:** Edit the current flashcard and click the "Update" button to save changes.

- **Deleting a Flashcard:** Remove the current flashcard by clicking the "Delete" button.

### Importing Flashcards from CSV

1. In the bottom-left corner, enter the URL of a CSV file containing your flashcards. You can use these [English to Portugues](https://yourusername.github.io/language-flashcards/import-example/deck_1.csv) or [English to Japanse](https://yourusername.github.io/language-flashcards/import-example/deck_2.csv) as example.
2. Click the "Load CSV" button to import the flashcards.

**CSV Format:**
```csv
Front text 1,Back text 1
Front text 2,Back text 2
```

### Adding and Managing Flashcards

A dropdown menu at the top right allows you to switch between different decks of flashcards. This feature is under construction.

## Technologies Used

- **HTML, CSS, JavaScript:** Core web technologies for building the app interface.
- **IndexedDB:** Used for storing flashcards in the browser.
- **Service Workers:** For offline functionality and caching resources.
- **Manifest:** Allows the app to be installed as a PWA.
