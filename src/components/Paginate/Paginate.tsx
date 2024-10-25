import { observer } from "mobx-react-lite";
import "./Paginate.css";

interface PaginateProps {
  onClickPrev: () => void;
  onClickNext: () => void;
  currentPage: number;
  totalPages: number;
}

const Paginate = observer(({ onClickPrev, onClickNext, currentPage, totalPages }: PaginateProps) => {
  return (
    <div className="paginate-buttons">
      <button disabled={currentPage == 1} onClick={onClickPrev} className="prev-button paginate-button">
        Назад
      </button>
      <p className="page-counter">
        {currentPage} / {totalPages}
      </p>
      <button disabled={currentPage == totalPages} onClick={onClickNext} className="next-button paginate-button">
        Далее
      </button>
    </div>
  );
});

export default Paginate;
