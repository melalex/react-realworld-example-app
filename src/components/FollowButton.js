import { useNavigate } from "react-router";
import {
  FollowingStatus,
  switchFollowStatus,
} from "../features/profile/profileSlice";
import { handleWithoutPropagation } from "../utils/utilityFunctions";
import { useDispatch } from "react-redux";

const FOLLOWING_STYLE = "btn btn-sm btn-secondary action-btn";
const NOT_FOLLOWING_STYLE = "btn btn-sm btn-outline-secondary action-btn";

export default function FollowButton({
  isAuthenticated,
  username,
  isFollowng,
  followingStatus,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const action = isAuthenticated
    ? () => dispatch(switchFollowStatus())
    : () => navigate("/login");
  const styleClass = isFollowng ? FOLLOWING_STYLE : NOT_FOLLOWING_STYLE;
  const text = isFollowng ? "Unfollow" : "Follow";

  return (
    <button
      className={styleClass}
      onClick={handleWithoutPropagation(action)}
      disabled={followingStatus === FollowingStatus.UPDATING}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {text} {username}
    </button>
  );
}
