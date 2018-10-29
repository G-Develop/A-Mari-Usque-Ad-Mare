import React, {Component} from 'react';

class ChatBar extends Component {




  //handles when Enter is pressed in the message input element
  handle_eMessageEnter = e => {
    if (e.keyCode == 13) { // keycode 13 is the enter key
      console.log("enter detected")
      e.preventDefault();
      this.props.appendMessage(e.target.value);
    }
  }
  // handles when Enter is pressed in the name input element to allow for a name change
  handle_eNameEnter = e => {
    console.log("this is the event", e)
    if (e.keyCode == 13) { // keycode 13 is the enter key
      e.preventDefault();
      this.props.changeUsername(e.target.value);
    }
  }

  render() {
    return (
    <footer className="chatbar">
      <input
        name="user"
        defaultValue={this.props.currentUser}
        onKeyDown={this.handle_eNameEnter}
        className="chatbar-username"
        placeholder="Your Name (Optional)"
      />

      <input name="message"
        onKeyDown={this.handle_eMessageEnter}
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
      />
    </footer>)
  }

}

export default ChatBar;
