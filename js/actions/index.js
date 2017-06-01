import axios from 'axios';

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

export function searchYoutube(term) {
	console.log('term');
	const request = getSearchResults(term)
	console.log('request', request);
	return {
		type: SEARCH_YOUTUBE,
		payload: request
	}
}