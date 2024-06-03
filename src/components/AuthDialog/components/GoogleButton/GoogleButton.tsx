import { useRef, useEffect } from "react";

const GoogleButton = () => {
  const googleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (googleRef.current) {
      google.accounts.id.renderButton(googleRef.current, {
        theme: "filled_blue",
        size: "medium",
        shape: "pill",
        type: "standard",
        text: "continue_with",
        width: 150,
      });
    }
  }, []);
  return <div ref={googleRef}></div>;
};

export default GoogleButton;
