import React from "react";
import ReactModal from "react-modal";

export default class ModalPopup extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showModal: false,
            minecraftName: "",
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };
    handleSubmit = (event: React.FormEvent) => 
    {
        event.preventDefault();
        console.log(this.state.minecraftName);
        //Need to send this.state.minecraftName to SOMETHING so that we can use that data later

    };
    setUsername(minecraftName: string) 
    {
        this.setState({ minecraftName });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Trigger Modal</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    style={{
                        overlay: { backgroundColor: "grey" },
                        content:{color: "blue"}
                    }}
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                    <div>
                                <p>Enter your minecraft username here:</p>
                                <form id="loginForm" onSubmit={this.handleSubmit}>
                                    <input
                                        id="input"
                                        name="username"
                                        placeholder="username"
                                        onChange={event =>
                                            this.setUsername(event.target.value)
                                        }
                                    />
                                    <button id="btn" type="submit">
                                        Submit
                                    </button>
                                </form>
                            </div>
                </ReactModal>
            </div>
        );
    }
}

interface Props {}

interface State {
    showModal: Boolean;
    minecraftName:String;
}
