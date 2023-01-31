import React, { Component } from 'react';
import routes from '../../../routes';
import { Route, Redirect, Switch } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
// import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
const $ = window.$;

class Layout extends Component {
    state = {
        toggleStatus: '',
    }

    componentDidMount() {
        const theme = localStorage.getItem("theme");
        if (theme === "light") {
            this.loadCss();
            this.setState({
                toggleStatus: "light"
            });
        }

    }

    loadCss = () => {
        const file = process.env.PUBLIC_URL + "/css/theme.css";
        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("title", "syntizen");
        newlink.setAttribute("href", file);
        document.getElementsByTagName("head").item(0).appendChild(newlink);
        localStorage.setItem("theme", "light");
    }

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

    // componentWillUnmount(){
    //     if (this.props.history.isExact === "POP") {
    //         // custom back button implementation
    //         alert("")
    //         this.props.history.replace = "/customer/20002"
    //     }
    // }

    toggleTheme = (val) => {
        if (val === 1) {
            // $('link[title=syntizen]')[0].disabled = "false";
            // $('link[title="syntizen"]').attr('disabled', 'true');
            // $('link[title="syntizen"]').add();
            this.loadCss();
            this.setState({
                toggleStatus: "light"
            });
        } else if (val === 2) {
            // $('link[title=syntizen]')[0].disabled = "true";
            $('link[title="syntizen"]').attr('disabled', 'disabled');
            $('link[title="syntizen"]').remove();
            localStorage.setItem("theme", "dark");
            this.setState({
                toggleStatus: "dark"
            });
        }
        // window.location.reload();
    }

    render() {
        const push = this.props.history;
        const role = sessionStorage.getItem("role");
        return (
            <Aux>
                <Sidebar push={push} toggleStatus={this.state.toggleStatus} toggle={this.toggleTheme} />
                <main>
                    <Header />
                    <section className="dashboad">
                        {/* {role === "1" ? */}
                        <Switch>
                            {this.getRoutes(routes)}
                            <Redirect to="/404" from="*" />
                        </Switch>
                        {/* //  : <h1 className="text-center text-white">Please login with Agent Credentials</h1>} */}
                        {/* {this.getRoutes(routes)} */}
                        {/* <Footer /> */}
                    </section>
                </main>
            </Aux>
        )
    }
}

export default Layout;
