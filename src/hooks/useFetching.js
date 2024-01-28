import { useEffect } from "react";
import Status from "../utils/Status";
import { useDispatch } from "react-redux";

export default function useFetching(status, actionCreator) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === Status.IDLE) {
      dispatch(actionCreator());
    }
  }, [status]);
}
