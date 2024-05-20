import { combineReducers } from "redux";
import userSlice from './userSlice.jsx';

const rootReducer = combineReducers({
userSlice: userSlice.reducer
});

export default rootReducer;