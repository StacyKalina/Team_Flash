import { useForm } from 'react-hook-form';
import styles from './index.module.css';
import { FormError } from './FormError';

export const RegistrationForm = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm();

  const submitHandler = (data) => {
    console.log(data);
    console.log("submit!");
  };

  const hasErrors = Object.keys(errors).length > 0;
  let errorMessage = "";
  if (hasErrors) {
    errorMessage = errors[Object.keys(errors)[0]].message;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}> 
      <div className={styles.field}> 
        <input
          className={styles.input}  
          placeholder="Name"
          type="text"
          id="userName"
          {...register("userName", {
            required: "field is mandatory",
            maxLength: { value: 10, message: "wrong input.Try again" },
            minLength: { value: 3,  message: "wrong input.Try again" }
          })}
        />
      </div>

      <div className={styles.field}> 
        <input
          className={styles.input}    
          type="tel"
          placeholder="Phone number"
          id="tel"
          {...register("tel", {
            required: "field is mandatory",
            pattern: { value: /^\+?[1-9]\d{1,14}$/, message: "wrong input.Try again" }
          })}
        />
      </div>

      <div className={styles.field}> 
        <input
          className={styles.input}    
          type="email"
          placeholder="Email"
          id="email"
          {...register("email", {
            required: "field is mandatory",
            pattern: {
              // value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "wrong input.Try again"
            }
          })}
        />
      </div>

      {hasErrors && <FormError text={errorMessage} />}

      <button className={styles.submit} type="submit">Get a discount</button> 
    </form>
  );
};
