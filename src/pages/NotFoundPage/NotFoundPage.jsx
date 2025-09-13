import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <p>Sorry, this page does not exist</p>
      <p>Redirecting to Home page in {timeLeft} seconds...</p>
      <Link to="/">Home page</Link>
    </div>
  );
}