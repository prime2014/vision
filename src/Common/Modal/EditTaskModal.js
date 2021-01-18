import React, { Component } from 'react';
import { Modal } from "react-bootstrap";
import { tasksAPI } from "../../Api/tasks/tasks.service";
import { Avatar } from "@material-ui/core";





class EditTaskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pk: "",
            action: "",
            title: "",
            due_date: "",
            description: "",
            assigned: []
        }
    }

    componentDidMount() {

        let that = this;
        tasksAPI.getSelectedTask(that.props.pk).then(resp => {
            console.log(resp.assigned)
            that.setState({
                pk: resp.pk,
                action: resp.action,
                title: resp.title,
                due_date: resp.due_date,
                description: resp.description,
                assigned: [...resp.assigned]
            });
        })


    }

    handleClose = event => {
        this.props.closeModal(event)
    }
    render() {

        let members = this.props.members.map(member => {
            if (this.state.assigned.includes(member.user.url)) {
                return (
                    <span className="member py-1 px-1">
                        <Avatar className="avatar" sizes="small" src={member.image} variant="circular">
                            {member.user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <span className="member_name">{member.user.username}</span>
                        <span className="check_icon"><i className="fa fa-check-circle text-success" aria-hidden="true"></i> </span>
                    </span>
                )
            } else {
                return (
                    <span className="member py-1 px-1">
                        <Avatar className="avatar" sizes="small" src={member.image} variant="circular">
                            {member.user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <span className="member_name">{member.user.username}</span>
                    </span>
                )
            }
        })
        return (
            <Modal size="lg" show={this.props.open}>
                <Modal.Header closeButton onClick={this.handleClose}>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-8 first_col">
                            <form>
                                <div className="py-2">
                                    <h5>{this.state.title}</h5>
                                </div>
                                <div className="py-2">
                                    <p className="due_date"><span className="text-info"><i className="fa fa-calendar" aria-hidden="true"></i></span> {this.state.due_date}</p>
                                </div>
                                <div className="py-2">
                                    {this.state.description ? <p>{this.state.description}</p> : <p>No description available</p>}
                                </div>
                                <div className="py-2">
                                    <button className="btn btn-sm btn-success btn-edit"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4 sidebar_edit px-2 text-center">
                            <div className="top_side_bar">
                                <h6>Assign</h6>
                                <div className="member_images">
                                    {members}
                                </div>
                            </div>
                            <div className="px-2 mt-3">
                                <h6>Watch</h6>
                                <div className="member_images">
                                    {members}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default EditTaskModal;