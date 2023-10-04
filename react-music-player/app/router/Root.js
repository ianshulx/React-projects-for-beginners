import React, { render } from 'react';
import { Router, IndexRoute, Link, Route, browserHistory, hashHistory} from 'react-router';
import { MUSIC_LIST } from './config/config';
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
		this.playMusic(MUSIC_LIST[0]);
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
	},
	componentWillUnmount() {
		PubSub.unsubscribe('PLAY_MUSIC');
		PubSub.unsubscribe('DEL_MUSIC');
	},
	getInitialState() {
		return {
			musicList: MUSIC_LIST,
			currentMusitItem: {}
		}
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
            	{React.cloneElement(this.props.children, {musicList: this.state.musicList, currentMusitItem: this.state.currentMusitItem})}
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
