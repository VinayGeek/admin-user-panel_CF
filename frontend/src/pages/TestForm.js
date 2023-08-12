import React from "react";
import { useFormik } from "formik";
import { testValidation } from "../components/Validations";
import { InputField, InputSelect } from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { ListOptions } from "../components/ListOptions";

const TestForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      testName: "",
      testType: null,
      testEmail: "",
      testMobile: "",
      testAltNo: "",
    },
    validationSchema: testValidation,
    onSubmit: (values) => {
      const creationDate = new Date().toISOString();
      const formDataWithDate = { ...values, creationDate };
      const savedTests = JSON.parse(localStorage.getItem("savedTests")) || [];
      savedTests.push(formDataWithDate);
      localStorage.setItem("savedTests", JSON.stringify(savedTests));
      navigate("/");
    },
  });

  const {
    values: { testName, testType, testEmail, testMobile, testAltNo },
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  console.log(formik.errors.testAltNo);
  return (
    <div className='container'>
      <h1>Create Test</h1>
      <form onSubmit={handleSubmit}>
        <div className='row text-start'>
          <div className='form-group  col-6'>
            <InputField
              label='Test Name'
              name='testName'
              value={testName}
              onChange={handleChange}
              error={touched.testName && errors.testName}
              placeholder='test name'
            />
          </div>
          <div className='form-group col-6'>
            <InputSelect
              label='Test Type'
              options={ListOptions}
              name='testType'
              value={testType}
              onChange={(e) => setFieldValue("testType", { value: e.value, label: e.label })}
              error={touched.testType && errors.testType}
            />
          </div>
          <div className='form-group col-6'>
            <InputField
              label='Tester Email Id'
              name='testEmail'
              value={testEmail}
              onChange={handleChange}
              error={touched.testEmail && errors.testEmail}
              placeholder='Tester Email Id'
            />
          </div>
          <div className='form-group col-6'>
            <InputField
              label='Tester Mobile No.'
              name='testMobile'
              value={testMobile}
              onChange={handleChange}
              placeholder='test mobile no.'
              error={touched.testMobile && errors.testMobile}
            />
          </div>
          <div className='form-group col-6'>
            <InputField
              label='Alternative No'
              onChange={handleChange}
              name='testAltNo'
              value={testAltNo}
              placeholder='Alternative No'
              error={touched.testAltNo && errors.testAltNo}
            />
          </div>
          <div className='form-group col-6'>
            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestForm;
