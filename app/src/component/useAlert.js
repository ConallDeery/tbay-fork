import { useState } from "react";
import { Alert as AlertMaterial } from "@mui/lab";

export const useAlert = () => {
  const [isVisible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const showMessage = () => setVisible(true);
  const hideMessage = () => setVisible(false);

  const getProps = ({ variant, message }) => {
    console.log(variant, message);
    setVariant(variant);
    setMessage(message);
    showMessage();
  };

  const AlertMessage = () => {
    return (
      <AlertMaterial onClose={hideMessage} severity={variant}>
        {message}
      </AlertMaterial>
    );
  };

  return [AlertMessage, isVisible, getProps];
};