import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Authform.module.css";

interface AuthFormProps {
  handleSubmit: (
    e: React.FormEvent,
    email: string,
    password: string
  ) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form
      onSubmit={(e) => handleSubmit(e, email, password)}
      className={styles.form}
    >
      <Form.Group className={styles.group}>
        <Form.Label className={styles.formHeading}>Email:</Form.Label>
        <Form.Control
          className={styles.input}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </Form.Group>

      <Form.Group className={styles.group}>
        <Form.Label className={styles.formHeading}>Password:</Form.Label>
        <Form.Control
          className={styles.input}
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className={styles.submitButton}>
        Submit
      </Button>
    </Form>
  );
};

export default AuthForm;
