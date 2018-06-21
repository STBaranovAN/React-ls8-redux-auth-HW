import React from "react";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { bindActionCreators } from "redux";
import { getRooms, selectRoom } from "./actions/actions";
import { no_room_msg, rooms_title } from "./constants/constants";

const roomsContainer = {
	padding: 10
};

class Rooms extends React.Component {
	constructor(props){
		super(props);

		this.state = {
		}
	}

	componentDidMount() {
		this.props.getRooms();
	}
	
	render() {
		let err = this.props.chatRooms.err;
		let allRooms = this.props.chatRooms.allRooms || [];

		if(err)		
		{
			return (
				<Paper elevation={4} style={roomsContainer}>
					<Typography variant="headline" component="h3" color="error">
						{err}
        			</Typography>
				</Paper>	
			)
		}
		
		if(allRooms.length > 0) {
			return (
				<Paper elevation={4} style={roomsContainer}>
					<Typography variant="headline" component="h3">
						{rooms_title}
					</Typography>
					<List component="nav">
						{allRooms.map((item, index) => {
							return <ListItem
										button
										divider
										key={index} 
										onClick={() => { 
										this.props.selectRoom(item);
										}}>
											<ListItemText primary={item.name}/>
									</ListItem>
								})
							}
					</List>
				</Paper>
			)
		} else {
			return (
				<Paper elevation={4} style={roomsContainer}>
					<Typography variant="headline" component="h3">
						{no_room_msg}
					</Typography>
				</Paper>)
		}
	}
}

function mapStateToProps(state){
	return {chatRooms: state.rooms}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getRooms: getRooms, selectRoom: selectRoom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);

		