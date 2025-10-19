import { useForm } from 'react-hook-form';
import styles from "./index.module.css";
import { FormError } from './FormError';

export const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitHandler = (data) => {
        console.log(data);
        console.log(errors);
        //dispatch(sendForm(data));
        //   fetch('https://localhost:3333/sale/send', {
        //     method:'POST',
        //     body:JSON.stringify(data)  
        //   })
        console.log("submit!");
    };
    const hasErrors = Object.keys(errors).length > 0;
let errorMessage = "";
if (hasErrors) {
  console.log("Form has errors:", errors);
    
  errorMessage = errors[Object.keys(errors)[0]].message;
  } else {
  console.log("Form is valid");
}
    
    return (
        <form onSubmit={handleSubmit(submitHandler)} >
            <div>
                <input placeholder="Name"
                    type="text"
                    id="userName"

                    {...register("userName", {
                        required: "field is mandatory",
                        maxLength: {
                            value: 10,
                            //  message: "max 10 characters allowed"
                            message: "wrong input.Try again"
                        },
                        minLength: {
                            value: 3,
                            message: "wrong input.Try again"
                          //    message: "username  should be more than 3 characters"
                        }

                    })} >
                </input>
                {/*errors.userName && <FormError text={errors.userName.message}></FormError>*/}
                {/*errors.userName && <span>{errors.userName.message}</span>*/}
            </div>
            <div>
                <input type="tel" placeholder="Phone number"
                    id="tel"
                    {...register("tel", {
                        // validate: (value) => {
                        //     if (value. includes ("+49")) { return true;}
                        // else { return "phone number should include +49";}
                        required: "field is mandatory",
                        pattern: {
                            value: /^\+?[1-9]\d{1,14}$/,
                            message: "wrong input.Try again"
                        }

                    })} >
                </input>
                {/*errors.tel && <FormError text={errors.tel.message}></FormError>*/}
            </div>
            <div>
                <input type="email" placeholder="email"
                    id="email"
                    
                    {...register("email", {
                        required: "field is mandatory",
                        pattern: {
                           /* value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,*/
                             message: "wrong input.Try again"
                        }

                    })} >
                </input>
                {/*errors.email && <FormError text={errors.email.message}></FormError>*/}
            
                    
    </div>
           {hasErrors && <FormError text={errorMessage} />}
                         
            <button type="submit" >Get a discount</button>
        </form>
    );
}

  
   
