import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaylistDetailsActions } from '../../store/ducks/playlistDetails';
import { Creators as PlayerActions } from '../../store/ducks/player';

import {
  Container, Header, SongList, SongItem,
} from './styles';

import Loading from '../../components/Loading';

import ClockIcon from '../../assets/images/clock.svg';
import PlusIcon from '../../assets/images/plus.svg';

const Playlist = ({
  match, playlistDetails, getPlaylistDetailsRequest, loadSong, currentSong,
}) => {
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    loadPlaylistDetails();
  }, [match.params.id]);

  const loadPlaylistDetails = () => {
    const { id } = match.params;

    getPlaylistDetailsRequest(id);
  };

  const renderDetails = () => {
    const playlist = playlistDetails.data;

    return (
      <Container>
        <Header>
          <img src={ playlist.thumbnail } alt={ playlist.title } />

          <div>
            <span>PLAYLIST</span>
            <h1>{ playlist.title }</h1>
            { !!playlist.songs && <p>{ playlist.songs.length } música(s)</p> }

            <button type="button">PLAY</button>
          </div>
        </Header>

        <SongList cellPadding={ 0 } cellSpacing={ 0 }>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Título</th>
              <th>Artista</th>
              <th>Álbum</th>
              <th><img src={ ClockIcon } alt="Duração" /></th>
            </tr>
          </thead>
          <tbody>
            { !playlist.songs ? (
              <tr>
                <td colSpan={ 5 }>Nenhuma música cadastrada.</td>
              </tr>
            ) : (
              playlist.songs.map(song => (
                <SongItem
                  key={ song.id }
                  onClick={ () => setSelectedSong(song.id) }
                  onDoubleClick={ () => loadSong(song, playlist.songs) }
                  selected={ selectedSong === song.id }
                  playing={ currentSong && currentSong.id === song.id }
                >
                  <td><img src={ PlusIcon } alt="Adicionar" /></td>
                  <td>{ song.title }</td>
                  <td>{ song.author }</td>
                  <td>{ song.album }</td>
                  <td>3:26</td>
                </SongItem>
              ))
            ) }

          </tbody>
        </SongList>
      </Container>
    );
  };

  return playlistDetails.loading
    ? (
      <Container loading={ 1 }>
        <Loading />
      </Container>
    )
    : renderDetails();
};

Playlist.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  getPlaylistDetailsRequest: PropTypes.func.isRequired,
  playlistDetails: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      thumbnail: PropTypes.string,
      description: PropTypes.string,
      songs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        author: PropTypes.string,
        album: PropTypes.string,
      })),
    }),
    loading: PropTypes.bool,
  }).isRequired,
  loadSong: PropTypes.func.isRequired,
  // currentSong: PropTypes.shape({
  //   id: PropTypes.number,
  // }).isRequired,
};

const mapStateToProps = state => ({
  playlistDetails: state.playlistDetails,
  currentSong: state.player.currentSong,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { ...PlaylistDetailsActions, ...PlayerActions },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
