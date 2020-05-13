import {combineReducers} from 'redux';
import auth from '../home/reducer';
import evidences from '../survey/reducer';

const rootReducer = combineReducers({
  auth: auth,
  evidences: evidences,
});

export default rootReducer;
