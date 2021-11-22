import React, { FC, ImgHTMLAttributes, memo } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  size: "small" | "medium" | "large";
  alt: string;
}

const Avatar: FC<Props> = ({ src, alt, size, ...rest }) => {
  let imageSize: string = "";
  if (size === "small") {
    imageSize = "w-10 h-10";
  } else if (size === "medium") {
    imageSize = "w-20 h-20";
  } else {
    imageSize = "w-40 h-40";
  }
  return (
    <div>
      <img
        className={"rounded-full object-cover " + imageSize}
        {...rest}
        src={src}
        alt={alt}
      />
    </div>
  );
};

Avatar.defaultProps = {};

export default memo(Avatar);
