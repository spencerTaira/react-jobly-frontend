import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCardList from './JobCardList';

/**
 *  Renders company information
 *
 *  Props: None
 *
 *  State: company is { companyInfo: {handle, name, description, numEmployees, logoUrl, jobs}, isLoaded: false }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 *  App -> CompanyDetail -> JobCardList
 */

function CompanyDetail() {
  console.debug('CompanyDetail');

  const { handle } = useParams();
  const [company, setCompany] = useState({companyInfo: null, isLoaded: false});

  console.log('company: ', company);

  useEffect(function fetchCompany() {
    async function fetchCompanyAPI() {
      const companyInfo = await JoblyApi.getCompany(handle.toLowerCase());
      console.log("COMPANY INFO", companyInfo)
      setCompany({companyInfo: companyInfo , isLoaded: true});
    }

    fetchCompanyAPI();
  }, [handle]);

  if (company.isLoaded === false) {
    return <i>Loading...</i>
  }

  return (
    <div className="CompanyDetail">
      <div className="CompanyDetail-Info">
        <h3>{company.companyInfo.name}</h3>
        <p>{company.companyInfo.description}</p>
      </div>
      <JobCardList jobs={company.companyInfo.jobs}/>
    </div>
   );
}

export default CompanyDetail;