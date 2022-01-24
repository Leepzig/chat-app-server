
# Packages
- express
- socket.io (used for websockets)
- cors
- diskdb (used for saving messages between sessions.)
- body-parser (used to parse body of requests)



# Setup
Clone the repository along with the chat-app-client.
run `npm install` in the terminal and then `node index.js`. You should see this in the terminal:
```
Successfully connected to : ./data
Server is listening on port 3001
```


# Bugs

- Two users can log in as the same user.
- Users online status don't match with whether they're actually online or not.
- refreshing the page logs a user out

