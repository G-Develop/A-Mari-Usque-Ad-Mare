# Chatty App Project

Chatty, is simple version of slack and what's app where using web sockets users are able to send and recieve messages in real time. 


## Final Product

![“Screenshot when 2 user online”](https://raw.githubusercontent.com/G-Develop/ChattyApp/master/docs/showing%20active%20users.png)
![“users_can_chat_in real time  and a notification is displayed when the name changes"](https://raw.githubusercontent.com/G-Develop/ChattyApp/master/docs/ShowingNameChangeAndMessage.png)

## Dependencies
* express
* uuid
* ws
* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm start` command.

## Functional
- multiple users can post messages in real-time. 
- users can change the default name to their name, and a notification will be sent  to all the connected users
- the Navbar updates in real time  to reflect  the number of users connected
