import { useRouteError } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const user = {
    isAuthenticated: true,
    username: "Eric Simons",
    image: "http://i.imgur.com/Qr71crq.jpg",
  };

  return (
    <div className="error-message-container">
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
