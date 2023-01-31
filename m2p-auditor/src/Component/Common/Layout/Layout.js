import React, { Component } from 'react';
import routes from '../../../routes';
import { Route, Redirect, Switch } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
// import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

class Layout extends Component {

    getRoutes = (routes) => {
        const token = sessionStorage.getItem("sessionid");
        if (token) {
            return routes.map((route, id) => {
                return route.component ? (<Route path={route.path}
                    exact={route.exact}
                    key={id}
                    name={route.name}
                    render={props => <route.component {...props} />}
                />) : (null)
            });
        } else {
            return <Redirect to="/" from="*" />
        }
    }

    render() {
        const push = this.props.history;
        const role = sessionStorage.getItem("role");
        return (
            <Aux>
                <Sidebar push={push} />
                <main>
                    <Header />
                    <section className="dashboad m-0 p-0">
                        <Switch>
                            {this.getRoutes(routes)}
                            <Redirect to="/404" from="*" />
                        </Switch>
                    </section>
                </main>
            </Aux>
        )
    }
}

export default Layout;
