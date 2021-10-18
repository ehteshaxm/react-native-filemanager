export const SET_THEME = 'SET_THEME';
export const SHOW_HIDDEN_FILES = 'SHOW_HIDDEN_FILES';

export const setTheme = value => ({
  type: SET_THEME,
  payload: value,
});

export const setHidden = value => ({
  type: SHOW_HIDDEN_FILES,
  payload: value,
});
