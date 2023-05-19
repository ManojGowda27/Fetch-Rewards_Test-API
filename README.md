# Receipt Processor

The Receipt Processor is a web service that processes receipts and calculates the points earned based on predefined rules. It provides two endpoints: one for processing receipts and generating an ID, and another for retrieving the points awarded for a specific receipt ID.

## API Summary
The application exposes the following API endpoints:

### Process Receipts
- Endpoint: `/receipts/process`
- Method: POST
- Payload: Receipt JSON
- Response: JSON containing an ID for the receipt
- Description: Takes in a JSON receipt and returns a JSON object with a generated ID. The ID is used to fetch the number of points awarded for the receipt.

Request:
    ```
    POST /receipts/process
    Content-Type: application/json

        {
            "retailer": "Target",
            "purchaseDate": "2022-01-01",
            "purchaseTime": "13:01",
            "items": [
                {
                "shortDescription": "Mountain Dew 12PK",
                "price": "6.49"
                },{
                "shortDescription": "Emils Cheese Pizza",
                "price": "12.25"
                },{
                "shortDescription": "Knorr Creamy Chicken",
                "price": "1.26"
                },{
                "shortDescription": "Doritos Nacho Cheese",
                "price": "3.35"
                },{
                "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
                "price": "12.00"
                }
            ],
            "total": "35.35"
        }

    ```

Response:
    ```

    {"id": "bb3cf704-8371-438b-8a21-e43cf2904bf0"}

    ```

### Get Points
- Endpoint: `/receipts/{id}/points`
- Method: GET
- Response: JSON object containing the number of points awarded for the receipt ID
- Description: Fetches the number of points awarded for a specific receipt ID.

Request:
```

GET /receipts/bb3cf704-8371-438b-8a21-e43cf2904bf0/points

```

Response:
```

{"points": 28}

```

## NPM(Node Package Manager)

To install npm (Node Package Manager), you need to install Node.js on your system. npm is bundled with Node.js, so when you install Node.js, npm is automatically installed along with it.

Here are the steps to install npm:

1. Visit the official Node.js website at [](https://nodejs.org).

2. Download the LTS (Long Term Support) version of Node.js for your operating system (Windows, macOS, or Linux).

3. Run the downloaded installer and follow the installation prompts. The installer will guide you through the process, including selecting the installation directory and agreeing to the license terms.

4. Once the installation is complete, open a new terminal or command prompt.

5. To verify that Node.js and npm are installed correctly, run the following command:

### macOS

   ```
   node -v
   ```

### windows OS

   ```
   node -v
   ```

This will display the installed version of Node.js.

6. Similarly, check the version of npm by running the following command:

      ```
      npm -v
      ```

This will display the installed version of npm.

If both commands (node -v and npm -v) return the versions without any errors, it means that npm is successfully installed on your system.

You can now proceed to use npm to manage packages and dependencies for your Node.js projects.

## Development Setup

To run the application locally, follow these steps:

   1. Install the dependencies:
       ```
       npm install

       ```
   2. Start the server:
       ```

       npm run devStart

       ```
      The server will start running at **http://localhost:8000**.

   3. Use an API client like Postman to make requests to the endpoints described above.

## Docker Guide
This guide provides instructions on how to run the Receipt Processor application using Docker.

### Prerequisites
Before proceeding, ensure that you have the following installed on your system:
- Docker: [Install Docker](https://www.docker.com/)

### Getting Started
To run the Receipt Processor application using Docker, follow these steps:

   1. Build the Docker image:
   ```

   docker build -t receipt-processor .

   ```

   2. Run the Docker image:
   ```
   docker run -p <host-port>:<container-port> receipt-processor
   ```
   Replace <host-port> with the port number on your host machine where you want to access the application, and <container-port> with the exposed port specified in the Dockerfile.

   3. Access the Receipt Processor application:

   Open your web browser and go to http://localhost:<host-port> to access the application. If you specified a different host port, use that instead.

## Testing

To run unit tests, run the following command:
   ```
   npm test

   ```
The tests are implemented using the Mocha testing framework.

##Technologies Used
- Node.js - JavaScript runtime environment
- Express.js - Web application framework for Node.js
- Mocha (for testing) - Testing framework
- NPM Packages
- Docker - Containerization platform
