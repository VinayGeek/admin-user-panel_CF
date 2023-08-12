import { InputErrorMessage } from "./ErrMessage";
import Select from "react-select";

// label='Test Name'
// name='testName'
// value={testName}
// onChange={handleChange}
// placeholder='test name'
// error={touched.testName && errors.testName}

export const InputField = ({ label, name, value, onChange, error, placeholder }) => (
  <div className=''>
    <label>{label}</label>
    <input
      type='text'
      name={name}
      value={value}
      onChange={onChange}
      className='form-control'
      placeholder={placeholder}
    />
    <InputErrorMessage error={error} marginBottom={-5} />
  </div>
);

export const InputSelect = ({ label, options, name, value, onChange, error }) => (
  // label='Test Type'
  // options={ListOptions}
  // name='testType'
  // value={testType}
  // onChange={(e) => setFieldValue("testType", { value: e.value, label: e.label })}
  // error={touched.testType && errors.testType}

  // placeholder='Test Type'

  <div className=''>
    <label>{label}</label>
    <Select type='text' name={name} value={value} onChange={onChange} options={options} />
    <InputErrorMessage error={error} marginBottom={-5} />
  </div>
);
