import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputButton: true,
    };
  }

  habilitaBotao = (event) => {
    const a = event.target.value.length >= 2
      ? this.setState({ inputButton: false })
      : this.setState({ inputButton: true });
    return a;
  }

  render() {
    const { inputButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.habilitaBotao }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ inputButton }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
