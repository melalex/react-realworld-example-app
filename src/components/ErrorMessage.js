export default function ErrorMessage({ errors }) {
  if (errors.length !== 0)
    return (
      <ul className="error-messages">
        {errors.map((it) => (
          <li>{it}</li>
        ))}
      </ul>
    );
  else return <></>;
}
