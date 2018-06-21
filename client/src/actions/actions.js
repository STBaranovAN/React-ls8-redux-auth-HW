import axios from "axios";
import uuid from "uuid";
import { Map } from "immutable";
import { ALL_ROOMS, ROOM_MSGS, POST_MSG, API_URL, API_URL_POST, USER_ID, server_error_msg, emty_text_error_msg } from "../constants/constants";

export function getRooms(){

	return function(dispatch){
		let rooms = [];

		const action = Map({type: ALL_ROOMS, payload: Map({allRooms: null, err: null})});

			axios.get(API_URL).then( 
				
				responseObj => {
					if(responseObj.hasOwnProperty("data"))
					{
						rooms = responseObj.data.chats;
						if(rooms.length >= 0)
						{
							let obj = action.setIn(["payload", "allRooms"], rooms).toJS();
							dispatch(action.setIn(["payload", "allRooms"], rooms).toJS());
						}
					}
			}, err => {
				console.log(`An error occured: ${err}`);
				dispatch(action.set(["payload", "err"], err).toJS());
			});
		}
};

export function selectRoom(currentRoom){

	const
		postAction = Map({type: POST_MSG, payload: null}),
		roomsAction = Map({type: ROOM_MSGS, payload: Map({ selectedRoom: currentRoom, roomMessages: null, err: null })});

	return function(dispatch){

		dispatch(postAction.toJS());

		let messages = [];
			axios.get(`http://localhost:6060/api/${currentRoom.id}/messages`).then( responseObj => {

				messages = responseObj.data;
				dispatch(roomsAction.setIn(["payload", "roomMessages"], messages).toJS());

			}, err => {
				console.log(`An error occured: ${err}`);
				dispatch(roomsAction.setIn(["payload", "err"], server_error_msg).toJS());
			});
	}
};

export function addMessage(currentRoom, msgText){

	const action = Map({ type: POST_MSG, payload: null });

	return function(dispatch){

		if(!msgText)
		{
			dispatch(action.set("payload", emty_text_error_msg).toJS());
			return;
		} else {
			dispatch(action.toJS());
		}

		axios.post(API_URL_POST, {
			text: msgText,
			userId: USER_ID,
			messageId: uuid.v4(),
			roomId: currentRoom.id 
			}).then( responseObj => {
				dispatch(selectRoom(currentRoom));
			}, err => {
				console.log(`An error occured: ${err}`);
				dispatch(action.set("payload", server_error_msg).toJS());
			});
	}
};

