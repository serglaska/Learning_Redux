import React from "react";
import ReactDOM from "react-dom";
// ///////////////////////////////////////////////////////////////////
function App() {
	function updateState(state, action) {
		if (action.type === "increment")
			return { count: state.count + action.amount };
		else if (action.type === "decrement")
			return { count: state.count - action.amount };
		return state;
	}

	class Store {
		constructor(updateState, state) {
			this._updateState = updateState;
			this._state = state;
			this._callbacks = [];
		}

		get state() {
			return this._state;
		}
		update(action) {
			this._state = this._updateState(this._state, action);
			this._callbacks.forEach(callback => callback());
		}

		subscribe(callback) {
			this._callbacks.push(callback);
			return () =>
				(this._callbacks = this._callbacks.filter(cb => cb !== callback));
		}
	}

	const inState = { count: 0 };
	const store = new Store(updateState, inState);
	const incrementAction = { type: "increment", amount: 3 };
	const decrementAction = { type: "decrement", amount: 1 };

	const unsubscribe = store.subscribe(() =>
		console.log("Changed state 1", store.state)
	);

	store.subscribe(() => console.log("Changed state 2", store.state));

	store.update(incrementAction);
	unsubscribe();
	store.update(decrementAction);
	store.update({});

	return (
		<div className="App">
			<h1>Learning Redux </h1>
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
