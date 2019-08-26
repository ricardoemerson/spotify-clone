import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST: 'playlistDetails/GET_REQUEST',
  GET_SUCCESS: 'playlistDetails/GET_SUCCESS',
};

const INITIAL_STATE = Immutable({
  data: {},
  loading: false,
});

export default function playlistDetails(state = INITIAL_STATE, { type, payload }) {
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
  getPlaylistDetailsRequest: id => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),

  getPlaylistDetailsSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
};
