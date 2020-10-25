import React from "react";
import { ServerList } from "./server/server-list";
import { AccountInfo } from "../login/account-info";

export class Portal extends React.Component<Props, State>
{
    constructor(props: Props) 
    {
        super(props);

        this.state = {
            username: "",
            uuid: "",
            skin: ""
            // previousNames: [],
        };
    }

    render() 
    {
        return (
            <div id="portalContainer" className="portal">
                {/* <ModalPopup/> */}
                {/* <h1>Portal</h1> */}
                <div id="splitDiv">
                    <article id="lHalf">
                        <div id="infoDiv">
                            <h3 id="h3">Account Name: {this.props.username}</h3>
                            <h3 id="h3">Name History</h3>
                            <div id="previousNames">
                                { this.props.accountInfo.nameHistory.map((name, index) => <li key = { index }>{name}</li>) }
                            </div>

                            <h3 id="h3">Servers</h3>
                            <ServerList accountId = { this.props.accountInfo.uuid }/>
                        </div>
                    </article>
                    <article id="rHalf">
                        <h3 id="h3">Player Skin</h3>
                        <div id="imgDiv">
                            <img
                                id="skin"
                                src={this.props.accountInfo.skin}
                                alt="Players minecraft skin"
                            />
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}

interface Props
{
    username: string;
    accountInfo: AccountInfo;
}

interface State
{

}
