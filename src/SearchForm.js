import React, { useState } from 'react';
import './SearchForm.css';
/**
 * Renders form
 *
 * Props: onSearch - function
 *
 * State: formData - string
 *
 * Render:
 *   (CompanyList, JobList) -> SearchForm
 */

function SearchForm({onSearch}) {
  console.debug('SearchForm');

  const [formData, setFormData] = useState('');

  /**
   * Updates form input
   *
   * Input: event object
   */
  function onChange(e) {
    e.preventDefault();
    setFormData(e.target.value);
  }

  /**
   *  Calls passed in parent function and resets formData
   *
   *  Input: event object
   */
  function onSubmit(e) {
    e.preventDefault();
    onSearch(formData);
    setFormData('');
  }


  return (
    <div className="SearchForm mt-4 d-flex justify-content-center">
      <form className="form-inline" onSubmit={onSubmit}>
        <div className="SearchForm-input input-group">
          <input
            className="form-control"
            onChange={onChange}
            placeholder="Enter a search term..."
            value={formData}
          />
          <button className="btn btn-primary float-right">Submit</button>
        </div>
      </form>
    </div>
  )

}

export default SearchForm;