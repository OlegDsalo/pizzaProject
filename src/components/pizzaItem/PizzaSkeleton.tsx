import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="132" cy="124" r="124" />
    <rect x="0" y="261" rx="11" ry="11" width="280" height="25" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="431" rx="13" ry="13" width="95" height="30" />
    <rect x="148" y="425" rx="25" ry="25" width="155" height="45" />
  </ContentLoader>
)
export default PizzaSkeleton;
