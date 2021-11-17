import React, { FC, memo } from "react";
import { QuestionData } from "../../assets/DSA_450data";
import Card from "../../components/Card";

interface Props {}

const Topics: FC<Props> = (props) => {
  return (
    <div className="grid grid-cols-12 sm:space-x-0 gap-2 sm:gap-4 p-5 sm:p-3">
      {QuestionData.map((data) => {
        return (
          <Card title={data.topicName} questions={data.questions.length} className="rounded-md col-span-12 sm:col-span-6  lg:col-span-4 w-full" />
        );
      })}
    </div>
  );
};

Topics.defaultProps = {};

export default memo(Topics);
