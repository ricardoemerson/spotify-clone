import Immutable from 'seamless-immutable';
import Sound from 'react-sound';

export const Types = {
  LOAD: 'player/LOAD',
  PLAY: 'player/PLAY',
  PAUSE: 'player/PAUSE',
  PREV: 'player/PREV',
  NEXT: 'player/NEXT',
  PLAYING: 'player/PLAYING',
  HANDLE_POSITION: 'player/HANDLE_POSITION',
  SET_POSITION: 'player/SET_POSITION',
  SET_VOLUME: 'player/SET_VOLUME',
};

const INITIAL_STATE = Immutable({
  currentSong: null,
  list: [],
  status: Sound.status.PLAYING,
  position: null,
  positionShown: null,
  duration: null,
  volume: 100,
});

export default function Player(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.LOAD:
      return state.merge({
        currentSong: payload.song,
        list: payload.list,
        status: Sound.status.PLAYING,
      });

    case Types.PLAY:
      return state.merge({ status: Sound.status.PLAYING });

    case Types.PAUSE:
      return state.merge({ status: Sound.status.PAUSED });

    case Types.PREV: {
      const currentIndex = state.list.findIndex(song => song.id === state.currentSong.id);
      const prev = state.list[currentIndex - 1];

      if (prev) {
        return state.merge({ currentSong: prev, status: Sound.status.PLAYING, position: 0 });
      }

      return state;
    }

    case Types.NEXT: {
      const currentIndex = state.list.findIndex(song => song.id === state.currentSong.id);
      const next = state.list[currentIndex + 1];

      if (next) {
        return state.merge({ currentSong: next, status: Sound.status.PLAYING, position: 0 });
      }

      return state;
    }

    case Types.PLAYING:
      return state.merge({ ...payload });

    case Types.HANDLE_POSITION:
      return state.merge({ positionShown: state.duration * payload.percent });

    case Types.SET_POSITION:
      return state.merge({
        position: state.duration * payload.percent, positionShown: null,
      });

    case Types.SET_VOLUME:
      return state.merge({ volume: payload.volume });

    default:
      return state;
  }
}

export const Creators = {
  loadSong: (song, list) => ({
    type: Types.LOAD,
    payload: { song, list },
  }),

  playSong: () => ({ type: Types.PLAY }),

  pauseSong: () => ({ type: Types.PAUSE }),

  prevSong: () => ({ type: Types.PREV }),

  nextSong: () => ({ type: Types.NEXT }),

  playing: ({ position, duration }) => ({
    type: Types.PLAYING,
    payload: { position, duration },
  }),

  handlePosition: percent => ({
    type: Types.HANDLE_POSITION,
    payload: { percent },
  }),

  setPosition: percent => ({
    type: Types.SET_POSITION,
    payload: { percent },
  }),

  setVolume: volume => ({
    type: Types.SET_VOLUME,
    payload: { volume },
  }),
};
