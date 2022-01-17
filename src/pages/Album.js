import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      dataAlbum: [],
      loading: true,
      loadingSongs: true,
      idFav: [],
    };
  }

  componentDidMount() {
    this.devolveMusicas();
  }

  atualizaState = (objSong) => {
    this.setState({ loadingSongs: true }, async () => {
      await addSong(objSong);
      const favoriteSongs = await getFavoriteSongs();
      const idFav = favoriteSongs.map((musica) => musica.trackId);
      this.setState({
        loadingSongs: false,
        /* favoriteSongs, */
        idFav,
      });
    });
  }

  devolveMusicas = async () => {
    const { match: { params: { id } } } = this.props;
    const dataAlbum = await getMusics(id); // chamar denovo
    const favoriteSongs = await getFavoriteSongs();
    const idFav = favoriteSongs.map((musica) => musica.trackId);
    this.setState({ loading: true }, () => {
      this.setState({
        idFav,
        /* favoriteSongs, */
        dataAlbum,
        loading: false,
        loadingSongs: false,
      });
    });
  };

  render() {
    const { dataAlbum, loading, idFav, loadingSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h2 data-testid="artist-name">{dataAlbum[0].artistName}</h2>
            <h3 data-testid="album-name">
              {`${dataAlbum[0].collectionName} - ${dataAlbum[0].artistName}`}
            </h3>
            <img src={ dataAlbum[0].artworkUrl100 } alt={ dataAlbum[0].collectionId } />
          </div>
        )}
        {loadingSongs
          ? <Loading />
          : dataAlbum
            .filter((musica, index) => index !== 0)
            .map((musica) => (
              <MusicCard
                Music={ musica }
                key={ musica.trackId }
                checked={ idFav.includes(musica.trackId) }
                handChange={ this.atualizaState }
              />
            ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
