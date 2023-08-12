import * as Yup from "yup";

export const testValidation = Yup.object({
  testName: Yup.string().required("This field can't be Empty"),
  testType: Yup.object().shape({
    value: Yup.string().required("Type name is required"),
    label: Yup.string().required("Type category is required"),
  }),
  testEmail: Yup.string().email("please enter a valid email").required("This field can't be Empty"),

  testMobile: Yup.string()
    .matches(/^\d{10}$/, "Must be exactly 10 digits")
    .typeError("value should be number")
    .required("This field can't be empty"),
  testAltNo: Yup.string()
    .matches(/^\d{10}$/, "Must be exactly 10 digits")
    .typeError("value should be number")
    .required("This field can't be empty")
    .test("not-same-as-mobile", "Alternate number cannot be the same as mobile number", function (value) {
      return value !== this.parent.testMobile;
    }),
});
