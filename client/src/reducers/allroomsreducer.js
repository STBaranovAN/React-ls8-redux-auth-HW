import { ALL_ROOMS } from "../constants/constants";
import { Map } from "immutable";

export default function(state = { allRooms: null, err: null }, action){
	console.log("From reducer", action);
	switch (action.type){
		case ALL_ROOMS:
		{
			let newState = Map(state).set("allRooms", action.payload.allRooms).set("err", action.payload.err).toJS();
			return newState;
		}
	}
	return state;
}