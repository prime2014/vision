import React, { useState } from 'react';
import { Modal } from "react-bootstrap";


const TasksModal = (props) => {
    const [task, setTask] = useState("");
    const [note, setNote] = useState("")
    const [date, setDate] = useState("")

    let handleTextBox = event => {
        let textbox = document.getElementsByClassName('note_textbox')[0];
        textbox.classList.add('display_note_textbox');
    }

    let handleTask = event => {
        setTask(event.target.value);
    }
    let handleNote = event => {
        setNote(event.target.value);
    }
    let handleDate = event => {
        setDate(event.target.value);
    }

    let handleSubmitTask = event => {
        event.preventDefault();
        props.submitTask(task, note, date);
    }


    return (
        <div className="task-modal card">
            <Modal show={props.on} >
                <Modal.Header closeButton onClick={props.handleClose}>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmitTask}>
                        <div className="task_form">
                            <div>
                                <h6><i className="fa fa-file" aria-hidden="true"></i> Enter a task</h6>
                                <input onChange={handleTask} type="text" className="form-control" name="task" placeholder="Enter a task please" value={task} />
                            </div>
                            <div>
                                <div className="pt-2">
                                    <h6>Due Date</h6>
                                    <input onChange={handleDate} type="datetime-local" name='datetime' className="form-control" value={date} />
                                </div>
                                <div className="note py-1">
                                    <span onClick={handleTextBox} className="text-success add_note"><i className="fa fa-paper-plane" aria-hidden="true"></i> Add Note</span>
                                </div>
                                <div className="note_textbox">
                                    <h6>Add a note</h6>
                                    <textarea onChange={handleNote} cols="10" rows="5" className="form-control" value={note}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="py-1">
                            <button type="submit" className="btn btn-info btn-sm">Post</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TasksModal;
