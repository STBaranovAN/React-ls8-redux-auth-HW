import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Rooms from "./rooms";
import Messages from "./messages";
import PostMsg from "./postmsg";
import { login, tokenCheck, logout } from "./actions/actions";
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";

const mainContainer = {
	width: "50%",
	height: "90%",
	margin: 10
};

  class Main extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			view: false,
			name: "",
			password: "",
			tabValue: 0,
			logged: false 
		}

		this.handleLogin = this.handleLogin.bind(this);
		this.loginLogout = this.loginLogout.bind(this);
	}

	componentDidMount(){
		this.props.tokenCheck();
	}

	componentWillReceiveProps(nextProps){ // Will be deprecated from react v17
		console.log("NextProps", nextProps);
		if(nextProps.userData.logged){
			this.setState({view: false, tabValue: 0, logged: true});
		}
	}

	loginLogout(){
		if(this.props.userData.logged){
			this.props.logout();
		}
	}

	getText(field, e){
		let stateValue = {[field]: e.target.value};
		//stateValue[field] = e.target.value;
		this.setState(stateValue, () => {
			console.log("State from getText", this.state)
		});
	}

	handleLogin(e){
		e.preventDefault();
		let userData = {
			name: this.state.name,
			password: this.state.password
		}
		this.props.userLogin(userData); /// Redux Action Creator
	}
	
	render() {

		if(this.state.logged)
		{
			// this.context.router.history.push('/about');
			console.log("!!!");
		}

		return (
			<Router>
				<div style={ mainContainer }>
					<Switch>
						<Route exact path="/(|login)/" render = { () => {
							return (
								<Grid style={{paddingTop: 15}} item xs={12} sm={4}>
								<TextField onChange={this.getText.bind(this, "name")} value={this.state.name} fullWidth label="User Name" />
								<TextField 
									onChange={this.getText.bind(this, "password")} 
									type="password" 
									value={this.state.password} 
									fullWidth 
									label="User Password"
									style={{backgroundColor: this.props.userData.err ? "red" : "transparent"}}
								/>
								<Button style={{margin: "15px 0"}} color="primary" variant="raised" onClick={this.handleLogin}>Login</Button>
							</Grid>
							)}}
						>
						</Route>
						<Route exact path="/cabinet" render = { () => {
							return (
								<Grid container spacing={24}>
									<Grid item xs={12} sm={6}>
										<Rooms/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Messages/>
										<br/>
										<PostMsg/>
									</Grid>
								</Grid>
							)}}
						>
						</Route>
					</Switch>
				</div>
			</Router>
		)
	}
}

function mapStateToProps(state){
	return {userData: state.auth}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		userLogin: login, 
		tokenCheck: tokenCheck,
		logout: logout,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);



		