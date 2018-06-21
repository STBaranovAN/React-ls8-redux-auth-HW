import { combineReducers } from "redux";
import allRoomsReducer from "./reducers/allroomsreducer";
import msgReducer from "./reducers/msgreducer";
import postMsgReducer from "./reducers/postmsgreducer";

let rootReducer = combineReducers({
	rooms: allRoomsReducer,
	msgs: msgReducer,
	postmsg: postMsgReducer

	// rooms: {
	// 	allRooms: [],
	// 	selectedRoom: {},
	// 	roomMessages: []
	// }

	// Object.assign(rooms, {roomMessages: [1,3,4]})
	// {...rooms, {roomMessages: []}}

	// auth: {
	// 	logged: true,
	// 	err: null
	// }
});

export default rootReducer;