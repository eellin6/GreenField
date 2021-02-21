import React, { Component } from 'react';
import axios from 'axios';
class Friend extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFriend: false,
    };
    this.checkFriendStatus = this.checkFriendStatus.bind(this);
  }

  checkFriendStatus(friendName) {
    console.info('FRIEND NAME', friendName);
    axios.get(`/users/id/${friendName}`)
      .then(({data}) => {
        // console.info('FIRST DATA', data);
        return axios.get('/friends/status', { params: { friend: data } });
      })
      .then(({ data }) => {
        // console.info('friends jsx --- this is false bc undefined', data);
        if (data) {
          this.setState({isFriend: data});
        }
      })
      .catch((err) => console.warn(err));
  }

  componentDidMount() {
    this.checkFriendStatus(this.props.username);
  }

  render() {
    const { updateFriendStatus, username } = this.props;
    const { isFriend } = this.state;
    return (
      <div>
        <div id="friend-item"
          onClick={() => {
            updateFriendStatus(username);
            this.setState({isFriend: !isFriend});
          }}>
          <span className="friend befriend">{isFriend ? '-' : '+'} </span>
          <span className="friend"> {username}</span>
        </div>
        <br></br>
      </div>
    );
  }
}

export default Friend;
