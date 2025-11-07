import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { FormError } from "./FormError";
import { resetFormState, submitForm } from "../../store/slices/formSlice";

const VALIDATION_MESSAGES = {
  nameRequired: "Name is required",
  nameLength: "Use 2-40 letters",
  namePattern: "Letters, spaces, apostrophes only",
  phoneRequired: "Phone number is required",
  phonePattern: "Enter a valid phone number",
  emailRequired: "Email is required",
  emailPattern: "Enter a valid email address",
};

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.form);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      userName: "",
      tel: "",
      email: "",
    },
  });

  useEffect(() => {
    if (success) {
      reset();
      const timer = setTimeout(() => dispatch(resetFormState()), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [success, dispatch, reset]);

  const onSubmit = async (data) => {
    await dispatch(submitForm(data));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <input
          className={`${styles.input} ${errors.userName ? styles.inputError : ""}`}
          placeholder="Name"
          type="text"
          aria-invalid={Boolean(errors.userName)}
          aria-describedby={errors.userName ? "discount-name-error" : undefined}
          {...register("userName", {
            required: VALIDATION_MESSAGES.nameRequired,
            minLength: { value: 2, message: VALIDATION_MESSAGES.nameLength },
            maxLength: { value: 40, message: VALIDATION_MESSAGES.nameLength },
            pattern: {
              value: /^[\p{L}' -]+$/u,
              message: VALIDATION_MESSAGES.namePattern,
            },
          })}
        />
        {errors.userName && (
          <FormError
            id="discount-name-error"
            className={styles.fieldError}
            text={errors.userName.message}
          />
        )}
      </div>

      <div className={styles.field}>
        <input
          className={`${styles.input} ${errors.tel ? styles.inputError : ""}`}
          type="tel"
          placeholder="Phone number"
          aria-invalid={Boolean(errors.tel)}
          aria-describedby={errors.tel ? "discount-phone-error" : undefined}
          {...register("tel", {
            required: VALIDATION_MESSAGES.phoneRequired,
            pattern: {
              value: /^\+?[0-9\s\-()]{7,}$/u,
              message: VALIDATION_MESSAGES.phonePattern,
            },
          })}
        />
        {errors.tel && (
          <FormError
            id="discount-phone-error"
            className={styles.fieldError}
            text={errors.tel.message}
          />
        )}
      </div>

      <div className={styles.field}>
        <input
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          type="email"
          placeholder="Email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "discount-email-error" : undefined}
          {...register("email", {
            required: VALIDATION_MESSAGES.emailRequired,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u,
              message: VALIDATION_MESSAGES.emailPattern,
            },
          })}
        />
        {errors.email && (
          <FormError
            id="discount-email-error"
            className={styles.fieldError}
            text={errors.email.message}
          />
        )}
      </div>

      {error && (
        <p
          className={`${styles.statusMessage} ${styles.statusMessageError}`}
          role="alert"
        >
          {error}
        </p>
      )}

      {success && (
        <p className={styles.statusMessage} role="status">
          Form sent successfully!
        </p>
      )}

      <button className={styles.submit} type="submit" disabled={loading}>
        {loading ? "Sending Request" : "Get a discount"}
      </button>
    </form>
  );
};
