import { useForm } from 'react-hook-form';
import styles from './index.module.css';
//import { FormError } from './FormError';

export const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitHandler = (data) => {
        console.log(data);
        console.log(errors);
        //   fetch('https://adress', {
        //     method:'POST',
        //     body:JSON.stringify(data)  
        //   })
        console.log("submit!");
    };
    //const hasErrors = Object.keys(errors).length;
    //let ErrorComponent = null;
    //if (hasErrors>0) {
    //   console.log("Form has errors:", errors);
    //   ErrorComponent = <FormError text={errors[Object.keys(errors)[0]].message} />;
    //}

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
                            message: "max 10 characters allowed"
                        },
                        minLength: {
                            value: 3,
                            message: "username  should be more than 3 characters"
                        }

                    })} >
                </input>
                {/*errors.userName && <FormError text={errors.userName.message}></FormError>*/}
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
                            value: "",
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
                            value: "",
                            message: "wrong input.Try again"
                        }

                    })} >
                </input>
               {/*errors.email && <FormError text={errors.email.message}></FormError>*/}
            </div>
            {/* {<ErrorComponent/>} */}
            <button type="submit" >Get a discount</button>
        </form>
    );
}