import React from "react";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { no_msgs_msg, choose_room_msg } from "./constants/constants";

const messagesContainer = {
	padding: 10
};

class Messages extends React.Component {
	constructor(props){
		super(props);

		this.state = {
		}
	}

	componentDidUpdate(){
		// console.log("From DID UPDATE", this.props.roomMessages);
	}

	render() {

		let err = this.props.msgs.err;
		let roomName = this.props.msgs.selectedRoom && this.props.msgs.selectedRoom.name || choose_room_msg;
		let roomMessages = this.props.msgs.roomMessages || [];

		if(err) {
			return (<Paper elevation={4} style={messagesContainer}>
						<Typography variant="headline" component="h3" color="error">{err}</Typography>
					</Paper>
			)
		}
		
		if(roomMessages.length > 0) {
			return (
				<Paper elevation={4} style={messagesContainer}>
				<Typography variant="headline" component="h3">{roomName}</Typography>
				<List component="nav">
					{roomMessages.map((item, index) => {
						return <ListItem
									divider
									key={index}
									>
									<ListItemText primary={item.text}/>
						</ListItem>
					})}
				</List>
				</Paper>)
		} else {
			return (
				(<Paper elevation={4} style={messagesContainer}>
					<Typography variant="headline" component="h3">{no_msgs_msg}</Typography>
				</Paper>
				)
			)
		}
	}
}

function mapStateToProps(state){
	return {msgs: state.msgs}
}

export default connect(mapStateToProps)(Messages);

		