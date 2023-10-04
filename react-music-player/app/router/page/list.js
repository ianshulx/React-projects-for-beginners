import React from 'react';
import { MUSIC_LIST } from '../config/config';
import ListItem from '../components/listitem';

let List = React.createClass({
    render() {
    	let Items = this.props.musicList.map((item) => {
    		return (
    			<ListItem
    				key={item.id}
    				data={item}
    			></ListItem>
    		);
    	});
        return (
            <ul className="mt20">
                { Items }
            </ul>
        );
    }
});

export default List;
