import React from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { Avatar } from "@material-ui/core";

const Navbar2 = ({ ...props }) => {

    return (
        <div className="board-template">
            <nav className="board_navbar px-3">
                <div className="nav-left">
                    <h1>Vision</h1>
                    <h5 className="px-2">{props.title}</h5>
                </div>

                <div className="left_section">
                    <AddBoxIcon />
                    <NotificationsNoneIcon />
                    <Avatar sizes="xs" src={props.user.image} variant="circular" />
                </div>
            </nav>
            <section className="p-2 board_body">
                {props.children}
            </section>
        </div>
    );
}

export default Navbar2;
