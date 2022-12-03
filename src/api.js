import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
  static token = "";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /**
   * Get single company by handle
   *
   *   Input: handle - str
   *   Output: { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies.
   * Input: data = Object containing filter params
   *    {
   *      minEmployees,
   *       maxEmployees,
   *       nameLike (will find case-insensitive, partial matches)
   *    }
   * Output: [{ handle, name, description, numEmployees, logoUrl }, ...]
   */

  static async getCompanies(data = {}) {
    let res = await this.request(`companies/`, data);
    return res.companies;
  }

  /** Get all jobs.
   *  Can provide search filter in query:
   *  minSalary
   *  hasEquity (true returns only jobs with equity > 0, other values ignored)
   *  title (will find case-insensitive, partial matches)
   *
   *  Input: data = Object containing filter params
   *    {
   *      minSalary,
   *      hasEquity, (true returns only jobs with equity > 0, other values ignored)
   *      title, (will find case-insensitive, partial matches)
   *    }
   *  Output: [{ id, title, salary, equity, companyHandle, companyName }, ...]
   */

  static async getJobs(data = {}) {
    let res = await this.request(`jobs/`, data);
    return res.jobs;
  }

  /** Register new user.
   *
   *  Input: data = {username, password, firstName, lastName, email};
   *
   *  Output: token
   */

  static async userRegister(data) {
    let res = await this.request(`auth/register`, data, "post");
    console.log(res);
    this.token = res.token;
    return this.token;
  }

  /** Authenticates/Logins user
   *
   *  Input: data = {username, password};
   *
   *  Output: token
   */

  static async userLogin(data) {
    let res = await this.request(`auth/token`, data, "post");
    console.log(res);
    this.token = res.token;
    return this.token;
  }

  /** Updates user info
   *
   *  Input: data = {username, firstName, lastName, email};
   *
   *  Output: { username, firstName, lastName, email, isAdmin }
   */

  static async userUpdate(data) {
    const {username, ...otherData} = data;

    let res = await this.request(`users/${username}`, otherData, "patch");
    console.log('userProfile: ', res);
    return res.user;
  }

 /** Gets a specific user
   *
   *  Input: username
   *
   *  Output: { username, firstName, lastName, email, isAdmin, jobs }
   *          where jobs is { id, title, companyHandle, companyName, state }
   */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

}

export default JoblyApi;
