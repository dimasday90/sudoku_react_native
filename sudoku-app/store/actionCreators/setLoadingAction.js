import { SET_LOADING } from "../actionTypes";

export default function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload
  };
}
