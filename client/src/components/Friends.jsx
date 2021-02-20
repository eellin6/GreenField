import React, { Component } from 'react';
import axios from 'axios';
class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isFriend: false
    };
    this.fetchUsers = this.fetchUsers.bind(this);
    this.updateFriendStatus = this.updateFriendStatus.bind(this);
    // this.yourUsername = this.yourUsername.bind(this);
  }

  // get all users
  fetchUsers() {
    axios.get('/users')
      .then(({ data }) => this.setState({ users: data }))
      .catch((err) => console.warn(err));
  }

  // update friend status in db
  updateFriendStatus(friendName) {
    axios.get('');
  }

  // if user is you, don't show
  // yourUsername(username) {
  //   axios.get('/find', { username })
  //     .then(({ data }) => console.log(data))
  //     .catch((err) => console.warn(err));
  // }

  componentDidMount() {
    this.fetchUsers();
  }

  // each user will have a + (if the users are not friends) or - (if the users are friends)
  render() {
    const { users, isFriend } = this.state;
    users.sort((a, b) => a.username - b.username);
    return (
      <div id="friend-container">
        {
          users.map((user, i) => {
            const { username } = user;
            // if (!this.yourUsername(username)) {
            return ( <div key={ String(i) }>
              <div id="friend-list">
                <span className="friend befriend">{isFriend ? '-' : '+'} </span>
                <span className="friend"> {username}</span>
              </div>
              <br></br>
            </div>
            );
            // }
          })
        }
      </div>
    );
  }
}

export default Friends;
