import React, { useState, useEffect, useRef, HTMLAttributes } from "react";
import withStyles, { WithStyles } from "react-jss";
import classNames from "classnames";

export type ItemType = string;

const styles = {
  root: {
    width: 48,
    height: 48,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid black",
    transition: "transform 200ms, box-shadow 200ms, background-color 200ms"
  },
  pressable: {
    boxShadow: "10px 10px 10px 0px #a3a3a3ff",
    "&:hover": {
      backgroundColor: "#b8b8b8"
    }
  },
  pressed: {
    transform: "scale(0.9,0.9)",
    boxShadow: "6px 6px 5px -1px #a3a3a3ff"
  },
  large: {
    width: 96,
    height: 96
  }
};

interface Props
  extends React.PropsWithChildren<HTMLAttributes<HTMLButtonElement>>,
    WithStyles<typeof styles> {
  large?: boolean;
  onClick?: () => any;
  pressable?: boolean;
}

function Item(props: Props) {
  const {
    classes,
    children,
    className,
    onClick,
    large,
    pressable,
    ...rest
  } = props;

  const buttonEl = useRef<HTMLButtonElement>(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onMousePress = () => {
      setPressed(true);
      document.addEventListener("mouseup", function onRelease() {
        onClick && onClick();
        document.removeEventListener("mouseup", onRelease);
        setPressed(false);
      });
    };

    const onSpacePress = (e: KeyboardEvent) => {
      if (e.code === "Space" && !pressed && !e.repeat) {
        setPressed(true);
        document.addEventListener("keyup", function onRelease(
          e: KeyboardEvent
        ) {
          if (e.code === "Space") {
            onClick && onClick();
            document.removeEventListener("keyup", onRelease);
            setPressed(false);
          }
        });
      }
    };

    buttonEl.current &&
      onClick &&
      buttonEl.current.addEventListener("mousedown", onMousePress);
    buttonEl.current &&
      onClick &&
      buttonEl.current.addEventListener("keydown", onSpacePress);
  }, []);

  return (
    <button
      className={classNames(classes.root, className, {
        [classes.pressable]: pressable,
        [classes.pressed]: pressable && pressed,
        [classes.large]: large
      })}
      ref={buttonEl}
      {...rest}>
      {children}
    </button>
  );
}

export default React.memo(withStyles(styles)(Item));
