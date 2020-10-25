import React from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Portal } from "../components/portal";
import Account from "../pages/account";
import Navbar from "./navbar/navbar";

export class AlteredLogin extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: "",
            uuid: "",
            skin: "",
            previousNames: [],
            error: "",
            loggedIn: false,
        };
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <div id="loginContainer" className="loginPage">
                    <h1 id="h1">Login</h1>
                    <form id="loginForm" onSubmit={this.handleSubmit}>
                        <div>
                            <input
                                id="input"
                                name="username"
                                placeholder="Minecraft username"
                                value={this.state.username}
                                onChange={(event) =>
                                    this.setUsername(event.target.value)
                                }
                            />
                        </div>

                        <button id="btn" type="submit">
                            Submit
                        </button>
                        <p>{this.state.error}</p>
                    </form>
                </div>
            );
        } else {
            return (
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path="/">
                            {this.state.loggedIn ? (
                                <Redirect to="/home" />
                            ) : (
                                <Portal />
                            )}
                        </Route>
                        <Route
                            path="/home"
                            exact
                            component={Portal}
                            username={this.state.username}
                        ></Route>
                        <Route path="/account" exact component={Account} />
                    </Switch>
                </Router>
            );
        }
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        let currentUrl: any = window.location.host.split(":");
        let regexp = new RegExp("^(?:[0-9]{1,3}.){3}[0-9]{1,3}");
        let baseURL: string = "";
        if (regexp.test(currentUrl[0]) || currentUrl[0] === "localhost")
        {
            console.log(currentUrl[0]);
            console.log("Current url [0]");
            baseURL = currentUrl[0];
        } else if (regexp.test(currentUrl[1]) || currentUrl[1] === "localhost")
        {
            console.log(currentUrl[1]);
            console.log("Current url [1]");
            baseURL = currentUrl[1];
        } else 
        {
            console.log("Neither " +currentUrl[0] +" or " +currentUrl[1] +" equals a valid IP");
        }
        const data = this.state;
        axios.get(`http://${baseURL}:8000/minecraft/user/${data.username}`)
            .then((res) => 
            {
                if (res.status === 200)
                {
                    if (res.data.Error === "Doesn't exist")
                    {
                        this.setError("User doesn't exist");
                        this.setUsername("");
                    } 
                    else 
                    {
                        this.setUuid(res.data.uuid);
                        this.setSkin(res.data.skin);
                        this.setPreviousNames(res.data.previousUserNames);
                        this.setLoggedIn(true);
                    }
                }
                console.log(res);
            })
            .catch((err) => 
            {
                console.log(err);
                this.setError("Server experiencing trouble, try again later.");
                this.setUsername("");
            });
    };

    private setUsername(username: string) {
        this.setState({ username });
    }
    private setUuid(uuid: string) {
        this.setState({ uuid });
    }
    private setSkin(skin: string) {
        this.setState({ skin });
    }
    private setPreviousNames(previousNames: any) {
        this.setState({ previousNames });
    }
    private setError(error: string) {
        this.setState({ error });
    }
    private setLoggedIn(loggedIn: boolean) {
        this.setState({ loggedIn });
    }
}

interface Props {}

interface State {
    username: string;
    uuid: string;
    skin: string;
    previousNames: any;
    error: string;
    loggedIn: boolean;
}
