import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import {
  handleAndPreventDefault,
  handleChangeWith,
} from "../utils/utilityFunctions";
import { useNavigate } from "react-router";
import {
  loginUser,
  selectUserErrors,
  selectUserStatus,
} from "../features/user/userSlice";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import { reInitArticles } from "../features/article/articleSlice";
import { reInitProfile } from "../features/profile/profileSlice";

export default function LoginPage() {
  const status = useSelector(selectUserStatus);
  const errors = useSelector(selectUserErrors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onLogin = () =>
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        dispatch(reInitArticles());
        dispatch(reInitProfile());
        navigate("/");
      });

  const handleChange = handleChangeWith(formData, setFormData);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <ErrorMessage errors={errors} />

            <form onSubmit={handleAndPreventDefault(onLogin)}>
              <fieldset className="form-group">
                <input
                  name="email"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  name="password"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </fieldset>
              <SubmitButton
                status={status}
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign in
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
