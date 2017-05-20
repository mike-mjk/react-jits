import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchVideos } from '../actions';
import { Link } from 'react-router-dom';

class Video extends React.Component {
	componentDidMount() {
		this.props.fetchVideos();
	}

	renderVideos() {
		if(!this.props.videos) {
			return <div>Loading</div>
		}

		return (
			_.map(this.props.videos, (video) => {
				var videoUrl = `/watch/${video.id}`;
				var thumbUrl = `${video.thumbnail}`;
				return (
	        <div className="col-xs-12 col-md-6" key={video.id}>
	          <div className="thumbnail">
	            <div className="row">
	              <div className="col-xs-5 col-md-12">
	                <Link to={videoUrl}><img className="width-100" src={thumbUrl} /></Link>
	              </div>
	              <div className="col-xs-7 col-md-12">
	                <div className="caption">
	                  <h3 className="oneline"><a href="/watch/{video.id}">{video.title}</a></h3>
	                  <p>{video.channelTitle}</p>
	                  <p><button data-id={video.id} className="delete btn btn-danger btn-xs" role="button"><i className="fa fa-times"></i> Delete Video</button></p>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
				);
			})
		);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					{this.renderVideos()}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return { videos: state.videos };
}

export default connect(mapStateToProps, { fetchVideos })(Video);