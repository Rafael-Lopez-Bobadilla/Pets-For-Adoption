type Props = {
  color: "white" | "gray";
  width: string;
};
const UserIcon = ({ color, width }: Props) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        {" "}
        <circle cx="12" cy="6" r="4" fill={color} />{" "}
        <path
          d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
          fill={color === "gray" ? "#d3d3d3" : "white"}
        />{" "}
      </g>
    </svg>
  );
};

export default UserIcon;
