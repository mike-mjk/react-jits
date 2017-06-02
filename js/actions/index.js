import axios from 'axios';
import _ from 'lodash';
//attempting to navigate to /search 
import { browserHistory } from 'react-router';

import { getSearchResults } from '../app.js';

export const FETCH_VIDEOS = 'fetch_videos';
export const FETCH_VIDEO = 'fetch_video'
export const SEARCH_YOUTUBE = 'search_youtube'



export function fetchVideos() {
	const request = axios.get('/videos');

	return {
		type: FETCH_VIDEOS,
		payload: request
	};
}

export function fetchVideo(id) {
	const request = axios.get(`/videos/${id}`);
	return {
		type: FETCH_VIDEO,
		payload: request
	}
}

// export function searchYoutube(term) {
// 	console.log('term', term);
// 	const request = getSearchResults(term)
// 	console.log('request', request);
// 	return {
// 		type: SEARCH_YOUTUBE,
// 		payload: request
// 	}
// }

export function searchYoutube(term, history) {
	console.log('The action searchYoutube is called');
	return function(dispatch) {
		//Define arguments for GET request
		const baseURL = 'https://www.googleapis.com/youtube/v3/search';
		const query = {params: {
	    q: term,
	    part: 'snippet',
	    type: 'video',
	    maxResults: 15,
	    key: 'AIzaSyCIdQfwZ7qDSA1BhnfzEBa-6AB8ma8YY9k'
	  }}

	  axios.get(baseURL, query)
	  	.then(response => {
	  		//Extract needed data from API response
	  		var videos = response.data.items.map(result => {
					return ({
						title: result.snippet.title,
			      channelTitle: result.snippet.channelTitle,
			      id: result.id.videoId,
			      thumbnail: result.snippet.thumbnails.medium.url
					})
				})
				//Transform array of videos into object
	  		videos = _.mapKeys(videos, 'id');

	  		dispatch(
	  			{ type: SEARCH_YOUTUBE,
	  				payload: videos
	  			})
	  		//logs to try to figure out what's going on
	  		// console.log('videos', videos);
	  		console.log('history.push is next line');	
	  		history.push('/search');
	  	})
	}
}