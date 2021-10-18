import {createStore, combineReducers} from 'redux';
import {themeReducer} from './themeReducer';
import {hiddenReducer} from './themeReducer';

const reducers = combineReducers({
  theme: themeReducer,
  hidden: hiddenReducer,
});

export const store = createStore(reducers);
