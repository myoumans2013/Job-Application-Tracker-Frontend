function ApplicationForm({handleSubmit, newApplication, setNewApplication}) {

    return (

        <form className={"form-card"}
              onSubmit={handleSubmit}>
            <h2>Create new Application</h2>
            <label>
                Company Name: <input className={"input-box"} type={"text"} name={"companyName"}
                                     value={newApplication.companyName}
                                     onChange={(e) => setNewApplication({
                                         ...newApplication,
                                         companyName: e.target.value
                                     })}>
            </input>
                <p>

                </p>
            </label>
            <label>
                Job Title: <input className={"input-box"} type={"text"} name={"jobTitle"}
                                  value={newApplication.jobTitle}
                                  onChange={(e) => setNewApplication({...newApplication, jobTitle: e.target.value})}>
            </input>
                <p>

                </p>
            </label>
            <label>
                Status: <select className={"input-box"} value={newApplication.status}
                                onChange={(e) => setNewApplication({...newApplication, status: e.target.value})}>
                <option value="APPLIED">APPLIED</option>
                <option value="INTERVIEWING">INTERVIEWING</option>
                <option value="OFFER">OFFER</option>
                <option value="REJECTED">REJECTED</option>
                <option value="GHOSTED">GHOSTED</option>
            </select>
                <p>

                </p>
            </label>
            <label>
                Date: <input className={"input-box"} type={"date"} name={"dateApplied"}
                             value={setNewApplication.dateApplied}
                             onChange={(e) => setNewApplication({...newApplication, dateApplied: e.target.value})}>
            </input>
                <p>

                </p>
            </label>
            <label>
                Notes: <input className={"input-box"} type={"text"} name={"notes"} value={setNewApplication.notes}
                              onChange={(e) => setNewApplication({...newApplication, notes: e.target.value})}>
            </input>
                <p>

                </p>
            </label>
            <label>
                Job Link: <input className={"input-box input-box input"} type={"text"} name={"jobLink"}
                                 value={setNewApplication.jobLink}
                                 onChange={(e) => setNewApplication({...newApplication, jobLink: e.target.value})}>
            </input>
                <p>

                </p>
            </label>

            <button className={"button"} type="submit"> Submit</button>
        </form>
    )
}

export default ApplicationForm;