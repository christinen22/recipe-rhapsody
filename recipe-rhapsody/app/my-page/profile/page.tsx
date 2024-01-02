"use client";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
        // Provide user feedback or navigate to another page
      }
    } catch (error) {
      console.error("Error updating password");
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <Form>
        <Form.Group controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleChangePassword}>
          Change Password
        </Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
