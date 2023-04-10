import { useFormikContext } from "formik";

const SubmitButton = () => {
  const { handleSubmit, isValid } = useFormikContext();
  return (
    <button disabled={!isValid} onClick={handleSubmit}>
      Submit
    </button>
  );
};

export default SubmitButton;