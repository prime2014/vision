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
            assigned: [],
            watch: [],
            select: ""
        }
    }

    componentDidMount() {
        console.log(this.props.members);
        let that = this;
        tasksAPI.getSelectedTask(that.props.pk).then(resp => {
            console.log(resp)
            that.setState({
                pk: resp.pk,
                action: resp.action,
                title: resp.title,
                due_date: resp.due_date,
                description: resp.description,
                assigned: [...resp.assigned],
                watch: [...resp.watch]
            });
        })
    }

    handleAssignUser = pk => {
        tasksAPI.assignUserToTask(this.state.pk, { 'assigned': pk })
            .then(resp => {
                this.setState({
                    assigned: [...resp.assigned]
                })
            }).catch(err => {
                throw err;
            })
    }

    handleUserWatch = pk => {
        tasksAPI.assignUserWatch(this.state.pk, { 'watch': pk })
            .then(resp => {
                this.setState({
                    watch: [...resp.watch]
                })
            }).catch(err => {
                throw err;
            })
    }

    handleRemoveAssigned = pk => {
        tasksAPI.removeAssignedUser(this.state.pk, { 'assigned': pk })
            .then(resp => {
                this.setState({
                    assigned: [...resp.assigned]
                })
            }).catch(err => {
                throw err;
            })
    }

    handleTitleInput = event => {
        console.log(event.target.innerText)
        // this.setState({
        //     select: event.target.innerText
        // }, () => {
        //     event.target.innerHTML = `<input type="text" name="in" value=${this.state.select} />`
        // })
    }

    handleClose = event => {
        let { pk, action, assigned } = this.state;
        this.props.closeModal({ pk, action, assigned })
    }

    render() {
        let members = this.props.members.map(member => {
            if (this.state.assigned.includes(member.user.url)) {
                return (
                    <span onClick={() => this.handleRemoveAssigned(member.user.pk)} className="member py-1 px-1">
                        <Avatar className="avatar" sizes="small" src={member.image} variant="circular">
                            {member.user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <span className="member_name">{member.user.username}</span>
                        <span className="check_icon"><i className="fa fa-check-circle text-success" aria-hidden="true"></i> </span>
                    </span>
                )
            } else {
                return (
                    <span onClick={() => this.handleAssignUser(member.user.pk)} className="member py-1 px-1">
                        <Avatar className="avatar" sizes="small" src={member.image} variant="circular">
                            {member.user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <span className="member_name">{member.user.username}</span>
                    </span>
                )
            }
        })

        let watch = this.props.members.map(member => {
            if (this.state.watch.includes(member.user.url)) {
                return (
                    <span className="member py-1 px-1">
                        <Avatar className="avatar" sizes="small" src={member.image} variant="circular">
                            {member.user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <span className="member_name">{member.user.username}</span>
                        <span className="check_icon"><i className="fa fa-check-circle text-danger" aria-hidden="true"></i> </span>
                    </span>
                )
            } else {
                return (
                    <span onClick={() => this.handleUserWatch(member.user.pk)} className="member py-1 px-1">
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
                                    <h6>Title</h6>
                                    <h5 onClick={this.handleTitleInput}>{this.state.title}</h5>
                                </div>
                                <div className="py-2">
                                    <h6>Due Date</h6>
                                    <p className="due_date"><span className="text-info"><i className="fa fa-calendar" aria-hidden="true"></i></span> {this.state.due_date}</p>
                                </div>
                                <div className="py-2">
                                    <h6>Description</h6>
                                    {this.state.description ? <p>{this.state.description}</p> : <p>No description available</p>}
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
                                    {watch}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="py-2 col-md-12">
                            <button className="btn btn-sm btn-success btn-edit"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default EditTaskModal;