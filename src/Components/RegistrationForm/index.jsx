import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { FormError } from "./FormError";

const NAME_PATTERN = /^[A-Za-z\u0410-\u044F\u0401\u0451\s'-]{2,40}$/u;
const PHONE_PATTERN = /^\+?[0-9]{7,14}$/;
const EMAIL_PATTERN = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


const ERROR_MESSAGES = {
  required: "Field is mandatory",
  name: "Please enter 2-40 letters",
  phone: "Use digits only, optionally starting with +",
  email: "Please enter a valid email (example@mail.com)",
};

const simulateRequest = (payload) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.info("Mock registration payload sent:", payload);
      resolve({ ok: true });
    }, 1200);
  });

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [submissionError, setSubmissionError] = useState("");
  const resetTimerRef = useRef(null);

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    []
  );

  // CHANGE: один общий текст ошибки (первый встретившийся)
  const firstFieldErrorText =
    errors.userName?.message ||
    errors.tel?.message ||
    errors.email?.message ||
    "";

  const submitHandler = async (data) => {
    setSubmissionError("");
    setStatus("loading");
    try {
      await simulateRequest(data);
      setStatus("success");
      reset();
    } catch (error) {
      setSubmissionError("Something went wrong, please try again later.");
      setStatus("error");
    } finally {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submitHandler)}
      noValidate
      aria-busy={status === "loading"}
    >
      <div className={styles.field}>
        <input
          className={styles.input}
          placeholder="Name"
          type="text"
          id="userName"
          aria-invalid={errors.userName ? "true" : "false"}
          aria-errormessage={errors.userName ? "form-field-error" : undefined} // CHANGE
          {...register("userName", {
            required: ERROR_MESSAGES.required,
            pattern: { value: NAME_PATTERN, message: ERROR_MESSAGES.name },
          })}
        />
      </div>

      <div className={styles.field}>
        <input
          className={styles.input}
          type="tel"
          placeholder="Phone number"
          id="tel"
          aria-invalid={errors.tel ? "true" : "false"}
          aria-errormessage={errors.tel ? "form-field-error" : undefined} // CHANGE
          {...register("tel", {
            required: ERROR_MESSAGES.required,
            pattern: { value: PHONE_PATTERN, message: ERROR_MESSAGES.phone },
          })}
        />
      </div>

      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          id="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-errormessage={errors.email ? "form-field-error" : undefined} // CHANGE
          {...register("email", {
            required: ERROR_MESSAGES.required,
            pattern: { value: EMAIL_PATTERN, message: ERROR_MESSAGES.email },
          })}
        />
      </div>

      {/* CHANGE: показываем ошибку только если она есть */}
      {firstFieldErrorText && (
        <FormError id="form-field-error" text={firstFieldErrorText} />
      )}

      {/* серверная/сетевой фидбек и успех — ниже */}
      {submissionError && (
        <p className={`${styles.statusMessage} ${styles.statusMessageError}`}>
          {submissionError}
        </p>
      )}

      {status === "success" && !submissionError && (
        <p className={styles.statusMessage}>
          Thanks! We will contact you as soon as possible.
        </p>
      )}

      <button
        className={styles.submit}
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Get a discount"}
      </button>
    </form>
  );
};
