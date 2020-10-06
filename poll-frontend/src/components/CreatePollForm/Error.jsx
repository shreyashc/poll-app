import React from "react";

function Error(props) {
   if (props.children instanceof Array) {
      return <div className="error">options can't be empty</div>;
   } else {
      return <div className="error">{props.children}</div>;
   }
}
export default Error;
