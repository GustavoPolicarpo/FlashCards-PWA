export default async function getFlashCardDatabase() {
    const { default: Dexie } = await import(
      'https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm'
    );
    const db = new Dexie('FlashCardDatabase');
    db.version(1).stores({
      flashcards: '++id,front,back',
    });
    return db;
  }
  