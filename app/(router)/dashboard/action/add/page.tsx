"use client";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "../Action.module.scss";
import tables_attributes from "@/config.tables";
import { useRouter } from "next/navigation";
import Modal from "react-bootstrap/Modal";
import { createItem, createDynamicObject } from "@/utils/data";

export default function ActionPage({ searchParams }: any) {
  const cols =
    tables_attributes.get(searchParams.tab ?? "")?.create_attributes || [];
  //--- State -------------------------------------------------//
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //--- Tools -------------------------------------------------//
  const router = useRouter();
  //--- Create Item Handler -----------------------------------//
  const AddModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    //--- Get Form Values -------------------------------------//
    const form = event.target; // Get the form element
    const inputs = form.elements; // Get all form elements
    const inputValues = [];
    const inputIds = [];
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      // Check if the element is an input field by its tagName
      if (input.tagName == "INPUT") {
        inputValues.push(input.value);
        inputIds.push(input.id);
      }
    }
    const dynamicObject = createDynamicObject(inputIds, inputValues);
    const data: any = {};
    data[searchParams.item] = dynamicObject;
    //--- Call Api Create Handler -------------------------------------//
    const res: any = await createItem(searchParams.item, data);
    if (res.status == 200) {
      setSuccess(true);
      handleShow();
      // router.push("/dashboard");
    } else {
      setError(true);
      handleShow();
    }
  };

  return (
    <div className={styles.container}>
      <AddModal />
      <h3>Add {searchParams?.item}</h3>
      <Form className="edit-form" onSubmit={handleSubmit}>
        <table className={styles.table}>
          <tbody>
            {/*  */}

            {cols.map((attr: any) => (
              <tr key={`row-${attr.attr_name}`}>
                <td>
                  <label htmlFor={attr.attr_name}>
                    {attr.attr_name}{" "}
                    {attr.attr_req && (
                      <span className={styles.required}>*</span>
                    )}
                  </label>
                </td>
                <td>
                  <Form.Control
                    type={attr.attr_type}
                    id={`${attr.attr_name}`}
                    placeholder={attr.attr_placeholder}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
}
