# LSMTreeWebApp
# Node.js MongoDB Transaction Log Uploader

This Node.js application connects to a MongoDB database and uploads database transaction logs.
Each transaction log contains 10 elements that each consist of an operation, and a key value pair.

Example of how one transaction in a log is formatted:
{
    "operation": "insert",
    "data": {
        "key": "123",
        "value": "Value1"
    }
}

## Usage

To run the program, use the following command in the project directory:

node app.js
