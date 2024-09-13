import "./index.css";

const DetailedJobItem = (props) => {
  const { jobs, selectedJobId, handleBookMark, setSelectedJobId } = props;
  const job = jobs.find((job) => job.id === selectedJobId);
  const {
    id,
    title,
    company_name,
    job_role,
    salary_min,
    salary_max,
    job_location_slug,
    job_hours,
    openings_count,
    num_applications,
    primary_details,
    custom_link,
    whatsapp_no,
  } = job;

  const { Experience, Qualification } = primary_details;
  console.log(job);
  const displaySalary =
    (salary_min === "null" || !salary_min) &&
    (salary_max === "null" || !salary_max)
      ? "Not Disclosed"
      : `${salary_min} - ${salary_max}`;
  return (
    <div>
      <h2 className="company-name">{company_name}</h2>
      <h1>{job_role}</h1>
      <div className="description-container">
        <p className="description-heading">Job Description:</p>
        <p className="description">{title}</p>
      </div>
      <div className=" d-flex justify-content-between">
        <div>
          <p className="description-heading">Job Details:</p>
          <div className="detail-container">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg>
            <p className="detail-text">{job_location_slug}</p>
          </div>
          <div className="detail-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="icon"
            >
              <path d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z" />
            </svg>
            <p className="detail-text">{job_hours}</p>
          </div>
          <div className="detail-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="icon"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
            <p className="detail-text">{displaySalary}</p>
          </div>
        </div>
        <div>
          <p className="description-heading">Number of openings:</p>
          <p className="counts">{openings_count}</p>
          <p className="description-heading">
            Number of applications received:
          </p>
          <p className="counts">{num_applications}</p>
        </div>
      </div>
      <div>
        <p className="description-heading">
          Qualification - <span className="counts">{Qualification}</span>
        </p>
        <p className="description-heading">
          Experience - <span className="counts">{Experience}</span>
        </p>
      </div>
      <div>
        <p className="description-heading">Contact:</p>
        <p className="description">{custom_link}</p>
        <p className="description">WhatsApp:{whatsapp_no}</p>
      </div>
      <div className="">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setSelectedJobId(null)}
        >
          Back
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleBookMark(job, id)}
        >
          Add to Bookmark
        </button>
      </div>
    </div>
  );
};

export default DetailedJobItem;
