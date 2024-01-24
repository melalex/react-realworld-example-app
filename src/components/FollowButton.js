import { handleWithoutPropagation } from "../utils/utilityFunctions";

const FOLLOWING_STYLE = "btn btn-sm btn-secondary action-btn";
const NOT_FOLLOWING_STYLE = "btn btn-sm btn-outline-secondary action-btn";

export default function FollowButton({
  username,
  isFollowng,
  onFollow,
  onUnfollow,
}) {
  const action = isFollowng ? onUnfollow : onFollow;
  const styleClass = isFollowng ? FOLLOWING_STYLE : NOT_FOLLOWING_STYLE;

  return (
    <button className={styleClass} onClick={handleWithoutPropagation(action)}>
      <i className="ion-plus-round"></i>
      &nbsp; Follow {username}
    </button>
  );
}
