import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const RegisterForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleRegisterAndPay = () => {
    // Redirect to the Stripe payment link
    window.location.href = 'https://buy.stripe.com/test_8wMaH07eA1mxcjCbII?prefilled_email=customer@example.com';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
        console.error("CardElement is not found");
        return;
      }
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      // Send payment method ID and user details to your backend
      const response = await axios.post('/register', {
        email: 'user@example.com',
        password: 'password1234',
        username: 'exampleuser',
        payment_method_id: paymentMethod.id,
        amount: 5000, // $50.00 in cents
      });

      if (response.data.error) {
        console.error(response.data.error);
      } else {
        console.log('Registration and payment successful');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <a className="read-article" href="https://buy.stripe.com/test_8wMaH07eA1mxcjCbII?prefilled_email=customer@example.com">pay</a>
      </form>
  );
};

export default RegisterForm;