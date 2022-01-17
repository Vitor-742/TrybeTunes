import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const {
      checked,
      handChange,
      Music: { trackName, previewUrl, trackId },
      Music,
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
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onChange={ () => handChange(Music) }
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
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  handChange: PropTypes.func.isRequired,
};

export default MusicCard;
