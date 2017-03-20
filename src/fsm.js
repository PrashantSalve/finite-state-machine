var student = function(state){
	this.state = 'normal';
}
class FSM {
	//var currentState = 'normal';
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		if(config === undefined){
			throw new Error('Error');
		}
		this.currentState = config.initial;
		this.previousState = config.initial;
		this.nextState = config.initial;
		this.config = config;
	}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
		return this.currentState;
	}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
		if(state !== 'normal' && state !== 'busy' && state !== 'hungry' && state !== 'sleeping'){
			throw new Error('Error');
		}
		else{
			this.currentState = state;
			this.nextState = state;
		}
	}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
		this.stateFound = false;
		var cstate = this.config.states[this.currentState].transitions[event];
		if(cstate !== undefined){
			this.stateFound = true;
			this.previousState = this.currentState;
			this.changeState(cstate);
		}
		
		if(this.stateFound === false){
			throw new Error('Error');
		}
	}

    /**
     * Resets FSM state to initial.
     */
    reset() {
		this.currentState = this.config.initial;
	}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
		var statesArray = [];
		if(event === undefined){
			for(var state in this.config.states){
				statesArray.push(state);
			}
		}
		else{
			for(var state in this.config.states){
				var cstate = this.config.states[state].transitions[event];
				if(cstate !== undefined){
					statesArray.push(state);
				}
			}
		}
		return statesArray;
	}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
		var status = false;
		if(this.currentState === this.config.initial && this.previousState == this.currentState){
			status = false;
		}
		else if(this.previousState == null){
			status = false;
		}
		else{
			this.currentState = this.previousState;
			status = true;
		}
		return status;
	}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		var status = false;
		if(this.currentState === this.config.initial && this.nextState == this.currentState){
			status = false;
		}		
		if(this.nextState == this.currentState){
			return false;
		}
		else if(this.nextState == null){
			status = false;
		}
		else{
			this.currentState = this.nextState;
			status = true;
		}
		return status;
	}

    /**
     * Clears transition history
     */
    clearHistory() {
		this.previousState = null;
		this.nextState = null;
	}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
