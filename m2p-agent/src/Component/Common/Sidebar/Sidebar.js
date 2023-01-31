import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { LogoutAction } from '../../../Store/Actions/Login';

class Sidebar extends Component {
    // state = {
    //     id: ''
    // }
    // componentDidMount(){
    //     const id = this.props.match?.params;  
    //     console.log(id);

    //     this.setState({
    //         id: id
    //     })
    // }

    logout = () => {
        const $this = this.props.push;
        this.props.LogoutAction($this)
        // sessionStorage.clear();
    }

    render() {
        const theme = this.props.toggleStatus || localStorage.getItem("theme");

        return (
            <aside id="hideSidebar">
                <h2 className="sidebar-title">
                Syntizen
                    {/* <br/>
                    <span>Bank</span> */}
                </h2>
                <p className="sidebar-subtitle">Bank</p>
                <ul className="nav flex-column custom-sidebar">
                    <li className="nav-item custom-sidebar-item">
                        <NavLink to="/dashboard" exact activeClassName="active-tab" strict className="nav-link custom-sidebar-link">
                            <i className="fas fa-home" />
                        </NavLink>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <NavLink to="/vciplist" exact strict activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-user-alt" />
                        </NavLink>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <NavLink to="/next" exact activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-cog" />
                        </NavLink>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <NavLink to="/next" exact activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-comments" />
                        </NavLink>
                    </li>
                    {/* <li className="nav-item custom-sidebar-item">
                        <NavLink to="/next" exact activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-calendar" />
                        </NavLink>
                    </li> */}
                    <li className="nav-item custom-sidebar-item">
                        <NavLink to="/next" exact activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-bell" />
                        </NavLink>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        {/* <NavLink to="/next" exact activeClassName="active-tab" className="nav-link custom-sidebar-link">
                            <i className="fas fa-bell" />
                        </NavLink> */}
                        {theme === "dark" ? <button className="logout mb-2" onClick={() => this.props.toggle(1)}>
                            <i className="far fa-moon"></i>
                        </button> : <button className="logout mb-2" onClick={() => this.props.toggle(2)}>
                                <i className="fas fa-moon"></i>
                            </button>}
                    </li>
                </ul>
                <div className="text-center">
                    {/* <button className="logout mb-2" onClick={this.props.toggle}>
                        {toggleIcon ? <i className="far fa-moon"></i> : <i class="fas fa-moon"></i>}
                    </button> */}
                    <button className="logout" onClick={this.logout}><i className="fas fa-power-off" /></button>
                </div>
            </aside >

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        LogoutAction: ($this) => dispatch(LogoutAction($this))
    }
}

export default connect(null, mapDispatchToProps)(Sidebar);
