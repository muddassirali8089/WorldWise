import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext.jsx";
import Button from "../components/Button.jsx";

export default function Login() {

  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES

  const { Login, isAuthenticated } = useAuth(); 
  const [email, setEmail] = useState("muddassirali@example.com");
  const [password, setPassword] = useState("0000");

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) Login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
