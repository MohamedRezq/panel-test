"use client";
import { useEffect } from "react";
import { Event } from "react-big-calendar";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface IModalProps {
  showEditTimeSlotModal: boolean;
  setShowEditTimeSlotModal: Function;
  event: Event;
}

function EditTimeSlot(props: IModalProps) {
  useEffect(() => {}, [props]);

  return (
    <>
      <Modal
        show={props.showEditTimeSlotModal}
        onHide={() => props.setShowEditTimeSlotModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Timeslot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="w-100 mb-3">
            <tbody>
              <tr>
                <td className=" fw-semibold">Day:</td>
                <td>{props?.event?.start?.toDateString()}</td>
              </tr>
              <tr>
                <td className=" fw-semibold">from_time:</td>
                <td>{props?.event?.start?.toTimeString().slice(0, 8)}</td>
              </tr>
              <tr>
                <td className=" fw-semibold">to_time:</td>
                <td>{props?.event?.end?.toTimeString().slice(0, 8)}</td>
              </tr>
            </tbody>
          </table>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.setShowEditTimeSlotModal(false);
            }}
          >
            <Form.Control
              type="number"
              className="mb-3"
              placeholder="Capacity"
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditTimeSlot;
