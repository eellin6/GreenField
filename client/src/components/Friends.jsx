import React, { Component } from 'react';
import axios from 'axios';
import Friend from './Friend';
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

  // show all users
  fetchUsers() {
    axios.get('/users')
      .then(({ data }) => this.setState({ users: data }))
      .catch((err) => console.warn(err));
  }

  async checkFriendStatus(friendName) {
    axios.get(`/users/id/${friendName}`)
      .then(({data}) => axios.get('/friends/status', { params: { friend: data } }))
      .then(({ data }) => {
        this.setState({isFriend: data});
        return data;
      })
      .catch((err) => console.warn(err));
  }

  updateFriendStatus(friendName) {
    this.checkFriendStatus(friendName)
      .then((data) => {
        const { isFriend } = this.state;
        !isFriend
          ? axios.get(`/users/id/${friendName}`)
            .then(({data}) => axios.post('/friends', { friend: data }))
            .then(() => this.setState({ isFriend: true }))
            .catch((err) => console.warn(err))
          : axios.get(`/users/id/${friendName}`)
            .then(({ data }) => axios.delete('/friends', { params: { friend: data } }))
            .then(() => this.setState({ isFriend: false }))
            .catch((err) => console.warn(err));
      })
      // .then(() => this.fetchUsers)
      .catch((err) => console.warn(err));
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { users } = this.state;
    users.sort((a, b) => a.username - b.username);
    return (
      <div id="friend-container">
        {
          users.map((user, i) => {
            const { username } = user;
            return (
              <Friend
                key={String(i)}
                username={username}
                updateFriendStatus={this.updateFriendStatus} />
            );
          })
        }
      </div>
    );
  }
}

export default Friends;
