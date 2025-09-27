import { ErrorMessage, Field, Form, Formik } from 'formik'
import css from './RegistrationForm.module.css'
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';
import sprite from '../../public/svg/icon.svg'


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function RegistrationForm () {
    const dispatch = useDispatch();

const handleSubmit = (values, actions) => {
   console.log(values);
  dispatch(registerUser(values)); // <-- ВСІ поля!
  actions.resetForm();
};

    return (
         <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.registerForm} autoComplete="off">
            <div className={css.regDecrciption}>
              <h1 className={css.header}>Registration</h1>
              <p className={css.text}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>
            </div>
          <div className={css.labelContainer}>
            <label className={css.registerLabel}>
              <Field type="text" name="name" className={css.registerInput} placeholder="Name"/>
              <ErrorMessage
                name="name"
                component="div"
                className={css.registerError}
              />
            </label>
            <label className={css.registerLabel}>
              <Field type="email" name="email" className={css.registerInput} placeholder="Email"/>
              <ErrorMessage
                name="email"
                component="div"
                className={css.registerError}
              />
            </label>
            <label className={`${css.registerLabel} ${css.loginInputWrapper}`}>
              <Field
                type="password"
                name="password"
                className={css.registerInput}
                placeholder ='Password' 
              />
               <svg className={css.eyeIcon }>  <use href={`${sprite}#icon-eye-off`}></use></svg>
              <ErrorMessage
                name="password"
                component="div"
                className={css.registerError}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${css.registerButton} ${
              isSubmitting ? css.registerButtonDisabled : ""
            }`}
          >
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
    )
}