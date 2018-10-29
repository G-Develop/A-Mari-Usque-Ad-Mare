import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    //console.log('this.props', this.props)
    const messages = this.props.messages.map((message,id) => {
      return <Message key={id} message={message} />
    })
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}
  export default MessageList;
