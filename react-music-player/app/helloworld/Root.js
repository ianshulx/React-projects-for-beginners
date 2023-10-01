import React from 'react';
import Button from './components/button';

let Root = React.createClass({
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
                <p>hello world，welcome to the React lesson~</p>
                <Button></Button>
            </div>
        );
    }
});

export default Root;
