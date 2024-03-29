import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import { UserListAction } from '../../Store/Actions/DetailsAction';

class Dashboard extends Component {

    componentDidMount() {
        const userid = sessionStorage.getItem("userid");
        sessionStorage.removeItem("vcipid");
        const $this =  this.props.history;
        if (userid) {
            this.props.UserListAction($this)
        }
    }

    // componentWillUnmount() {
    //     this.props.UserListAction();
    // }

    render() {
        return (
            <Aux>
                <div className="dashboard">
                    <h2 className="text-white mb-3">VCIP DATA</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="dashboard-box">
                                <div className="dashboard-child"></div>
                                <div className="dashboard-content">
                                    <h4 className="dashboard-title">Total Approved VCIP</h4>
                                    <p className="dashboard-subtitle">
                                        {this.props.InfoRdr.userList?.totalauditedvcips}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="dashboard-box">
                                <div className="dashboard-child dashboard-child1"></div>
                                <div className="dashboard-content">
                                    <h4 className="dashboard-title">Rejected</h4>
                                    <p className="dashboard-subtitle">
                                        {this.props.InfoRdr.userList?.rejectedvcips}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="dashboard-box">
                                <div className="dashboard-child dashboard-child2"></div>
                                <div className="dashboard-content">
                                    <h4 className="dashboard-title">Completed</h4>
                                    <p className="dashboard-subtitle">
                                        {this.props.InfoRdr.userList?.successvcips}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="dashboard-box">
                                <div className="dashboard-child dashboard-child3"></div>
                                <div className="dashboard-content">
                                    <h4 className="dashboard-title">In Progress</h4>
                                    <p className="dashboard-subtitle">
                                        {this.props.InfoRdr.userList?.inprogressvcips}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { InfoRdr } = state;
    return { InfoRdr }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UserListAction: ($this) => dispatch(UserListAction($this))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
