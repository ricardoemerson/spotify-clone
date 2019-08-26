import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'playlists/GET_REQUEST',
  GET_SUCCESS: 'playlists/GET_SUCCESS',
};

const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
});

export default function Playlist(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.GET_REQUEST:
      return state.merge({ loading: true });

    case Types.GET_SUCCESS:
      return state.merge({ loading: false, data: payload.data });

    default:
      return state;
  }
}

export const Creators = {
  getPlaylistsRequest: () => ({ type: Types.GET_REQUEST }),

  getPlaylistsSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
};
