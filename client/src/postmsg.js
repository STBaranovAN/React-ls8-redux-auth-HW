import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addMessage } from "./actions/actions";
import { btn_new_msg, tf_new_msg } from "./constants/constants";
//import {Component} from "react";

const postMsgContainer = {
	padding: 10
};

class PostMsg extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			text: ""
		}

		this.getText = this.getText.bind(this);
	}

	getText(e){
		this.setState({text: e.target.value});
	}

	render() {

		let err = this.props.err;

		return (
			<Paper elevation={4} style={postMsgContainer}>
				<Grid container spacing={16}>
					<Grid item xs={12}>
						<Typography variant="headline" color="error" component="p" display={ err ? "block" : "none" }>
							{err}
        				</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							multiline
							value={this.state.text || ''}
							onChange={this.getText}
							label={tf_new_msg}
						>
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<Button variant="outlined" onClick={ () => { this.props.addMessage(this.props.currentRoom, this.state.text) } }>
							{btn_new_msg}
      					</Button>
					</Grid>
				</Grid>
			</Paper>
		)
	}
}

function mapStateToProps(state){
	return {currentRoom: state.msgs.selectedRoom || null, err: state.postmsg.err}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addMessage: addMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostMsg);