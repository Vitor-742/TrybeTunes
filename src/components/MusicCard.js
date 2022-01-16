import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  adicionarMusic = () => {
    const { Music } = this.props;
    this.setState({ loading: true }, async () => {
      await addSong(Music);
      this.setState({ loading: false });
    });
  };

  render() {
    const {
      Music: { trackName, previewUrl, trackId },
    } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        { loading && <Loading /> }
        <label htmlFor="checkFavorite">
          Favorita
          <input
            type="checkbox"
            id="checkFavorite"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.adicionarMusic }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  Music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
