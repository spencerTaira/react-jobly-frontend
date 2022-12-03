import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyCard.css';
/**
 * Renders a company card with company information
 *
 *  Props: company: { handle, name, description, numEmployees, logoUrl }
 *
 *  State: None
 *
 *  Render:
 *    CompanyList -> CompanyCard
 */
function CompanyCard({company}) {
  console.debug('CompanyCard');

  return (
    <Link to={`/companies/${company.handle}`}>
      <div className="CompanyCard">
        <div className="CompanyCard-Info">
          <h6>
            {company.name}
            {/* <div className="CompanyCard-Img"> */}
              {company.logoUrl && <img src={`${company.logoUrl}`} alt={`${company.name} logo`}></img>}
            {/* </div> */}
          </h6>
          <p>{company.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default CompanyCard;
