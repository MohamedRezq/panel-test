"use client";
import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "../Action.module.scss";
import tables_attributes from "@/config.tables";

export default function ActionPage({ searchParams }: any) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className={styles.container}>
      <h3>Edit {searchParams?.item}</h3>
      <Form className="edit-form">
        <table className={styles.table}>
          <tbody>
            {tables_attributes
              .get("categories")
              ?.edit_attributes?.map((attr: any) => (
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
                      id="price"
                      placeholder={attr.attr_name}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}
