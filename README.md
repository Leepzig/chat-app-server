
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

- If two users try to log on at the same time, it's possible they could log on as the same user.
- The only way to log out is to refresh the page.
- If the server is shut down while two users are logged in, then you have to manually change the online status in the database for the users to be able to login again.



