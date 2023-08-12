export const InputErrorMessage = ({ error, marginBottom = 0 }) => {
  if (error) {
    return (
      <p
        className='text-danger'
        style={{
          marginBottom,
          textAlign: "start",
          fontSize: "14px",
        }}>
        {error}
      </p>
    );
  }
  return (
    <p style={{ marginBottom }} className='invisible'>
      -
    </p>
  );
};
