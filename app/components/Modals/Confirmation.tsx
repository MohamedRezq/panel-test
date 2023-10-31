"use client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loader from "../common/Loader";

interface IModalProps {
  showConfirmationModal: boolean;
  setShowConfirmationModal: Function;
  text: string;
  action: any;
}

function Confirmation(props: IModalProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [props]);

  return (
    <>
      <Modal
        show={props.showConfirmationModal}
        onHide={() => props.setShowConfirmationModal(false)}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Create Timeslot</Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="d-flex flex-column gap-3">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div>{props.text}</div>
              <div className="d-flex align-items-center gap-3">
                <Button
                  onClick={() => {
                    setLoading(true);
                    props.action.then((res: any) => {
                      if (res?.status) console.log("true");
                    });
                    setLoading(false);
                  }}
                  style={{ width: "50px" }}
                  variant="secondary"
                >
                  Yes
                </Button>
                <Button
                  style={{ width: "50px" }}
                  variant="light"
                  onClick={() => {
                    () => props.setShowConfirmationModal(false);
                  }}
                >
                  No
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Confirmation;
