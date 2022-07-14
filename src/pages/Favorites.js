import React from 'react';
import Header from '../components/Header';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: JSON.parse(localStorage.getItem('favorite_songs')),
    };
  }

  render() {
    const { favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {favoriteSongs.map((item) => (
          <p key={ item.trackName }>
            -
            {' '}
            {item.trackName}
          </p>))}
      </div>
    );
  }
}

export default Favorites;
