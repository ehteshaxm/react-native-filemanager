import * as themeActions from './actions';

export const themeReducer = (state = 'light', action) => {
  switch (action.type) {
    case themeActions.SET_THEME:
      return action.payload;
    default:
      return 'light';
  }
};

export const hiddenReducer = (state = false, action) => {
  switch (action.type) {
    case themeActions.SHOW_HIDDEN_FILES:
      return action.payload;
    default:
      return false;
  }
};
