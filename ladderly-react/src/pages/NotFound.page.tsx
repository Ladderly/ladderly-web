import React, { FC, memo } from "react";


interface Props {
}

const NotFound: FC<Props> = (props) => {
    return (
       <div>
            Sorry, page not found.
       </div>
   );
}


NotFound.defaultProps = {
}

export default memo(NotFound);