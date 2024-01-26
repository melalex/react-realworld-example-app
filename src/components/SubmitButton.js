import Status from "../utils/Status";

export default function SubmitButton({ status, children, className }) {
  return (
    <button
      type="submit"
      className={className}
      disabled={status === Status.LOADING.value}
    >
      {children}
    </button>
  );
}
