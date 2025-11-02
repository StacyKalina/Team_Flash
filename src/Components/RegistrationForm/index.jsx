import { useForm } from "react-hook-form";
import styles from "./index.module.css";
import { FormError } from "./FormError";
import { submitForm, resetFormState } from "../../store/slices/formSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.form);

  const onSubmit = (data) => {
    dispatch(submitForm(data));
  };

  useEffect(() => {
    if (success) {
      reset();
      const timer = setTimeout(() => dispatch(resetFormState()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch, reset]);

  const hasErrors = Object.keys(errors).length > 0;
  const errorMessage = hasErrors ? errors[Object.keys(errors)[0]].message : "";

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} 
    noValidate>
      <div className={styles.field}>
        <input
          className={styles.input}
          placeholder="Name"
          type="text"
          {...register("userName", {
            required: "field is mandatory",
            maxLength: { value: 10, message: "wrong input. Try again" },
            minLength: { value: 3, message: "wrong input. Try again" },
          })}
        />
      </div>

      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          placeholder="Phone number"
          {...register("tel", {
            required: "field is mandatory",
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message: "wrong input. Try again",
            },
          })}
        />
      </div>

      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "field is mandatory",
            pattern: {
              value: /^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u,
              message: "wrong input. Try again",
            },
          })}
        />
      </div>

      {hasErrors && <FormError text={errorMessage} />}
      {error && <p className={styles.error}>❌ {error}</p>}
      {success && <p className={styles.success}>✅ Form sent successfully!</p>}

      <button className={styles.submit} type="submit" disabled={loading}>
        {loading ? "Sending Request" : "Get a discount"}
      </button>
    </form>
  );
};




// export const RegistrationForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const submitHandler = (data) => {
//     console.log(" Form is valid:", data);
//   };

//   const hasErrors = Object.keys(errors).length > 0;
//   const errorMessage = hasErrors ? errors[Object.keys(errors)[0]].message : "";
//    const dispatch = useDispatch();

//   return (
//     <form 
//       className={styles.form} 
//       onSubmit={handleSubmit(submitHandler)} 
//       noValidate
//     >
//       {/* Имя */}
//       <div className={styles.field}>
//         <input
//           className={styles.input}
//           placeholder="Name"
//           type="text"
//           id="userName"
//           {...register("userName", {
//             required: "field is mandatory",
//             maxLength: { value: 10, message: "wrong input. Try again" },
//             minLength: { value: 3, message: "wrong input. Try again" }
//           })}
//         />
//       </div>

//       {/* Телефон */}
//       <div className={styles.field}>
//         <input
//           className={styles.input}
//           type="text" 
//           placeholder="Phone number"
//           id="tel"
//           {...register("tel", {
//             required: "field is mandatory",
//             pattern: {
//               value: /^\+?[1-9]\d{1,14}$/,
//               message: "wrong input. Try again",
//             },
//           })}
//         />
//       </div>

//       {/* Email */}
//       <div className={styles.field}>
//         <input
//           className={styles.input}
//           type="text" // 
//           placeholder="Email"
//           id="email"
//           {...register("email", {
//             required: "field is mandatory",
//             pattern: {
//               //  value: /^[a-zA-Z0-9._%+\-а-яА-Я]+@[a-zA-Z0-9а-яА-Я.-]+\.[a-zA-Zа-яА-Я]{2,}$/u,
//                value: /^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u,
//               message: "wrong input. Try again",
//             },
//           })}
//         />
//       </div>

//       {hasErrors && <FormError text={errorMessage} />}

//       <button className={styles.submit} type="submit">
//         Get a discount
//       </button>
//     </form>
//   );
// };





















