import React from 'react'
import JobCard from './JobCard';

/**
 *  Renders job cards
 *
 *  Props: jobs: [{ id, title, salary, equity,
 *                  companyHandle(optional), companyName(optional)}, ...]
 *
 *  State: None
 *
 *  (CompanyDetail, JobList) -> JobCardList -> JobCard
 */

function JobCardList({jobs}) {
  console.debug('JobCardList');
  console.log('jobs: ', jobs);

  return (
    <div className="JobCardList container">
      {jobs.map(j => (
        <JobCard key={`${j.id}`} job={j} />
      ))}
    </div>
   );
}

export default JobCardList;
