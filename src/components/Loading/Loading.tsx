import "./Loading.css";
export default function Loading() {
  return (
    <div className="loading">
      <img src={`${import.meta.env.BASE_URL}svg/loading.svg`} alt="" className="loading__img" />
    </div>
  );
}
