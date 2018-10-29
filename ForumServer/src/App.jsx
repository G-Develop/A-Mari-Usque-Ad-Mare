import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:'Anonymous',
      messages: [],
      activeConnections:0
    };
  }

  componentDidMount() {
    this.socket  = new WebSocket('ws://localhost:3001')
    this.socket.onopen = (e) => {
      console.log("Connected to the server")
    };
    this.socket.onmessage = (e) => {
      // The socket event data is encoded as a JSON string.
      const data = JSON.parse(e.data); // This will parse the string into an object
      switch(data.type) {
        case 'incomingMessage':
          this.setState({
            messages:this.state.messages.concat(data)
          });
          break;
        case 'incomingNotification':
          this.setState({
          /*  currentUser:data.userName,*/
            messages:this.state.messages.concat(data)
          })
          break;
        case 'connectedUsers':
          this.setState({
            activeConnections: data.userCount
          });
          break;
        default:
          break;
      }
    };
  }


 //==================================== NOTIFICATION AND MESSAGE FUNCTIONS THAT WILL SEND THE DATA TO THE SERVER ===================================

  //sends the notification  object to the server with the type set at postNotification  to be later caught by the server's filtering catch statement
  changeUsername = (user) =>  {
    if(this.state.currentUser !== user) {
      const notificationObj = {
        type: "postNotification",
        content: `${this.state.currentUser} changed their name to ${user}`,
        /*userName:user*/
      }
      this.socket.send(JSON.stringify(notificationObj));
      this.setState({
        currentUser: user
      })
    }
  }

  //sends the message object to the server with the type set at postMessage to be later caught by the server's filtering catch statement
  appendMessage = (message) => {
    const messageObj = {
      type:"postMessage",
      content:message ,
      userName :this.state.currentUser
    }
    this.socket.send(JSON.stringify(messageObj))
  }
 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  render() {
    console.log('app', this.state)
    return (
      <div>
        {/* ===NAV BAR COMPONENT== */}
        <NavBar
          activeConnections={this.state.activeConnections}
        />
        {/* ===MESSAGE LIST COMPONENT== */}
        <MessageList messages={this.state.messages} />
        {/* ===CHAT BAR COMPONENT== */}
        <ChatBar
          currentUser={this.state.currentUser}
          changeUsername={this.changeUsername}
          appendMessage={this.appendMessage}
        />
      </div>
    )
  }
}
export default App;
