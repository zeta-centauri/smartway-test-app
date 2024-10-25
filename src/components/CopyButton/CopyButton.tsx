import "./CopyButton.css";
import copy from "clipboard-copy";

const CopyButton = ({ toCopy }: { toCopy: string }) => {
  const handleClick = () => {
    copy(toCopy);
  };

  return (
    <button className="link-button" onClick={handleClick}>
      <img src={`${import.meta.env.BASE_URL}svg/link.svg`} alt="" />
    </button>
  );
};

export default CopyButton;
