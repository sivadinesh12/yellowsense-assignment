import { useState, useEffect } from "react";
import Jobs from "./components/Jobs";
import Bookmarks from "./components/Bookmarks";
import DetailedJobItem from "./components/DetailedJobItem";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WorkIcon from "@mui/icons-material/Work";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("Jobs");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [noJobError, setNoJobError] = useState(false);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Error parsing bookmarks from localStorage:", error);
        localStorage.removeItem("bookmarks");
        setBookmarks([]);
      }
    }
  }, []);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://testapi.getlokalapp.com/common/jobs?page=${currentPage}`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        setNoJobError(true);
      }
      if (response.ok) {
        setIsLoading(false);
      }
      setJobs([...data.results]);
    } catch (e) {
      console.error("Error fetching jobs", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  useEffect(() => {
    console.log(bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleNoJob = () => {
    setCurrentPage(1);
    setNoJobError(false);
  };

  const handleBookMark = (job, id) => {
    const checkBookmark = bookmarks.find((bookmark) => bookmark.id === id);
    if (checkBookmark) {
      return;
    }
    const updatedBookmarks = [...bookmarks, job];
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    setSelectedJobId(null);
  };

  const renderSection = () => {
    if (selectedJobId !== null) {
      return (
        <DetailedJobItem
          jobs={jobs}
          selectedJobId={selectedJobId}
          handleBookMark={handleBookMark}
          setSelectedJobId={setSelectedJobId}
        />
      );
    }

    if (noJobError) {
      return (
        <div className="no-job-err">
          <p>No jobs found.</p>
          <button className="btn btn-primary" onClick={handleNoJob}>
            Go back
          </button>
        </div>
      );
    }

    if (activeTab === "Jobs") {
      return (
        <Jobs
          setSelectedJobId={setSelectedJobId}
          isLoading={isLoading}
          jobs={jobs}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleBookMarkFunc={handleBookMark}
        />
      );
    } else if (activeTab === "Bookmarks") {
      return <Bookmarks setSelectedJobId={setSelectedJobId} />;
    }
  };

  return (
    <div className="container-fluid bg-container">
      {renderSection()}

      <BottomNavigation
        sx={{
          width: "100%",
          backgroundColor: "rgb(95, 33, 153)",
        }}
        value={activeTab}
        onChange={handleChange}
        className="fixed-bottom"
      >
        <BottomNavigationAction
          label="JOBS"
          sx={{ color: "#ffffff" }}
          value="Jobs"
          icon={<WorkIcon />}
          className="nav-icon"
        />
        <BottomNavigationAction
          label="BOOKMARKS"
          value="Bookmarks"
          icon={<BookmarkAddIcon />}
          sx={{ color: "#ffffff" }}
        />
      </BottomNavigation>
    </div>
  );
}

export default App;
