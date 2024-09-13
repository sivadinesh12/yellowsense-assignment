import { useState, useEffect } from "react";
import JobsItem from "../JobsItem";
import "./index.css";

const Bookmarks = (props) => {
  const { setSelectedJobId } = props;
  const [booMarks, setBookmarks] = useState([]);
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      try {
        const parsedBookmarks = JSON.parse(savedBookmarks);
        setBookmarks(parsedBookmarks || []);
      } catch (error) {
        console.error("Error parsing bookmarks from localStorage:", error);
        setBookmarks([]);
      }
    }
  }, []);
  return (
    <div className="bookMark-container">
      <h1 className="heading">Bookmarks</h1>
      {booMarks.length > 0 ? (
        <ul className="bookmark-item-container">
          {booMarks.map((bookMarks) => (
            <JobsItem
              job={bookMarks}
              key={bookMarks.id}
              setSelectedJobId={setSelectedJobId}
            />
          ))}
        </ul>
      ) : (
        <div>
          <p>No Bookmarks</p>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
