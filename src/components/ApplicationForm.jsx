import {useState} from "react";
import {createApplication} from "../api/applicationApi.js";

function ApplicationForm({setApplications}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [newApplication, setNewApplication] = useState({
        companyName: " ",
        jobTitle: " ",
        dateApplied: "",
        jobLink: "",
        notes: "",
        status: "APPLIED"
    });

    // Creates a new Job application
    const handleSubmitApplication = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const data = await createApplication(newApplication)
            setApplications((currentApplications) => [
                data,
                ...currentApplications
            ])
            setNewApplication({
                companyName: " ",
                jobTitle: " ",
                dateApplied: "",
                jobLink: "",
                notes: "",
                status: "APPLIED"
            })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }

    }

    const handleOnChange = (e) => {
        setNewApplication({
            ...newApplication,
            [e.target.name]: e.target.value
        })
    }

    if (error) {
        return <div>There was an error: {error}</div>
    }
    if (loading) {
        return <div>Updating...</div>
    }

    return (

        <form className={"application-form-card"}
              onSubmit={handleSubmitApplication}>
            <h2>Create new Job Application</h2>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Company Name:
                </span>
                <input className={"input-container-input-box"}
                       type={"text"}
                       name={"companyName"}
                       value={newApplication.companyName}
                       onChange={handleOnChange}>
                </input>
                <p>

                </p>
            </label>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Job Title:
                </span>
                <input className={"input-container-input-box"}
                       type={"text"}
                       name={"jobTitle"}
                       value={newApplication.jobTitle}
                       onChange={handleOnChange}>
                </input>
                <p>

                </p>

            </label>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Status:
                </span>
                <select className={"input-container-input-box"}
                        name={"status"}
                        value={newApplication.status}
                        onChange={handleOnChange}>
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEWING">Interviewing</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="GHOSTED">Ghosted</option>
                </select>
                <p>

                </p>
            </label>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Date:
                </span>
                <input className={"input-container-input-box"}
                       type={"date"}
                       name={"dateApplied"}
                       value={newApplication.dateApplied}
                       onChange={handleOnChange}>
                </input>
                <p>

                </p>
            </label>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Notes:
                </span>
                <input className={"input-container-input-box"}
                       type={"text"}
                       name={"notes"}
                       value={newApplication.notes}
                       onChange={handleOnChange}>
                </input>
                <p>

                </p>
            </label>
            <label className={"input-container"}>
                <span className={"text-before-input-box"}>
                    Job Link:
                </span>
                <input className={"input-container-input-box"}
                       type={"text"}
                       name={"jobLink"}
                       value={newApplication.jobLink}
                       onChange={handleOnChange}>
                </input>
                <p>

                </p>
            </label>

            <button className={"button"} type="submit"> Submit</button>
        </form>
    )
}

export default ApplicationForm;