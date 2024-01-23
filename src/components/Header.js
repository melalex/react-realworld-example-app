function UnauthenticatedUserHeader() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link active" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Sign in
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">
              Sign up
            </a>
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
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link active" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/editor">
              {" "}
              <i className="ion-compose"></i>&nbsp;New Article{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/settings">
              {" "}
              <i className="ion-gear-a"></i>&nbsp;Settings{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={`/profile/${user.username}`}>
              <img src="" className="user-pic" />
              {user.username}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default function Header({ user }) {
  if (user.isAuthenticated) return <AuthenticatedUserHeader user={user} />;
  else return <UnauthenticatedUserHeader />;
}
