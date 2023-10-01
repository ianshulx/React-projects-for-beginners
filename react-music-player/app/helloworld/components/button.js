import React from 'react';

let Button = React.createClass({
	getInitialState() {
		return {		
			count: 0
		}
	},
	counterHandler() {
		this.setState({
			count: this.state.count + 1
		});
	},
    render() {
        return (
        	<div>
	            <button onClick={this.counterHandler}>Count {this.state.count}</button>
        	</div>
        );
    }
});

export default Button;
