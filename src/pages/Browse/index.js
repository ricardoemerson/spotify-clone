import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaylistsActions } from '../../store/ducks/playlists';

import {
  Container, Title, List, Playlist,
} from './styles';

import Loading from '../../components/Loading';

const Browse = ({ playlists, getPlaylistsRequest }) => {
  useEffect(() => {
    getPlaylistsRequest();
  }, []);

  return (
    <Container>
      <Title>Navegar { playlists.loading && <Loading /> }</Title>

      <List>
        { playlists.data.map(playlist => (
          <Playlist key={ playlist.id } to={ `/playlists/${ playlist.id }` }>
            <img src={ playlist.thumbnail } alt={ playlist.title } />

            <strong>{ playlist.title }</strong>
            <p>{ playlist.description }</p>
          </Playlist>
        )) }

      </List>
    </Container>
  );
};

Browse.propTypes = {
  getPlaylistsRequest: PropTypes.func.isRequired,
  playlists: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      thumbnail: PropTypes.string,
      description: PropTypes.string,
    })),
    loading: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  playlists: state.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlaylistsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
