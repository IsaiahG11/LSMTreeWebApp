const readline = require('readline');
const loadToMongo = require('./loadToMongo'); // The script for loading a custom transaction log to MongoDB
const loadFromMongo = require('./loadFromMongo'); // The script for loading and performing work on a transaction log from MongoDB

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('Menu:');
  console.log('1. Load a custom transaction log to MongoDB');
  console.log('2. Load and perform work on a Transaction log from MongoDB');
  console.log('3. Exit');
}

function processChoice(choice) {
  switch (choice) {
    case '1':
      loadToMongo(); // Call the function to load a custom transaction log to MongoDB
      break;
    case '2':
      loadFromMongo(); // Call the function to load and perform work on a transaction log from MongoDB
      break;
    case '3':
      rl.close(); // Exit the program
      break;
    default:
      console.log('Invalid choice. Please enter a valid option (1, 2, or 3).');
  }
  if (choice !== '3') {
    displayMenu();
    rl.question('Enter your choice: ', processChoice);
  }
}

displayMenu();
rl.question('Enter your choice: ', processChoice);
