import React, { FC, memo } from "react";
import { QuestionData } from "../../assets/DSA_450data";
import Card from "../../components/Card";

interface Props {}

const Topics: FC<Props> = (props) => {
  return (
    <div className="grid grid-cols-12 col-span-4 m-10">
      {QuestionData.map((data) => {
        return (
          <Card title={data.topicName} questions={data.questions.length} />
        );
      })}
    </div>
  );
};

Topics.defaultProps = {};

export default memo(Topics);
