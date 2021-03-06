import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Tasks } from '../api/tasks.js';
//task component

export default class Task extends Component {
	
    toggleChecked()
    {
        //set checked property to the opposite of current value
       Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }
    
    deleteThisTask() {
       Meteor.call('tasks.remove', this.props.task._id);
    }
    
    togglePrivate() {
        Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
    }
    
    render() {
        //gives task different class names when they are checked off
        const taskClassName = classnames({
            checked: this.props.task.checked,
            private: this.props.task.private,
        });
        
		return (
            <li className={taskClassName}>
			<button className = "delete" onClick={this.deleteThisTask.bind(this)}>&times;
            </button>
                
        <input
                type="checkbox"
                readOnly
                checked={this.props.task.checked}
                onClick={this.toggleChecked.bind(this)}
            />
                
                {this.props.showPrivateButton ? (
                <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>{this.props.task.private ? 'Private' : 'Public'}
                    </button>
                ) : ''}
                
                <span className="text"><strong>{this.props.task.username}</strong>: {this.props.task.text}
                </span>
            </li>
		);
	}
    
}

Task.propTypes = {
	task: PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired,
};



