import React from 'react';

import dummyImg from './frame.png';

import {
  Container,
  Input,
  Image,
  List,
  Transition,
  Sticky,
  Placeholder,
  Divider
} from 'semantic-ui-react';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      contacts: [],
      search: '',
      loading: true
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(res => this.setState({ contacts: res, loading: false }));
  }

  render() {
    const shownContacts = this.state.contacts.filter(elem => {
      const lc = elem.name.toLowerCase();
      const filter = this.state.search.toLowerCase();

      return lc.includes(filter);
    });

    const placeholders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
      <Container>
        <Sticky>
          <Input
            placeholder="Search..."
            className="input-search"
            icon="search"
            fluid
            onChange={e =>
              this.setState({ search: e.target.value.trimStart() })
            }
            value={this.state.search}
          />
        </Sticky>

        {
          <Transition.Group
            as={List}
            animation="fade right"
            duration={200}
            divided
          >
            {this.state.loading
              ? placeholders.map(elem => (
                  <div key={elem}>
                    <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                    </Placeholder>
                    <Divider />
                  </div>
                ))
              : shownContacts.map(elem => {
                  const parts = elem.name.split(
                    new RegExp(`(${this.state.search})`, 'gi')
                  );

                  return (
                    <List.Item key={elem.id}>
                      <Image src={dummyImg} avatar />
                      <List.Content>
                        <List.Header as="h4">
                          {parts.map((part, i) =>
                            part.toLowerCase() ===
                              this.state.search.toLowerCase() &&
                            this.state.search.length > 0 ? (
                              <span
                                key={i}
                                style={{
                                  borderRadius: '3px',
                                  background: '#2185d0',
                                  color: 'white'
                                }}
                              >
                                {part}
                              </span>
                            ) : (
                              <span>{part}</span>
                            )
                          )}
                        </List.Header>
                        <List.Description>{elem.phone}</List.Description>
                      </List.Content>
                    </List.Item>
                  );
                })}
          </Transition.Group>
        }
      </Container>
    );
  }
}
