import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { testValidation } from "../components/Validations";
import { InputField, InputSelect } from "../components/InputField";
import { ListOptions } from "../components/ListOptions";

const EditForm = () => {
  const [savedTests, setSavedTests] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const testIndex = location.state.index;
  const testToEdit = savedTests[testIndex];

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
      const updatedTests = [...savedTests];
      const updatedTest = { ...updatedTests[testIndex] };

      updatedTest.testName = values.testName;
      updatedTest.testType = values.testType;
      updatedTest.testEmail = values.testEmail;
      updatedTest.testMobile = values.testMobile;
      updatedTest.testAltNo = values.testAltNo;
      updatedTest.updationDate = new Date().toISOString();

      updatedTests[testIndex] = updatedTest;

      localStorage.setItem("savedTests", JSON.stringify(updatedTests));
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

  useEffect(() => {
    const tests = JSON.parse(localStorage.getItem("savedTests")) || [];
    setSavedTests(tests);
  }, []);

  useEffect(() => {
    if (testToEdit) {
      formik.setValues({
        testName: testToEdit.testName,
        testType: testToEdit.testType,
        testEmail: testToEdit.testEmail,
        testMobile: testToEdit.testMobile,
        testAltNo: testToEdit.testAltNo,
      });
    }
  }, [testToEdit]);

  return (
    <div className='container'>
      <h1>Edit Test</h1>
      <form onSubmit={handleSubmit}>
        <div className='row text-start'>
          <div className='form-group  col-6'>
            <InputField
              label='Test Name'
              name='testName'
              value={testName}
              onChange={handleChange}
              onBlur={handleBlur}
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
              onBlur={handleBlur}
              error={touched.testType && errors.testType}
              placeholder='Test Type'
            />
          </div>
          <div className='form-group col-6'>
            <InputField
              label='Tester Email Id'
              name='testEmail'
              value={testEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.testName && errors.testName}
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
              onBlur={handleBlur}
              error={touched.testName && errors.testName}
            />
          </div>
          <div className='form-group col-6'>
            <InputField
              label='Alternative No'
              onChange={handleChange}
              name='testAltNo'
              value={testAltNo}
              placeholder='Alternative No'
              onBlur={handleBlur}
              error={touched.testName && errors.testName}
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

export default EditForm;
