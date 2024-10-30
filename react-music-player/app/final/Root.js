import React, { render } from 'react';
import { Router, IndexRoute, Link, Route, browserHistory, hashHistory} from 'react-router';
import { MUSIC_LIST } from './config/config';
import { randomRange } from './utils/util';
let PubSub = require('pubsub-js');

import PlayerPage from './page/player';
import listPage from './page/list';
import Logo from './components/logo'


let App = React.createClass({
	componentDidMount() {
		$("#player").jPlayer({
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});

		this.playMusic(this.state.musicList[0]);
		
		$("#player").bind($.jPlayer.event.ended, (e) => {
			this.playWhenEnd();
		});
		PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
			this.playMusic(item);
		});
		PubSub.subscribe('DEL_MUSIC', (msg, item) => {
			this.setState({
				musicList: this.state.musicList.filter((music) => {
					return music !== item;
				})
			});
		});
		PubSub.subscribe('PLAY_NEXT', () => {
			this.playNext();
		});
		PubSub.subscribe('PLAY_PREV', () => {
			this.playNext('prev');
		});
		let repeatList = [
			'cycle',
			'once',
			'random'
		];
		PubSub.subscribe('CHANAGE_REPEAT', () => {
			let index = repeatList.indexOf(this.state.repeatType);
			index = (index + 1) % repeatList.length;
			this.setState({
				repeatType: repeatList[index]
			});
		});
	},
	componentWillUnmount() {
		PubSub.unsubscribe('PLAY_MUSIC');
		PubSub.unsubscribe('DEL_MUSIC');
		PubSub.unsubscribe('CHANAGE_REPEAT');
		PubSub.unsubscribe('PLAY_NEXT');
		PubSub.unsubscribe('PLAY_PREV');
	},
	getInitialState() {
		return {
			musicList: MUSIC_LIST,
			currentMusitItem: {},
			repeatType: 'cycle'
		}
	},
	playWhenEnd() {
		if (this.state.repeatType === 'random') {
			let index = this.findMusicIndex(this.state.currentMusitItem);
			let randomIndex = randomRange(0, this.state.musicList.length - 1);
			while(randomIndex === index) {
				randomIndex = randomRange(0, this.state.musicList.length - 1);
			}
			this.playMusic(this.state.musicList[randomIndex]);
		} else if (this.state.repeatType === 'once') {
			this.playMusic(this.state.currentMusitItem);
		} else {
			this.playNext();
		}
	},
	playNext(type = 'next') {
		let index = this.findMusicIndex(this.state.currentMusitItem);
		if (type === 'next') {		
			index = (index + 1) % this.state.musicList.length;
		} else {
			index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
		}
		let musicItem = this.state.musicList[index];
		this.setState({
			currentMusitItem: musicItem
		});
		this.playMusic(musicItem);
	},
	findMusicIndex(music) {
		let index = this.state.musicList.indexOf(music);
		return Math.max(0, index);
	},
	playMusic(item) {
		$("#player").jPlayer("setMedia", {
			mp3: item.file
		}).jPlayer('play');
		this.setState({
			currentMusitItem: item
		});
	},
    render() {
        return (
            <div className="container">
            	<Logo></Logo>
            	{React.cloneElement(this.props.children, this.state)}
            </div>
        );
    }
});

let Root = React.createClass({
	render() {
	    return (
		    <Router history={hashHistory}>
		        <Route path="/" component={App}>
		            <IndexRoute component={PlayerPage}/>
		            <Route path="/list" component={listPage} />
		        </Route>
		    </Router>
		);
	}
});

export default Root;
