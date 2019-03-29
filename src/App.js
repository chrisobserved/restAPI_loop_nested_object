import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: []
    };
  }

  componentDidMount() {
    fetch('https://h93rvy36y7.execute-api.us-east-1.amazonaws.com/teams')
      .then(response => response.json())
      .then(data => {
        const va = data.filter(x => { return x.state === 'VA'; });
        const members = va.map(x => { return x.members; })
          .flat()
          .filter(x => { return x.role === 'Technical Lead' || x.role === 'Software Engineer' })
          .sort((p1, p2) => {
            if (p1.lastName < p2.lastName) return -1;
            if (p1.lastName > p2.lastName) return 1;
            if (p1.firstName < p2.firstName) return -1;
            if (p1.firstName > p2.firstName) return 1;
            return 0;
          })
          .map(x => {
            x.fullName = x.firstName + ' ' + x.lastName;
            return x; 
          });
          
        this.setState({members});
      });
  }

  render() {
    const { members } = this.state;
    return (
      <div className="App">
      {
        members.length > 0 &&
        members.map(x => {
          return (
            <div key={x.fullName} className="membersList">{x.fullName}</div>
          )
        })
      }
      </div>
    );
  }
}

export default App;
