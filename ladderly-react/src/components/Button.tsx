import { ButtonHTMLAttributes, FC } from 'react'
import  {memo} from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
  theme?: 'primary'|'secondary';
  children: string;
}

const Button: FC<Props> = ({theme, children, className, ...rest}) => {
   const themeClasses = theme === "primary" ? "bg-secondary text-white" : "hover:text-skytext  border-black md:border-2";
 return(
    <div>
      <button 
         {...rest} 
         className={"rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wider " + themeClasses + " " + className}>
         {children}
      </button>
    </div>
 );
};
Button.defaultProps = {
   theme: 'primary',
}
export default memo(Button);