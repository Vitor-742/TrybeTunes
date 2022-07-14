import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbum from '../components/CardAlbum';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputButton: true,
      artistName: '',
      loading: false,
      albums: [],
      empty: false,
    };
  }

  procuraAlbum = () => {
    this.setState({ loading: true }, async () => {
      const { artistName } = this.state;
      const albums = await searchAlbumsAPI(artistName);
      const a = albums.length === 0
        ? this.setState({ empty: true })
        : this.setState({ empty: false });
      this.setState({
        albums,
        loading: false,
      });
      return a;
    });
  };

  habilitaBotao = (event) => {
    const a = event.target.value.length >= 2
      ? this.setState({ inputButton: false })
      : this.setState({ inputButton: true });
    this.setState({ artistName: event.target.value });
    return a;
  };

  render() {
    const { inputButton, artistName, loading, albums, empty } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.habilitaBotao }
                placeholder="Nome"
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ inputButton }
                onClick={ this.procuraAlbum }
              >
                Pesquisar Música
              </button>
            </div>
          )}
          {albums.length !== 0 && (
            <div>
              <p>
                Resultado de álbuns de:
                {` ${artistName}`}
              </p>
              {albums.map((album) => (
                <CardAlbum album={ album } key={ album.collectionId } />
              ))}
            </div>
          )}
          {empty === true && <p>Nenhum álbum foi encontrado</p>}
        </div>
      </div>
    );
  }
}

export default Search;
