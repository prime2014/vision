import React from 'react';
import Prime from "../../Images/prime.png";

const NavigationBar = (props) => {
    return (
        <div className="navigation">
            <section className="sidebar">
                <div>
                    {/* App title */}
                    <h3 className="text-center">vision</h3>

                    {/*------------------------- Menu items ------------------------- */}
                    {/* profile section */}
                    <div className="sidebar-sub-section-1">
                        <div className="profile px-2 py-1">
                            <div className="person py-2">
                                <img className="profile-image" src={Prime} alt="" />
                                <h5 className="px-2">Prime Omondi</h5>
                            </div>
                            <div>
                                <button className="edit-button">Edit</button>
                            </div>
                        </div>
                        <div className="my-2">
                            <h6 className="menu py-2">MENU</h6>
                            <ul>
                                <li><i className="fa fa-puzzle-piece first" aria-hidden="true"></i> Personalise</li>
                                <li><i className="fa fa-calendar second" aria-hidden="true"></i> Calendar</li>
                                <li><i className="fa fa-pie-chart third" aria-hidden="true"></i> Progress</li>
                                <li><i className="fa fa-envelope-open fourth" aria-hidden="true"></i> Events</li>
                                <li><i className="fa fa-bell fifth" aria-hidden="true"></i> Notifications</li>
                            </ul>
                        </div>
                    </div>
                    <div className="sidebar-sub-section-2">
                        <div className="my-2">
                            <h6 className="menu py-2">REVIEW</h6>
                            <ul>
                                <li><i className="fa fa-check first" aria-hidden="true"></i> Accomplishments</li>
                                <li><i className="fa fa-calendar-check-o second" aria-hidden="true"></i> Goals</li>
                                <li><i className="fa fa-exclamation third" aria-hidden="true"></i> Failures</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <aside className="px-4">
                {props.children}
            </aside>
        </div>
    );
}

export default NavigationBar;
