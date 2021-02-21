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

  // get all users
  fetchUsers() {
    axios.get('/users')
      .then(({ data }) => this.setState({ users: data }))
      .catch((err) => console.warn(err));
  }

  async checkFriendStatus(friendName) {
    console.info('FRIEND NAME', friendName);
    axios.get(`/users/id/${friendName}`)
      .then(({data}) => {
        console.info('FIRST DATA', data);
        return axios.get('/friends/status', { params: { friend: data } });
      })
      .then(({ data }) => {
        console.info('friends jsx --- this is false bc undefined', data);
        return data;
      })
      .catch((err) => console.warn(err));
  }

  updateFriendStatus(friendName) {
    this.checkFriendStatus(friendName)
      .then((data) => {
        console.info('HERE', data);
        !data
          ? axios.get(`/users/id/${friendName}`)
            .then(({data}) => {
              console.info('LAST DATA `````', data);
              return axios.post('/friends', { friend: data });
            })
            .then(({ data }) => {
              console.info('THIS DATA ---', data);
            })
            .catch((err) => console.warn(err))
          : axios.delete('/friends', { params: { friend: friendName } })
            .then(({ data }) => console.info('friend unfollowed', data))
            .catch((err) => console.warn(err));
      })
      // .then(() => this.setState({isFriend: !this.state.isFriend}))
      .then(() => this.fetchUsers)
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

            return <Friend key={String(i)} username={username}
              updateFriendStatus={this.updateFriendStatus} />;

          })
        }
      </div>
    );
  }
}

export default Friends;
