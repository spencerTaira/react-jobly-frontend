import React, { useEffect, useState } from "react";
import SearchForm from './SearchForm';
import JobCardList from './JobCardList'
import JoblyApi from "./api";

/**
 *  Renders jobs
 *
 *  Props: None
 *
 *  State: jobs: {
 *            jobsInfo: [
 *              { id, title, salary, equity, companyHandle, companyName },
 *            ...],
 *            isLoaded: false
 *         }
 *
 *  App -> JobList -> JobCardList & SearchForm
 */

function JobList() {
  console.debug('JobList');
  const [jobs, setJobs] = useState({jobsInfo: null, isLoaded: false})

  console.log('jobs: ', jobs);

  useEffect(function fetchJobs() {
    async function fetchJobsAPI() {
      const jobInfo = await JoblyApi.getJobs();
      setJobs({jobInfo: jobInfo, isLoaded: true});
    }

    fetchJobsAPI();
  }, []);

  if (jobs.isLoaded === false) {
    return <i>Loading...</i>
  }

  /**
   *  Calls api method getJobs and sets state with results that returns
   *  a filtered list of jobs based on input
   *
   *  Input: data - str
   *  Output: None
   */
   async function onSearch(searchTerm) {
    const data = searchTerm && {title: searchTerm.trim()};
    const jobInfo = await JoblyApi.getJobs(data)
    setJobs({jobInfo: jobInfo});
  }

  return (
    <div className="JobList">
      <SearchForm onSearch={onSearch}/>
      {jobs.jobInfo.length === 0 ?
        <p>No Matches Found</p> :
        <JobCardList jobs={jobs.jobInfo}/>
      }
    </div>
  );
}

export default JobList;
