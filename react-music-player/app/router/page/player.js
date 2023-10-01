import React from 'react';
import Progress from '../components/progress';
import { Link } from 'react-router';

let Player = React.createClass({
	componentDidMount() {
		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
			this.setState({
				progress: Math.round(e.jPlayer.status.currentTime)
			});
		});
	},
	componentWillUnmount() {
		$("#player").unbind($.jPlayer.event.timeupdate);
	},
	getInitialState() {
		return {
			progress: 0
		}
	},	
    render() {
        return (
            <div>
                <h1 className="mt20">Welcome to the React lesson~</h1>
                <div className="mt20" style={{color: '#3aadff'}}><Link to="/list">See my music list</Link></div>
                <h3 className="mt20"><span className="bold">{this.props.currentMusitItem.title}</span> 播放中...</h3>
                <div className="mt20">
	                <Progress
						progress={this.state.progress}
	                >
	                </Progress>
                </div>
            </div>
        );
    }
});

export default Player;
