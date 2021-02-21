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
    // console.info('FRIEND NAME', friendName);
    axios.get(`/users/id/${friendName}`)
      .then(({data}) => {
        return axios.get('/friends/status', { params: { friend: data } });
      })
      .then(({ data }) => {
        // console.info('friends jsx --- bool', data);
        this.setState({isFriend: data});
        return data;
      })
      .catch((err) => console.warn(err));
  }

  updateFriendStatus(friendName) {
    this.checkFriendStatus(friendName)
      .then((data) => {
        const { isFriend } = this.state;
        // console.info('HERE', data);
        !isFriend
          ? axios.get(`/users/id/${friendName}`)
            .then(({data}) => {
              // console.info('get friend data', data);
              return axios.post('/friends', { friend: data });
            })
            // .then(({ data }) => console.info('WHAT IS THIS', data))
            .then(({ data }) => data)
            .catch((err) => console.warn(err))
          : axios.get(`/users/id/${friendName}`)
            .then(({ data }) => {
              // console.info('THIS HERE', data);
              return axios.delete('/friends', { params: { friend: data } });
            })
            .then(() => {
              // console.info('friend unfollowed', data);
              this.setState({ isFriend: false });
            })
            .catch((err) => console.warn(err));
      })
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
