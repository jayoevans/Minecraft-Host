import React from "react";
import ReactModal from "react-modal";

export default class ModalPopup extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showModal: false,
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
                    <p>Please set your minecraft username</p>
                </ReactModal>
            </div>
        );
    }
}

interface Props {}

interface State {
    showModal: Boolean;
}
