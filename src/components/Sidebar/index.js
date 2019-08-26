import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaylistsActions } from '../../store/ducks/playlists';

import { Container, NewPlayList, Nav } from './styles';

import AddPlayListIcon from '../../assets/images/add_playlist.svg';

import Loading from '../Loading';

const Sidebar = ({ playlists, getPlaylistsRequest }) => {
  useEffect(() => {
    getPlaylistsRequest();
  }, []);

  return (
    <Container>
      <div>
        <Nav main>
          <li>
            <Link to="/">Navegar</Link>
          </li>
          <li>
            <Link to="/">Rádio</Link>
          </li>
        </Nav>

        <Nav>
          <li>
            <span>SUA BIBLIOTECA</span>
          </li>
          <li>
            <Link to="/">Seu Daily Mix</Link>
          </li>
          <li>
            <Link to="/">Tocados Recentemente</Link>
          </li>
          <li>
            <Link to="/">Músicas</Link>
          </li>
          <li>
            <Link to="/">Álbums</Link>
          </li>
          <li>
            <Link to="/">Artistas</Link>
          </li>
          <li>
            <Link to="/">Estações</Link>
          </li>
          <li>
            <Link to="/">Arquivos Locais</Link>
          </li>
          <li>
            <Link to="/">Vídeos</Link>
          </li>
          <li>
            <Link to="/">Podcasts</Link>
          </li>
        </Nav>

        <Nav>
          <li>
            <span>PLAYLIST</span>
            { playlists.loading && <Loading /> }
          </li>

          { playlists.data.map(playlist => (
            <li key={ playlist.id }>
              <Link to={ `/playlists/${ playlist.id }` }>{ playlist.title }</Link>
            </li>
          )) }
        </Nav>
      </div>

      <NewPlayList>
        <img src={ AddPlayListIcon } alt="Adicionar Playlist" />
        Nova Playlist
      </NewPlayList>
    </Container>
  );
};

Sidebar.propTypes = {
  getPlaylistsRequest: PropTypes.func.isRequired,
  playlists: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })),
    loading: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  playlists: state.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
