import React, { Component } from 'react';
import { projectApi } from '../../Api/project/projects.service';
import TasksModal from '../../Common/Modal/TasksModal';
import Navbar2 from '../../Common/Navigation/Navbar2';
import { AlertTitle, Alert } from "@material-ui/lab";
import CheckCircle from "@material-ui/icons/CheckCircle";
import SnackBar from "@material-ui/core/Snackbar";
import ErrorIcon from "@material-ui/icons/ErrorOutlineRounded";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditTaskModal from "../../Common/Modal/EditTaskModal";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import { tasksAPI } from "../../Api/tasks/tasks.service";



class ProjectBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            selected_pk: 0,
            project_data: {},
            tasks: [],
            action: 0,
            title: "",
            description: "",
            due_date: "",
            open: false,
            selected: "",
            successMessage: false,
            errorMessage: false,
            position: {
                vertical: 'top',
                horizontal: 'right'
            },
            loading: false,
            open_detail: false,
        }
        this.inputRef = React.createRef()
    }




    componentDidMount() {
        let that = this
        projectApi.fetchProjectData(this.props.match.params.id).then(response => {
            let data = response[1].map(item => {
                return { url: item.url, pk: item.pk, title: item.title, action_card: item.action_card.reverse() }
            })

            that.setState({
                project_data: { ...response[0] },
                tasks: [...data],

            }, () => {
                console.log(this.state.project_data);
                let user = this.state.project_data.members.find(item => {
                    return item.user.username === localStorage.getItem('user');
                })
                console.log(this.state.project_data)
                this.setState({
                    user
                })
            })
        });
    }

    handleTask = event => {
        this.setState({
            title: event.target.value
        }, () => {
            console.log(this.state.title);
        })
    }

    handleCloseSuccessAlert = (event) => {
        this.setState({
            successMessage: false
        })
    }
    handleCloseErrorAlert = (event) => {
        this.setState({
            errorMessage: false
        })
    }
    handleOpen = (title, id) => {
        this.setState({
            open: true,
            selected: title,
            action: id
        }, () => {
            console.log(this.state.action);
        });
    }

    handleClose = event => {
        this.setState({
            open: false
        })
    }

    handleShowDetail = (pk) => {
        this.setState({
            open_detail: true,
            selected_pk: pk
        })
    }

    closeDetailModal = event => {
        this.setState({
            open_detail: false,
            selected_pk: 0
        })
    }

    submitTask = (task, note, date) => {
        this.setState({
            title: task,
            description: note,
            due_date: date,
            open: false,
            loading: true
        }, () => {
            let { action, title, description, due_date } = this.state;
            if (title && due_date) {
                projectApi.postTask({ action, title, description, due_date }).then(resp => {
                    let index = this.state.tasks.findIndex(item => {
                        return item.pk === this.state.action
                    })
                    let new_tasks = this.state.tasks;
                    new_tasks[index].action_card.unshift(resp)
                    this.setState({
                        tasks: [...new_tasks],
                        successMessage: true,
                        loading: false
                    })

                })
            } else {
                this.setState({
                    errorMessage: true,
                    open: false,
                    loading: false
                })
            }
        })
    }

    handleShiftNext = (pk, task_pk) => {
        tasksAPI.shiftTaskCardNext(pk, task_pk);
    }

    handleShiftPrevious = (pk, task_pk) => {
        tasksAPI.shiftTaskCardPrevious(pk, task_pk);
    }


    render() {

        let task = this.state.tasks.map(element => {
            return (

                <div className="col-md-3" key={element.pk}>
                    <div className="card task-card px-2">
                        <h6 className="title_banner pt-1">{element.title}</h6>
                        <ul className="tasks-list px-2 py-1">
                            {element.action_card.map((item, index) => {
                                return (
                                    <li className="card_list" key={index}>
                                        <p onClick={() => this.handleShowDetail(item.pk)} className="text-info task_text">{item.title.length <= item.title.substring(0, 40).length ? item.title : item.title.substring(0, 35) + "..."}</p>
                                        <div className="event_icons px-1">
                                            <span className="clock"><i className="fa fa-clock-o" aria-hidden="true"></i> Due Date</span>
                                            <span className="text-success"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</span>
                                            <span className="text-danger"><i className="fa fa-trash" aria-hidden="true"></i> Delete</span>
                                        </div>
                                        <div className="arrows px-2">
                                            <span className="arr" onClick={() => this.handleShiftPrevious(element.pk, item.pk)}><ArrowBack color="primary" fontSize="small" /></span>
                                            <span className="arr" onClick={() => this.handleShiftNext(element.pk, item.pk)}><ArrowForward color="primary" fontSize="small" /></span>
                                        </div>
                                    </li>
                                )
                            }, element)}

                        </ul>
                        <div className="btn-input py-1">
                            <button onClick={() => this.handleOpen(element.title, element.pk)} className="btn btn-info btn-sm">Add Task</button>
                        </div>
                    </div>
                </div>
            )
        })
        const { vertical, horizontal } = this.state.position;
        const { user } = this.state
        const backdrop = {
            zIndex: 999,
            color: '#fff'
        }
        const template = {
            zIndex: -1
        }


        return (
            <>
                <SnackBar anchorOrigin={{ vertical, horizontal }} open={this.state.successMessage} autoHideDuration={5000} onClose={this.handleCloseSuccessAlert}>
                    <Alert onClose={this.handleCloseSuccessAlert} variant="filled" icon={<CheckCircle fontSize="inherit" />} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        The data item was successfully registered
                    </Alert>
                </SnackBar>
                <SnackBar anchorOrigin={{ vertical, horizontal }} open={this.state.errorMessage} autoHideDuration={5000} onClose={this.handleCloseErrorAlert}>
                    <Alert onClose={this.handleCloseErrorAlert} variant="filled" icon={<ErrorIcon fontSize="inherit" />} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        The Task and Due Date are required
                    </Alert>
                </SnackBar>
                <Backdrop style={backdrop} open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <TasksModal submitTask={this.submitTask} title={this.state.selected} on={this.state.open} handleClose={this.handleClose} handleOpen={this.handleOpen} />
                {this.state.selected_pk ? <EditTaskModal pk={this.state.selected_pk} members={this.state.project_data.members} open={this.state.open_detail} closeModal={this.closeDetailModal} /> : <></>}
                <Navbar2 user={user} title={this.state.project_data.title} style={template}>
                    <div className="lower_banner py-3 px-1">
                        <span className="image_group">
                            <span className="p-2 mx-2">Board</span>
                            <span className="p-2 mx-2 project_title">{this.state.project_data.title}</span>
                            <AvatarGroup max={4}>
                                {this.state.project_data.members ?
                                    this.state.project_data.members.map(item => {
                                        if (item.image) {
                                            return (
                                                <Avatar key={item.id} sizes="md" variant="circular" src={item.image} />
                                            )
                                        } else {
                                            return (
                                                <Avatar key={item.id} size="md" variant="circular" src="">
                                                    {item.user.username.charAt(0).toUpperCase()}
                                                </Avatar>
                                            )
                                        }
                                    })
                                    :
                                    ""
                                }
                            </AvatarGroup>
                            <button className="butt1 mx-2 py-1 text-white">
                                invite
                            </button>
                        </span>
                        <span>
                            <button className="butt2 py-1 text-white">Menu</button>
                        </span>
                    </div>
                    <div>
                        <div className="row">
                            {task}
                        </div>
                    </div>
                </Navbar2>
            </>
        );
    }
}


export default ProjectBoard;
