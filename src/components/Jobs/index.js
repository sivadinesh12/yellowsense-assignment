import JobsItem from "../JobsItem";
import { Circles } from "react-loader-spinner";
import "./index.css";
const Jobs = (props) => {
  const {
    setSelectedJobId,
    isLoading,
    jobs,
    handlePreviousPage,
    handleNextPage,
    currentPage,
  } = props;

  return (
    <div className="jobs-bg-container">
      <h1 className="heading">JOBS</h1>
      {isLoading ? (
        <div className="jobs-loader d-flex flex-row justify-content-center align-items-center">
          <Circles color="#5F2199" height={80} width={80} />
        </div>
      ) : (
        <ul className="jobs-container">
          {jobs.map((jobs) => (
            <JobsItem
              job={jobs}
              key={jobs.id}
              setSelectedJobId={setSelectedJobId}
            />
          ))}
        </ul>
      )}
      <div className="pagination-container">
        <button className="pagination-btn" onClick={handlePreviousPage}>
          {"<<"} Previous
        </button>
        <p className="page-num">{currentPage}</p>
        <button className="pagination-btn" onClick={handleNextPage}>
          Next {">>"}
        </button>
      </div>
    </div>
  );
};

export default Jobs;
