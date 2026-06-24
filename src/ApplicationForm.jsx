function ApplicationForm({handleSubmit, newApplication, setNewApplication}) {

    return (

        <form className={"application-form-card"}
              onSubmit={handleSubmit}>
            <h2>Create new Job Application</h2>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Company Name:
                </span>
                <input className={"input-container-input-box"} type={"text"} name={"companyName"}
                       value={newApplication.companyName}
                       onChange={(e) => setNewApplication({
                           ...newApplication,
                           companyName: e.target.value
                       })}>
                </input>
                <p>

                </p>
            </label>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Job Title:
                </span>
                <input className={"input-container-input-box"} type={"text"} name={"jobTitle"}
                       value={newApplication.jobTitle}
                       onChange={(e) => setNewApplication({...newApplication, jobTitle: e.target.value})}>
                </input>
                <p>

                </p>

            </label>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Status:
                </span>
                <select className={"input-container-input-box"} value={newApplication.status}
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
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Date:
                </span>
                <input className={"input-container-input-box"} type={"date"} name={"dateApplied"}
                       value={setNewApplication.dateApplied}
                       onChange={(e) => setNewApplication({...newApplication, dateApplied: e.target.value})}>
                </input>
                <p>

                </p>
            </label>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Notes:
                </span>
                <input className={"input-container-input-box"} type={"text"} name={"notes"}
                       value={setNewApplication.notes}
                       onChange={(e) => setNewApplication({...newApplication, notes: e.target.value})}>
                </input>
                <p>

                </p>
            </label>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Job Link:
                </span>
                <input className={"input-container-input-box"} type={"text"} name={"jobLink"}
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