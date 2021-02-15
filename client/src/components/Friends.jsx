import React, { Component } from 'react';
import axios from 'axios';
class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  // get all users
  fetchUsers() {
    axios.get('/users')
      .then(({ data }) => {
        console.log(data);
        this.setState({ users: data });
      })
      .catch((err) => console.warn(err));
  }

  componentDidMount() {
    this.fetchUsers();
  }

  // map over users and return a list of users
  // each user will have a + (if the users are not friends) or - (if the users are friends)
  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Friends;
