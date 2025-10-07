import { useForm } from 'react-hook-form';
import styles from './index.module.css'



export const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
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
                {errors.userName && <span>{errors.userName.message}</span>}
            </div>
            <div>
                <input type="tel" placeholder="Phone number"
                    id="tel"
                    {...register("tel", {
                        required: "field is madatory",
                        pattern: {
                            value: "0123456789",
                            message: "wrong input.Try again",
                        }

                    })} >
                </input>
                {errors.tel && <span>{errors.tel.message}</span>}
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
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <button type="submit">Get a discount</button>
        </form>
    );
}