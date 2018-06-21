import { ROOM_MSGS } from "../constants/constants";
import { Map } from "immutable";

export default function(state = { selectedRoom: null, roomMessages: null, err: null }, action){
	console.log("From reducer", action);
	switch (action.type){
		case ROOM_MSGS:
		{
			let newState = Map(state).set("selectedRoom", action.payload.selectedRoom).set("roomMessages", action.payload.roomMessages).set("err", action.payload.err).toJS();
			return newState;
		}
	}
	return state;
}