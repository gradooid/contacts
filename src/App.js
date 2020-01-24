import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      contacts: [],
      search: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(res => this.setState({ contacts: res }));
  }

  render() {
    const shownContacts = this.state.contacts;

    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={e => this.setState({ search: e.target.value })}
          value={this.state.search}
        />
        <ul>
          {shownContacts.map(elem => (
            <li key={elem.id}>
              <h4>{elem.name}</h4>
              <span>{elem.phone}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
