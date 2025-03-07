# Scoreboard module API design

## Overview
This module is designed for managing real-time scoreboard in a effective and secure way. It enables client's website to update score securely and live update the score board.

## Features and Designs
### 1. Authentication
We will use **JWT** to authenticate the user. All the incoming API requests must include a **Bearer Token** that is provided by the system.

### 2. **Live update about top 10 user's score**: 
* Requirement: The application has the ability to serve the latest information about the top 10 user's score.
* Design: 
    - Use **WebSocket** protocal to ensure that all the scoreboard will be broadcast in a efficient way to all the client.
    - Store the top 10 user's score to a **Cache** to make reading process become more effective

### 2. **Increasing user's score with validation**:
* Requirement: User can perform an action to increase there own score. All the actions **must be validated** on backend side before updating the score.

* Design:
    - The user has to authenticate themself before perform any action
    - Double check if the request for incresing the score is valid or not from the backend side.

## Technology stack
* Authentication: JWT Authentication
* Framework: ExpressJS
* Database: PostgreSQL
* Real-time update: WebSocket
* Cache: Redis

## API Endpoints

### 1. Get top 10 scoreboard
#### Endpoint: `api/scoreboard/top`
#### Method: `GET`
#### Request Headers:
```json
{
    "Authentication": "Bearer <jwt_token>",
    "Content-Type": "application/json"
}
```

#### Response:
* If the user failed to authenticate: Return 401 Unauthorized response

* Return a 200 Success response with the following body
    ```json
    {
        [
            {"userId": "string", "userName": "string", "score": number},
            {"userId": "string", "userName": "string", "score": number},
            ...
        ]
    }
    ```

### 2. Increase User's Score
#### Endpoint: `api/score`
#### Method: `POST`
#### Request Headers:
```json
{
    "Authentication": "Bearer <jwt_token>",
    "Content-Type": "application/json"
}
```
#### Request Payload:

Here we will only need the `userId` to identify which user did the action and also `actionId` to check what kind of action did they do and what will be the reward if they actually completed it. The request payload will be:

```json
{
    "userId": "string",
    "actionId": "string"
}
```


NOTE: My assumption is that the system will have different kind of actions and each action will have their different rewards score. Additionally, based on what is the definition of the action, the `actionId` can be replaced with the other detail of the action that can help the system verify if the user actually complete that action or not.
#### Response:
* If the user failed to authenticate: Return 401 Unauthorized response

* If the user didn't complete the action: Return 400 BadRequest and specify the reason.

* Return a 200 Success response with the following body
    ```json
    {
        "userId": "string", 
        "userName": "string",
        "score": number
    }
    ```
    that will indicate the updated score of that user.

## WebSocket Endpoint
### Broadcast the top 10 user's score
After users successfully authenticate themself with the system, the client will establish a connection to the WebSocket server. We use WebSocket to notify clients about changing in the scoreboard.

#### Endpoint: `wss://yourapplicationaddress.com/ws/scoreboard`
#### Authorization Header
When the client establish the connection the WebSocket server, it has to include a JWT token in the `Authentication` header.
```json
{
    "Authentication": "Bearer <jwt_token>"
}
```

#### Top 10 user's score message
Whenever there's an update in the scoreboard, the WebSocket server will notify all the client about the latest top 10 user's score with the follow message format:

```json
{
  "event": "top10",
  "data": [
    { "userId": "string", "userName": "string", "score": number },
    { "userId": "string", "userName": "string", "score": number },
    ...
  ]
}
```

## Potential Improvement for the Future
1. Implement a rate limiter to restrict the number of request that user can make in a certain amount of time.
2. Add a Logging mechanism to store all the action and score history. Make it the data more consistent and tracable.
3. If the number of user increase we can scale up the API server by add an `API Gateway` and a `Load Balancer` and then increase the number of API server instance.