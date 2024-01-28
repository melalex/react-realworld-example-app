import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import {
  registerUser,
  selectUserErrors,
  selectUserStatus,
} from "../features/user/userSlice";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import {
  handleAndPreventDefault,
  handleChangeWith,
} from "../utils/utilityFunctions";
import { reInitArticles } from "../features/article/articleSlice";
import { reInitProfile } from "../features/profile/profileSlice";

export default function RegisterPage() {
  const status = useSelector(selectUserStatus);
  const errors = useSelector(selectUserErrors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onRegister = () =>
    dispatch(registerUser(formData))
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
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ErrorMessage errors={errors} />

            <form onSubmit={handleAndPreventDefault(onRegister)}>
              <fieldset className="form-group">
                <input
                  name="username"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                />
              </fieldset>
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
                className="btn btn-lg btn-primary pull-xs-right"
                status={status}
              >
                Sign up
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
