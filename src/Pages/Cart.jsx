import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
     incrementItem,
     decrementItem,
     removeItem,
     clearCart,
} from "../store/slices/cartSlice";
import closeIcon from "../Images/icons/ic-x.svg";
import styles from "./Cart.module.css";
import { Modal } from "../Components/Modal/Modal.jsx";


const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        useGrouping: false,
    }).format(value);

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
     const linePrice = item.price * item.quantity;
     const lineOldPrice =
          typeof item.oldPrice === "number"
               ? item.oldPrice * item.quantity
               : undefined;
     const isDecreaseDisabled = item.quantity <= 1;




     return (
          <article className={styles.cartItem}>
               <div className={styles.itemImageWrapper}>
                    {item.imageSrc ? (
                         <img
                              src={item.imageSrc}
                              alt={item.title}
                              className={styles.itemImage}
                         />
                    ) : (
                         <div className={styles.itemImageFallback} aria-hidden="true">
                              {item.title ? item.title.charAt(0).toUpperCase() : ""}
                         </div>
                    )}
               </div>

               <div className={styles.itemBody}>
                    <div className={styles.itemHeader}>
                         <h2 className={styles.itemTitle}>{item.title}</h2>
                         <button
                              type="button"
                              className={styles.removeButton}
                              onClick={() => onRemove(item.id)}
                              aria-label={`Remove ${item.title} from cart`}
                         >
                              <img
                                   src={closeIcon}
                                   alt=""
                                   aria-hidden="true"
                                   className={styles.removeIcon}
                              />
                         </button>
                    </div>

                    <div className={styles.itemFooter}>
                         <div
                              className={styles.quantityControl}
                              role="group"
                              aria-label={`Change quantity for ${item.title}`}
                         >
                              <button
                                   type="button"
                                   className={styles.quantityButton}
                                   onClick={() => onDecrement(item.id)}
                                   disabled={isDecreaseDisabled}
                                   aria-label={`Decrease quantity of ${item.title}`}
                              >
                                   <span
                                        className={styles.quantityIcon}
                                        aria-hidden="true"
                                   >
                                        <svg
                                             width="24"
                                             height="24"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                        >
                                             <path
                                                  d="M4 12H20"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                             />
                                        </svg>
                                   </span>
                              </button>
                              <span className={styles.quantityValue}>{item.quantity}</span>
                              <button
                                   type="button"
                                   className={styles.quantityButton}
                                   onClick={() => onIncrement(item.id)}
                                   aria-label={`Increase quantity of ${item.title}`}
                              >
                                   <span
                                        className={styles.quantityIcon}
                                        aria-hidden="true"
                                   >
                                        <svg
                                             width="24"
                                             height="24"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                        >
                                             <path
                                                  d="M4 12H20"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                             />
                                             <path
                                                  d="M12 4V20"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                             />
                                        </svg>
                                   </span>
                              </button>
                         </div>

                         <div className={styles.priceBlock}>
                              <span className={styles.currentPrice}>
                                   {formatCurrency(linePrice)}
                              </span>
                              {lineOldPrice ? (
                                   <span className={styles.oldPrice}>
                                        {formatCurrency(lineOldPrice)}
                                   </span>
                              ) : null}
                         </div>
                    </div>
               </div>
          </article>
     );
};

export const Cart = () => {
     const dispatch = useDispatch();
     const { items, totalItems, totalPrice } = useSelector((state) => state.cart);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const {
          register,
          handleSubmit,
          reset,
          formState: { errors, isSubmitting, isSubmitSuccessful },
     } = useForm({
          mode: "onBlur",
          defaultValues: {
               name: "",
               phone: "",
               email: "",
          },
     });
     const [submitMessage, setSubmitMessage] = useState(null);

     const hasItems = items.length > 0;

     return (
          <>

               <section className={styles.cartPage}>
                    <header className={styles.header}>
                         <h1 className={styles.title}>Shopping cart</h1>
                         <span className={styles.headerDivider} aria-hidden="true" />
                         <Link to="/" className={styles.backLink}>
                              Back to the store
                         </Link>
                    </header>

                    <div className={styles.content}>
                         <div className={styles.itemsColumn}>
                              {hasItems ? (
                                   items.map((item) => (
                                        <CartItem
                                             key={item.id}
                                             item={item}
                                             onIncrement={(id, amount = 1) =>
                                                  dispatch(incrementItem({ id, amount }))
                                             }
                                             onDecrement={(id, amount = 1) =>
                                                  dispatch(decrementItem({ id, amount }))
                                             }
                                             onRemove={(id) => dispatch(removeItem(id))}
                                        />
                                   ))
                              ) : (
                                   <p className={styles.emptyState}>Your cart is empty.</p>
                              )}
                         </div>
                         <aside className={styles.summaryColumn}>
                              <form
                                   className={styles.summaryCard}
                                   onSubmit={handleSubmit((data) => {
                                        const payload = {
                                             customer: data,
                                             cart: {
                                                  totalItems,
                                                  totalPrice,
                                                  items,
                                             },
                                        };
                                        console.log("Order submission", payload);
                                        setSubmitMessage("Thank you! We will contact you soon.");
                                        dispatch(clearCart());
                                        reset();
                                        setIsModalOpen(true);
                                   })}
                              >
                                   <div className={styles.summaryTop}>
                                        <h2 className={styles.summaryTitle}>Order details</h2>
                                        <p className={styles.summaryItems}>
                                             {totalItems} {totalItems === 1 ? "item" : "items"}
                                        </p>
                                        <div className={styles.summaryRow}>
                                             <span className={styles.summaryLabel}>Total</span>
                                             <span className={styles.summaryTotal}>
                                                  {formatCurrency(totalPrice)}
                                             </span>
                                        </div>
                                   </div>

                                   <div className={styles.summaryInputs}>
                                        <label className={styles.summaryField}>
                                             <input
                                                  type="text"
                                                  placeholder="Name"
                                                  className={`${styles.summaryInput} ${errors.name ? styles.summaryInputError : ""
                                                       }`}
                                                  {...register("name", {
                                                       required: "Name is required",
                                                       minLength: {
                                                            value: 2,
                                                            message: "Enter at least 2 characters",
                                                       },
                                                  })}
                                             />
                                             {errors.name && (
                                                  <span className={styles.summaryError}>
                                                       {errors.name.message}
                                                  </span>
                                             )}
                                        </label>

                                        <label className={styles.summaryField}>
                                             <input
                                                  type="tel"
                                                  placeholder="Phone number"
                                                  className={`${styles.summaryInput} ${errors.phone ? styles.summaryInputError : ""
                                                       }`}
                                                  {...register("phone", {
                                                       required: "Phone number is required",
                                                       pattern: {
                                                            value: /^\+?[0-9\s\-()]{7,}$/u,
                                                            message: "Enter a valid phone number",
                                                       },
                                                  })}
                                             />
                                             {errors.phone && (
                                                  <span className={styles.summaryError}>
                                                       {errors.phone.message}
                                                  </span>
                                             )}
                                        </label>

                                        <label className={styles.summaryField}>
                                             <input
                                                  type="email"
                                                  placeholder="Email"
                                                  className={`${styles.summaryInput} ${errors.email ? styles.summaryInputError : ""
                                                       }`}
                                                  {...register("email", {
                                                       required: "Email is required",
                                                       pattern: {
                                                            value:
                                                                 /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u,
                                                            message: "Enter a valid email address",
                                                       },
                                                  })}
                                             />
                                             {errors.email && (
                                                  <span className={styles.summaryError}>
                                                       {errors.email.message}
                                                  </span>
                                             )}
                                        </label>
                                   </div>

                                   <button
                                        type="submit"
                                        className={styles.summaryButton}
                                        disabled={totalItems === 0 || isSubmitting}
                                   >
                                        Order
                                   </button>

                                   {/* {submitMessage && isSubmitSuccessful && (
                                        <p className={styles.summaryMessage}>{submitMessage}</p>
                                   )} */}
                              </form>
                         </aside>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

                         <div className={styles.modalContent}>
                              <h2>Congratulations! </h2>
                              <p>Your order has been successfully placed on the website.</p>
                              <p>A manager will contact you shortly to confirm your order.</p>
                         </div>
                    </Modal>
               </section>


          </>

     );
};

export default Cart;
