import React, {Component} from 'react';

class Message extends Component {
  render() {
      switch(this.props.message.type) {
        case 'incomingMessage':
          
    return (
      <div>
      <div className="message">
        <span className="message-username">{this.props.message.userName}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    </div>
  )
          break;
        case 'incomingNotification':
            
    return (

  <div className="message system">
      <span className="message-content">{this.props.message.content}</span>
    </div>
  )
          break;
        default:
          break;
      }
    return (
      <div>
      <div className="message">
        <span className="message-username">{this.props.message.userName}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    </div>
  )

  }

}


export default Message;
