const rootReducer = (state = [], action) => {
	// console.log(action);
	// console.log(state);
	if (action.type === 'GET_FILMS') {
		return { films: action.payload };
	}
	if (action.type === 'DELETE_USER') {
		// let newUsers = state.users.filter(user => {
		// 	return user.id !== action.id
		// });
		// localStorage.setItem('users', JSON.stringify(newUsers));

		// return {
		// 	users: newUsers
		// }
	};
	if (action.type === 'ADD_USER') {
		// let newUsers = state.users ? [...state.users, action.user] : [action.user];
		// localStorage.setItem('users', JSON.stringify(newUsers));
		// // console.log(localStorage.getItem('users'));

		// return {
		// 	users: newUsers
		// }
	};
	return state;
}

export default rootReducer