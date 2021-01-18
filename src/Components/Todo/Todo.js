import React, { useState } from 'react';
import NavigationBar from '../../Common/Navigation/NavigationBar';
import '../../index.css';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PlusIcon from '../../Common/PlusIcon';
import useSWR from 'swr';
import ReactModal from '../../Common/Modal/Modal';


const Todo = props => {
    const { data, error } = useSWR(`/tasks/todos/?search=${localStorage.getItem('user')}`);
    const [edit, setEdit] = useState(false);
    const [datetime, setDateTime] = useState(new Date())
    const [open, setOpen] = useState(false);

    if (!data) return <NavigationBar><div>Loading...</div></NavigationBar>

    let handleOpenEditForm = event => {
        // let todo_card = event.target.parentElement.parentElement;
        setEdit(true);
    }

    let removeEditForm = event => {
        setEdit(false)
    }

    let handleDayClicked = (value, event) => {
        setDateTime(new Date(value))
    }

    let handleAddTodo = () => {
        setOpen(true);
    }

    if (data) {
        return (
            <NavigationBar>
                <ReactModal open={open} />
                <div>
                    <PlusIcon todo={handleAddTodo} />
                    <div>
                        <div className="todo-top-bar">
                            <h3 className="my-4 board-title">SCHEDULED ITEMS</h3>
                            <form>
                                <input type="search" name="q" placeholder="search todo items here" />
                                <button className="search-btn mx-2"><i className="fa fa-search" aria-hidden="true"></i></button>
                            </form>
                        </div>
                        <div className="list">
                            <h5>List Items</h5>
                            <span>Date: 5/12/2020</span>
                        </div>

                        <div>
                            <div className="row">
                                <div className="col-md-8">
                                    {data.results.map(item => {
                                        return (
                                            <div key={item.id} className={edit ? "card todo-card display-edit py-2 mb-3" : "card todo-card py-2 mb-3"}>
                                                <div className="todo-items">
                                                    <p>{item.id}. {item.task}</p>
                                                    <div>
                                                        {edit ? <><i className="fa fa-paper-plane mx-2 text-success" aria-hidden="true"></i></> : <><i onClick={handleOpenEditForm} className="fa fa-pencil mx-2 text-info" aria-hidden="true"></i></>}
                                                        {edit ? <><i onClick={removeEditForm} className="fa fa-times text-danger" aria-hidden="true"></i></> : <><i className="fa fa-trash text-danger" aria-hidden="true"></i></>}
                                                    </div>
                                                </div>
                                                <form className="mt-3 px-2 edit-form">
                                                    <hr />
                                                    <label>Todo*</label>
                                                    <input className="form-control mb-2" type="text" name="todo" placeholder="Edit todo..." />
                                                    <label>Note</label>
                                                    <textarea className="form-control" cols="10" rows="7"></textarea>
                                                </form>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className="col-md-4">
                                    <div className="card px-2 py-2">
                                        <Calendar onClickDay={handleDayClicked} value={datetime} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </NavigationBar>
        );
    }
}

export default Todo;
