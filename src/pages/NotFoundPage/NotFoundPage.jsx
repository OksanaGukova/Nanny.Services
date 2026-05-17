import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/");
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, navigate]);

  return (
   <div className={css.notFoundContainer}>
  <div className={css.notFoundCard}>
    <h1 className={css.notFoundTitle}>404</h1>

    <p className={css.notFoundText}>
      Sorry, this page does not exist
    </p>

    <p className={css.redirectText}>
      Redirecting to Home page in{" "}
      <span className={css.timer}>{timeLeft}</span> seconds...
    </p>

    <Link className={css.homeLink} to="/">
      Home page
    </Link>
  </div>
</div>
  );
}