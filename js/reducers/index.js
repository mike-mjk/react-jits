import { combineReducers } from 'redux';
import VideoReducer from './reducer_videos';
import SearchReducer from './reducer_search';

const rootReducer = combineReducers({
	videos: VideoReducer,
	search_results: SearchReducer
});

export default rootReducer;