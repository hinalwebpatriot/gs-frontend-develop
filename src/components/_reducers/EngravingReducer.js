const initialState = {
  value: ''
};

const UpdateEngraving = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_ENGRAVING':
    return {
      ...state,
      engraving: payload
    };
    default:
      return state;
  }
};

export default UpdateEngraving;
