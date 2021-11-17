import { ButtonHTMLAttributes, FC } from "react";
import { memo } from "react";
import { ImSpinner8 } from "react-icons/im";
import { AiFillLock } from "react-icons/ai";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "outline" | "fill" | "warning";
  children: string;
  loading?: boolean;
}

const Button: FC<Props> = ({
  theme,
  loading,
  children,
  className,
  disabled,
  ...rest
}) => {
  const themeClasses =
    theme === "fill"
      ? "bg-secondary-200 text-white hover:bg-secondary-300 border border-secondary-200 "
      : theme === "outline"
      ? "hover:text-white hover:bg-secondary-200 text-secondary-200 border border-secondary-200 "
      : "bg-red-500 text-white hover:bg-red-600 border border-red-500 ";
  return (
    <>
      <button
        {...rest}
        disabled={disabled}
        className={
          "rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wider " +
          themeClasses +
          className
        }
      >
        {!loading && !disabled ? (
          children
        ) : loading ? (
          <ImSpinner8 className="w-4 h-4 mx-auto animate-spin" />
        ) : (
          <AiFillLock className="w-5 h-5 mx-auto " />
        )}
      </button>
    </>
  );
};
Button.defaultProps = {
  theme: "fill",
  loading: false,
};
export default memo(Button);
