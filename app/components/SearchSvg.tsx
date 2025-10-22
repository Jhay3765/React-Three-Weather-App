import * as React from "react";
const SearchSvg = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 512 512"
    className="text-white"
    {...props}
  >
    <title>{"ionicons-v5-f"}</title>
    <path
      d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z"
      style={{
        fill: "none",
        stroke: "currentcolor",
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
    <path
      d="M338.29 338.29 448 448"
      style={{
        fill: "none",
        stroke: "currentcolor",
        strokeLinecap: "round",
        strokeMiterlimit: 10,
        strokeWidth: 32,
      }}
    />
  </svg>
);
export default SearchSvg;
