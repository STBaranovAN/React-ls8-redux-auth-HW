import { POST_MSG } from "../constants/constants";
import { Map } from "immutable";

export default function(state = { err: null }, action){
	console.log("From reducer", action);
	switch (action.type){
		case POST_MSG:
		{
			let newState = Map(state).set("err", action.payload).toJS();
			return newState;
		}
	}
	return state;
}