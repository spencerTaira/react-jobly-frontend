import React from 'react'
import './JobCard.css'

/**
 *  Renders job card
 *
 *  Props: job: {
 *                id,
 *                title,
 *                salary,
 *                equity,
 *                companyHandle(optional),
 *                companyName(optional)
 *              }
 *
 *  State: None
 *
 *  JobCardList -> JobCard
 */

function JobCard({job}) {
  console.debug('JobCard');
  console.log('job: ', job);

  return (
    <div className="JobCard">
      <h5>{job.title}</h5>
      {job.companyName && <h6>{job.companyName}</h6>}
      {job.salary && <p>Salary: {job.salary}</p>}
      {job.equity && <p>Equity: {job.equity}</p>}
    </div>
   );
}

export default JobCard;
