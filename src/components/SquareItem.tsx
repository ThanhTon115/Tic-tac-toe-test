export type SquareItemType = {
  onClick?: () => void;
  value: number | string;
};
const SquareItem = (props: SquareItemType) => {
  const { onClick, value } = props;
  const handleClick = () => {
    if (typeof onClick === "function") {
      void onClick();
    }
  };
  return (
    <button
      className="md:w-36 md:h-36 w-16 h-16 border-2 border-gray-400 md:text-6xl text-2xl"
      onClick={() => handleClick()}
    >
      {value}
    </button>
  );
};
export default SquareItem;
