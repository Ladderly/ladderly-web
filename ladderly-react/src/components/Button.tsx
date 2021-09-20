import { ButtonHTMLAttributes, FC } from "react";
import { memo } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "outline" | "fill";
  children: string;
}

const Button: FC<Props> = ({ theme, children, className, ...rest }) => {
  const themeClasses =
    theme === "fill"
      ? "bg-secondary-500 text-white hover:bg-secondary-300"
      : "hover:text-secondary-500  border-black md:border-1";
  return (
    <button
      {...rest}
      className={
        "rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wider " +
        themeClasses +
        " " +
        className
      }
    >
      {children}
    </button>
  );
};
Button.defaultProps = {
  theme: "fill",
};
export default memo(Button);
