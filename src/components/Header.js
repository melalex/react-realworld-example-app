import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { Link } from "react-router-dom";

function UnauthenticatedUserHeader() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function AuthenticatedUserHeader({ user }) {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/editor">
              {" "}
              <i className="ion-compose"></i>&nbsp;New Article{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/settings">
              {" "}
              <i className="ion-gear-a"></i>&nbsp;Settings{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/profile/${user.profile.username}`}>
              <img src={user.profile.image} className="user-pic" />
              {user.profile.username}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default function Header() {
  const user = useSelector(selectUser);

  if (user.isAuthenticated) return <AuthenticatedUserHeader user={user} />;
  else return <UnauthenticatedUserHeader />;
}
