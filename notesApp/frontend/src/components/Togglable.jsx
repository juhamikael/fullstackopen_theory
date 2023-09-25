import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const Togglable = forwardRef(({ buttonLabel, children, user }, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className={`${!user && "-my-10"}`}>
      <div style={hideWhenVisible}>
        <Button
          className={`${user && "w-full"}`}
          onClick={() => toggleVisibility()}
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <Button
          className={cn("w-full mb-4")}
          onClick={() => toggleVisibility()}
        >
          Cancel
        </Button>
        {children}
      </div>
    </div>
  );
});

export default Togglable;
