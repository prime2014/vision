import React, { useState } from 'react';
import Modal from "react-bootstrap-modal";

const ReactModal = (props) => {

    let closeModal = event => {

    }

    let saveAndClose = event => {

    }

    let openModal = event => {

    }
    return (
        <div>
            <Modal show={props.open} onShow={openModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="ModalHeader">A title goes here</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Some Content here</p>
                </Modal.Body>
                <Modal.Footer>
                    <Modal.Dismiss className="btn btn-default">Cancel</Modal.Dismiss>
                    <button className="btn btn-primary" onClick={saveAndClose}>Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ReactModal;
