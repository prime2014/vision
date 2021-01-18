import React from 'react';
import NavigationBar from '../../Common/Navigation/NavigationBar';
import PlusIcon from '../../Common/PlusIcon';
import useSWR from 'swr';
import { Link } from "react-router-dom";

const Projects = (props) => {
    const { data, error } = useSWR(`/projects/projects/?search=${localStorage.getItem('user')}`);

    if (!data) return <NavigationBar><div>Loading...</div></NavigationBar>


    if (data) {
        return (
            <NavigationBar>
                <div>
                    <PlusIcon />
                    <h3 className="my-4 board-title">PROJECT INDEX</h3>
                    <div className="row">
                        <div className="col-md-12 card px-2 py-2">
                            <table className="table project-table">
                                <thead>
                                    <tr>
                                        <th colSpan="2" className="text-center">#</th>
                                        <th colSpan="3" className="text-center">Project</th>
                                        <th colSpan="2" className="text-center">Members</th>
                                        <th colSpan="3" className="text-center">Link</th>
                                        <th colSpan="2" className="text-center">Last seen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.results.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td colSpan="2" className="text-center"><input type="checkbox" name="project" value="" /></td>
                                                <td colSpan="3" className="text-center">{item.title}</td>
                                                <td colSpan="2" className="text-center">{item.members.length}</td>
                                                <td colSpan="3" className="text-center"><Link to={`/projects/${item.title.toLowerCase().replace(' ', '-')}/${item.id}`}>{item.title.toLowerCase()}</Link></td>
                                                <td colSpan="2" className="text-center">Tue 11, March 2020</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </NavigationBar>
        );
    }
}

export default Projects;
