export default function ErrorMessage({ errors }) {
  if (Array.isArray(errors) && errors.length !== 0)
    return (
      <ul className="error-messages">
        {errors.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    );
  else return <></>;
}
