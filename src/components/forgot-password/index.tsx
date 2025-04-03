import ForgotPassword from "./single-components/ForgotPassword";
import ForgotPasswordHeader from "./single-components/ForgotPasswordHeader";

const ForgotPasswordIndex: React.FC = () => {
  return (
    <>
      <ForgotPasswordHeader links="login" />
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordIndex;
