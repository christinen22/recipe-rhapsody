"use client";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "../styles.module.css";

const ProfilePage = () => {
  const [newPassword, setNewPassword] = useState("");

  const supabase = createClientComponentClient();

  const handleChangePassword = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error("Error updating password");
      } else {
        toast.success("Password updated successfully");
      }
    } catch (error) {
      console.error("Error updating password");
    }
  };

  return (
    <main>
      <h2>User Profile</h2>
      <div className={styles.container}>
        <h2 className={styles.title}>Change Password</h2>
        <Form>
          <Form.Group controlId="formNewPassword" className={styles.group}>
            <Form.Label className={styles.formHeading}>New Password</Form.Label>
            <Form.Control
              className={styles.input}
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            className={styles.submitButton}
            variant="primary"
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Form>
      </div>
    </main>
  );
};

export default ProfilePage;
