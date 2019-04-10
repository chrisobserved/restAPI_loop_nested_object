import React, { Component } from 'react';

import 'normalize.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: []
    }
  }

  componentDidMount() {
    fetch('https://h93rvy36y7.execute-api.us-east-1.amazonaws.com/teams')
      .then(response => response.json())
      .then(data => {
        const va = data.filter(x => x.state === 'VA' );
        const members = va.map(x => x.members )
          .flat()
          .filter(x => x.role === 'Technical Lead' || x.role === 'Software Engineer')
          .sort((p1, p2) =>
            (p1.lastName < p2.lastName) ? -1 :
            (p1.lastName > p2.lastName) ? 1 :
            (p1.firstName < p2.firstName) ? -1 :
            (p1.firstName > p2.firstName) ? 1 : 0
          )
          .map(x => { 
            x.fullName = x.firstName + ' ' + x.lastName;
            return x
          });
        this.setState({ members });
      })
  }

  render() {
    const { members } = this.state;
    return (
      <div className="App">
        <h2 className="membersHeader">VA Team Members</h2>
        { 
          members.length > 0 &&
          members.map(x => 
            <div key={x.fullName} className="membersList">{x.fullName}</div>
          )
        }
      </div>
    );
  }
}

export default App;
