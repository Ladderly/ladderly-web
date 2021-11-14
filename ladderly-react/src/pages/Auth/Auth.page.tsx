import React, { FC, memo } from "react";


interface Props {
}

const Auth: FC<Props> = (props) => {
    return (
       <div>
            Auth
       </div>
   );
}


Auth.defaultProps = {
}

export default memo(Auth);