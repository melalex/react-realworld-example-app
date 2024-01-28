import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import {
  logout,
  selectUser,
  selectUserErrors,
  selectUserStatus,
  updateUser,
} from "../features/user/userSlice";
import {
  handleAndPreventDefault,
  handleChangeWith,
  handleWithoutPropagation,
} from "../utils/utilityFunctions";
import { useNavigate } from "react-router";
import { useState } from "react";
import { reInitArticles } from "../features/article/articleSlice";
import { reInitProfile } from "../features/profile/profileSlice";
import SubmitButton from "../components/SubmitButton";

export default function SettingsPage() {
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  const errors = useSelector(selectUserErrors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const onSave = () => {
    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        dispatch(reInitArticles());
        dispatch(reInitProfile());
        navigate("/");
      });
  };

  const handleChange = handleChangeWith(formData, setFormData);

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ErrorMessage errors={errors} />

            <form onSubmit={handleAndPreventDefault(onSave)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    name="image"
                    defaultValue={user.profile.image}
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="username"
                    defaultValue={user.profile.username}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    name="bio"
                    defaultValue={user.profile.bio}
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    onChange={handleChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="email"
                    defaultValue={user.profile.email}
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
                    placeholder="New Password"
                    onChange={handleChange}
                  />
                </fieldset>
                <SubmitButton
                  status={status}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings
                </SubmitButton>
              </fieldset>
            </form>
            <hr />
            <button
              className="btn btn-outline-danger"
              onClick={handleWithoutPropagation(() => {
                dispatch(logout());
                navigate("/");
              })}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
