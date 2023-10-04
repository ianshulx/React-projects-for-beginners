import React from 'react';

let Progress = React.createClass({
    render() {
        return (
        	<p>
	            已播放：{this.props.progress}s
        	</p>
        );
    }
});

export default Progress;
