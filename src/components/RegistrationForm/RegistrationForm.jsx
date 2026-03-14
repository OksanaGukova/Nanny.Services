import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import css from './RegistrationForm.module.css';
import { registerUser } from '../../redux/auth/operations';

import sprite from '/svg/icon.svg';
import { ROLES } from '../../constants/constants';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  role: Yup.string().required('Please select a role'),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(registerUser(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        role: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.registerForm} autoComplete="off">
          <div className={css.regDecrciption}>
            <h1 className={css.header}>Registration</h1>
            <p className={css.text}>
              Please provide the following information to create your account.
            </p>
          </div>

          <div className={css.labelContainer}>
            {/* Name */}
            <label className={css.registerLabel}>
              <Field
                type="text"
                name="name"
                className={css.registerInput}
                placeholder="Name"
              />
              <ErrorMessage name="name" component="div" className={css.registerError} />
            </label>

            {/* Email */}
            <label className={css.registerLabel}>
              <Field
                type="email"
                name="email"
                className={css.registerInput}
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className={css.registerError} />
            </label>

            {/* Password */}
            <label className={`${css.registerLabel} ${css.loginInputWrapper}`}>
              <Field
                type="password"
                name="password"
                className={css.registerInput}
                placeholder="Password"
              />
              <svg className={css.eyeIcon}>
                <use href={`${sprite}#icon-eye-off`} />
              </svg>
              <ErrorMessage
                name="password"
                component="div"
                className={css.registerError}
              />
            </label>

            {/* Role Select */}
            <label className={css.registerLabel}>
              <Field as="select" name="role" className={css.registerInput}>
                <option value="">Select role</option>
                <option value={ROLES.PARENT}>Parent</option>
                <option value={ROLES.NANNY}>Nanny</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className={css.registerError}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`${css.registerButton} ${
              isSubmitting ? css.registerButtonDisabled : ''
            }`}
          >
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
}