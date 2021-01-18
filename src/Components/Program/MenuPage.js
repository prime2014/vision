import React from 'react';
import NavigationBar from '../../Common/Navigation/NavigationBar';
import { Link } from "react-router-dom";
import '../../index.css';
import PlusIcon from '../../Common/PlusIcon';
import useSWR from 'swr';


const MenuPage = (props) => {
    const { data, error } = useSWR('/cat/categories/')


    if (!data) return <div>Loading</div>

    if (data) {
        return (
            <NavigationBar>
                <div>
                    <h3 className="my-4 board-title">ACTIVITY BOARD</h3>

                    <PlusIcon />
                    <div className="row mb-3 categories">
                        <h4 className="col-md-12 mb-5">CATEGORIES</h4>
                        {data.results.map(item => {
                            return (
                                <Link to={`/${item.name.toLowerCase()}`} className="col-md-4" key={item.id}>
                                    <div>
                                        <div className="card px-3 py-2">
                                            <div className="title">
                                                <h5>{item.name}</h5>
                                                <span><span className="badge badge-pill badge-primary">14</span></span>
                                            </div>
                                            <p className="text-info tagline py-2">{item.tagline}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </NavigationBar>
        );
    }
}

export default MenuPage;
