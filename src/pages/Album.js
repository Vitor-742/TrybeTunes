import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      dataAlbum: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.devolveMusicas();
  }

  devolveMusicas = async () => {
    const { match: { params: { id } } } = this.props;
    const dataAlbum = await getMusics(id);
    this.setState({ loading: true }, () => {
      this.setState({
        dataAlbum,
        loading: false,
      });
    });
  };

  render() {
    const { dataAlbum, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <h2 data-testid="artist-name">{dataAlbum[0].artistName}</h2>
        )}
        {loading ? (
          <Loading />
        ) : (
          <h3 data-testid="album-name">
            {`${dataAlbum[0].collectionName} - ${dataAlbum[0].artistName}`}
          </h3>
        )}
        {loading
          ? <Loading />
          : <img src={ dataAlbum[0].artworkUrl100 } alt={ dataAlbum[0].collectionId } />}
        {dataAlbum
          .filter((musica, index) => index !== 0)
          .map((musica) => (
            <MusicCard Music={ musica } key={ musica.trackId } />
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
