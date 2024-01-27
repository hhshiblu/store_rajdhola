import React from "react";

function page({ params }) {
  console.log(params.id);
  return <div>page</div>;
}

export default page;
