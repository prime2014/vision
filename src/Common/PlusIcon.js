import React, { Component } from 'react';

class PlusIcon extends Component {
    render() {
        return (
            <div onClick={this.props.todo} className="add-icon">
                <span><i className="fa fa-plus" aria-hidden="true"></i></span>
            </div>
        );
    }
}

export default PlusIcon;
