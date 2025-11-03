import { useFormik } from "formik";
import * as Yup from "yup";
import InputElement from "./InputElement";
import SelectElement from "./SelectElement";
import { snakeCaseToTitle } from "../../utils/helperFunctions";

const FormGenerator = ({ fields, onSubmit }) => {

  // ✅ Dynamic initial values
  const initialValues = Object.fromEntries(fields.map((f) => [f.name, f.defaultValue || ""]));

  // ✅ Dynamic Yup validations
  const validationSchema = Yup.object(

    Object.fromEntries(
      fields.map((field) => {
        let rule = Yup.string();
        const fieldName = field.label || snakeCaseToTitle(field.name);

        if (field.required)
          rule = rule.required(`${fieldName} is required`);

        if (field.min)
          rule = rule.min(field.min, `${fieldName} must be at least ${field.min} characters`);

        if (field.pattern)
          rule = rule.matches(field.pattern, `${fieldName} is invalid`);

        return [field.name, rule];
      })
    )
  );



  const onSubmitFn = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  }

  // ✅ Formik Hook
  const { handleBlur, handleChange, handleSubmit, errors, touched, values } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitFn,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {fields.map((field, index) => {
        const error = touched[field.name] && errors[field.name] ? errors[field.name] : "";
        const value = values[field.name];
        const sharedProps = {
          ...field,
          value,
          handleChange,
          handleBlur,
          error,
        };

        return field.type === "select" ? (
          <SelectElement key={index} {...sharedProps} />
        ) : (
          <InputElement key={index} {...sharedProps} />
        );
      })}

      <div className="flex gap-2 justify-end border-t-2 border-gray-200 p-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-lg border px-5 py-1"
        >
          Cancel
        </button>

        <button type="submit" className="rounded-lg border px-5 py-1">
          Save
        </button>
      </div>
    </form>
  );
};

export default FormGenerator;
