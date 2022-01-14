import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.retornaUsuario();
  }

  retornaUsuario() {
    this.setState({ loading: true }, async () => {
      const a = await getUser();
      this.setState({
        usuario: a.name,
        loading: false,
      });
    });
  }

  render() {
    const { loading, usuario } = this.state;

    return (
      <header data-testid="header-component">
        <p>header</p>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        <p data-testid="header-user-name">
          {(loading) ? <Loading /> : usuario}
        </p>
      </header>
    );
  }
}

export default Header;
