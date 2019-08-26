import Immutable from 'seamless-immutable';

export const Types = {
  SET: 'error/SET',
  HIDE: 'error/HIDE',
};

const INITIAL_STATE = Immutable({
  visible: false,
  message: null,
});

export default function Error(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.SET:
      return state.merge({ visible: true, message: payload.message });

    case Types.HIDE:
      return state.merge({ visible: false });

    default:
      return state;
  }
}

export const Creators = {
  setError: message => ({
    type: Types.SET,
    payload: { message },
  }),

  hideError: () => ({ type: Types.HIDE }),
};
