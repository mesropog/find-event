import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleNavbar} from '../actions/userData';
import classNames from 'classnames';

export const Header = (props) => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-right">
            <NavLink className="navbar-brand" to="/">Find Event</NavLink>
            <button className="navbar-toggler" type="button" onClick={props.toggleNavbar}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={classNames('collapse', 'navbar-collapse', {'clicked' : props.clicked})} id="navbarColor03">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/browse">Browse</NavLink>
                    </li>

                    {props.authenticated
                    ?
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/signout">Sign OUT</NavLink>
                        </li>
                    :
                        [
                            <li className="nav-item" key="1">
                                <NavLink activeClassName="active" className="nav-link" to="/signup">Sign Up</NavLink>
                            </li>,
                            <li className="nav-item" key="2">
                                <NavLink activeClassName="active" className="nav-link" to="/signin">Sign In</NavLink>
                            </li>
                        ]
                    }
                </ul>
            </div>
        </nav>
    </div>
);


const mapStateToProps = (state) => ({
    authenticated : state.userData.authenticated,
    clicked : state.userData.clicked
});

const mapDispatchToProps = dispatch => ({
    toggleNavbar : () => dispatch(toggleNavbar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);