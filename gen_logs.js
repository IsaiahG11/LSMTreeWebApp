/**
* @author Dylan Miller & Isaiah Hermance
* @version September 2023
* @class Gather transactions through user input for our MongoDB database
*/

numTransactions = 0;

function buildTransaction(){
    console.log("Please select an operation for the transaction via the operations first letter");
    selectedOp = prompt("Insert (i)\tDelete (d)\tUpdate (u)\n");

    console.log("Please enter a 'key' for the key value pair of the data you'd like to enter")
    newKey = prompt("Pressing enter without input will result in a default key\n");

    console.log("Please enter a 'value' for the key value pair of the data you'd like to enter")
    newValue = prompt("Pressing enter without input will result in a default value\n");

    newTransaction = {"operation": selectedOp, "data": {"key": newKey, "value": newValue}};

    return newTransaction;
}

function buildLog(){

    logStruct = [];

    //While loop for repeating prompt and log building. Recursion will cause issues with logStruct.

    console.log("Current number of transactions in this log: " + numTransactions);
    newLog = prompt("Would you like to add a transaction to the current log? (y/n)\n");

    if(newLog === 'y' || newLog === 'Y'){
        newTransaction = buildTransaction();
        logStruct.push(newTransaction);
        numTransactions++;
        console.log("\n\n------------------------------------------------------------------------\n\n");
        buildLog();
    }else if(newLog === 'n' || newLog === 'N'){
        console.log("Please enter a file name for the transaction log omitting any extensions");
        fileName = prompt("Pressing enter without input will result in a default file name\n");
        saveAsJson(fileName, logStruct);
    }else{
        console.log("Enter a proper value (y/n)");
        buildLog();
    }
}

function saveAsJson(fileName, logStruct){
    jsonData = JSON.stringify(logStruct);

    const fs = require('fs');
    try{
        fs.writeFile("./transaction_logs/" + fileName, jsonData);
    }catch(err){
        console.log("could not save log as JSON file");
        process.exit(1);
    }
}

function menu(){
    
    console.log("\n1: Create new transaction log\n2: Exit log generator\n");
    menuOption = prompt("Please enter the number of an option\n");

    switch(menuOption){
        case 1:
            buildLog();
            break;
        case 2:
            process.exit(0);
            break;
        default:
            console.log("Please select a valid option");
            menu();
    }
}

function main(){
    console.log("Welcome to the custom transaction log generator");
    menu();
}

