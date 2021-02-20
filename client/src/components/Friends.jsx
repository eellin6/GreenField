import React, { Component } from 'react';
import axios from 'axios';
class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isFriend: false,
      friendName: ''
    };
    this.fetchUsers = this.fetchUsers.bind(this);
    this.checkFriendStatus = this.checkFriendStatus.bind(this);
    this.updateFriendStatus = this.updateFriendStatus.bind(this);
  }

  // get all users
  fetchUsers() {
    axios.get('/users')
      .then(({ data }) => this.setState({ users: data }))
      .catch((err) => console.warn(err));
  }

  checkFriendStatus(friendName) {
    console.info('FRIEND NAME', friendName);
    axios.get('/friends/status', { params: { friend: friendName } })
      .then(({ data }) => {
        console.info(data);
      })
      .catch((err) => console.warn(err));
  }

  updateFriendStatus(friendName) {
    //check friend status
    this.checkFriendStatus(friendName)
      .then(({ data }) => {
        !data
          ? axios.post('/friends', { params: { friend: friendName } })
            .then(({ data }) => console.info('friend followed', data))
            .catch((err) => console.warn(err))
          : axios.delete('/friends', { params: { friend: friendName } })
            .then(({ data }) => console.info('friend unfollowed', data))
            .catch((err) => console.warn(err));
      })
      .then(() => this.setState({isFriend: !isFriend}))
      .then(() => this.fetchUsers)
      .catch((err) => console.warn(err));
  }

  componentDidMount() {
    this.fetchUsers();
  }

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
              <div id="friend-item"
                onClick={() => this.updateFriendStatus(username)}>
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
