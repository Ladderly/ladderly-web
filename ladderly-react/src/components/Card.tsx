import React, { FC, memo } from "react";
import Button from "./Button";


interface Props {
    title: string
    questions: number
}

const Card: FC<Props> = ({title, questions}) => {
 return (
 <div className="p-4 border-solid border-gray-100 rounded border-4 w-1/4 hover:shadow-lg duration-100">
    <div className="text-center font-bold text-xl">{title}</div> 
    <div className="text-center">{questions + " Questions"}</div>
    <Button className="flex justify-center mt-10">Start</Button>
 </div>
 );
}


Card.defaultProps = {
}

export default memo(Card);