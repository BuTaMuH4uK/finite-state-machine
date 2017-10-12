class FSM {

	constructor(config) {
		this.initial = config.initial;
		this.states = config.states;
		this.activeState = config.initial;
		this.stack = ['normal'];
		this.history = 0;
	}

	getState() {
		return this.activeState;
	}

	changeState(state) {
		if(state in this.states) {
			this.activeState = state;
			this.stack.length = this.history + 1;
			this.stack.push(this.activeState);
			this.history++;
			return;
		}
		throw new Error;
	}

	trigger(event) {
		if(event in this.states[this.activeState].transitions) {
			this.activeState = this.states[this.activeState].transitions[event];
			this.stack.length = this.history + 1;
			this.stack.push(this.activeState);
			this.history++;
			return;
		}
		throw new Error;
	}

	reset() {
		this.activeState = this.initial;
		this.stack.length = this.history + 1;
		this.stack.push(this.activeState);
		this.history++;
	}

     getStates(event) {
     	if(arguments.length == 0) {
     		var states = [];
     		for(var i in this.states) {
     			states.push(i); 
     		}
     		return states;
     	}
     	var states = [];
     	for(var i in this.states) {
     		for(var j in this.states[i].transitions) {
     			if(j == event) {
     				states.push(i);
     			}
     		}
     	}
     	return states;
     }

     undo() {
     	if(this.history == 0) {
     		return false;
     	}
     	this.activeState = this.stack[--this.history];
     	return true;
     }

     redo() {
     	if(this.history == this.stack.length - 1) {
     		return false;
     	}
     	this.activeState = this.stack[++this.history];
     	if(this.history == 0) {
     		return false;
     	}
     	return true;
     }

     clearHistory() {
     	this.history = 0;
     	this.stack.length = 1;
     }
 }

 module.exports = FSM;
