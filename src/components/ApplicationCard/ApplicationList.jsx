import InterviewForm from "./InterviewForm.jsx";
import InterviewList from "./InterviewList.jsx";
import {useState} from "react";

function ApplicationList({applications, interviews, setInterviews, handleDeleteApplicationAlert}) {
    const [status, setStatus] = useState("")
    const [statusApplications, setStatusApplications] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const applicationCount = applications.length;

    // If status is not an empty string, display applications on status
    const applicationsToDisplay = status ? statusApplications :
        applications;

    // Set status back to an empty string/falsy
    const handleShowAllButtonClick = () => {
        setStatus("")
    }

    // Handle the target value for sorting by status
    const handleOnChange = async (e) => {
        const selectedStatus = e.target.value
        setStatus(selectedStatus)
        await handleSelectStatus(selectedStatus)
    }

    // Fetch applications based on status from API
    const handleSelectStatus = async (status) => {
        console.log(status);
        try {
            setLoading(true)
            const response = await fetch(`https://spring-boot-job-application-api.onrender.com/api/applications/status/${status}`);
            if (!response.ok) {
                setError("Failed to find applications.")
                return;
            }
            const data = await response.json()
            setStatusApplications(data)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    if (error) {
        return <div>There was an error: {error}</div>
    }
    if (loading) {
        return <div>Updating...</div>
    }


    return (


        <ul className="application-card">
            {/* Displaying Job Applications */}
            <span>Total Applications - ({applicationCount})</span>
            <h2>Applications</h2>

            <div className={"row-container"}>
                <select className={"input-container-status-box"}
                        onChange={handleOnChange}>
                    <option value="">Filter By Status</option>
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEWING">Interviewing</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="GHOSTED">Ghosted</option>
                </select>

                <button className={"show-all-button"} onClick={handleShowAllButtonClick}>Show all</button>
            </div>

            {applicationsToDisplay.map((application) => {
                const matchingInterviews = interviews.filter((interview) => {
                    return interview.jobApplicationId === application.id;
                });

                return (


                    <li className="application-individual-card" key={application.id}>

                        <div className={"application-text"}>

                            <p>
                                <strong className="text-before-input-box">Company Name: </strong>
                                <span className="application-card-info">{application.companyName}</span>
                            </p>

                            <p>
                                <strong className="text-before-input-box">Job Title: </strong>
                                <span className="application-card-info">{application.jobTitle}</span>
                            </p>

                            <p>
                                <strong className="text-before-input-box">Date Applied: </strong>
                                <span className="application-card-info">{application.dateApplied}</span>
                            </p>

                            <p>
                                <strong className="text-before-input-box">Status: </strong>
                                <span className="application-card-info">{application.status}</span>
                            </p>

                            <p>
                                <strong className="text-before-input-box">Job Link: </strong>
                                <span className="application-card-info">{application.jobLink}</span>
                            </p>

                            <p>
                                <strong className="text-before-input-box">Notes: </strong>
                                <span className="application-card-info">{application.notes}</span>
                            </p>

                            <p>
                                <strong className="text-before-input-box">Interview Count: </strong>
                                <span className="application-card-info">
                                    {matchingInterviews.length}
                                </span>
                            </p>

                            {/* Display interview form */}
                            <InterviewForm applicationId={application.id}
                                           interviews={interviews}
                                           setInterviews={setInterviews}
                            />

                            {/* Displaying interviews if exist */}
                            {matchingInterviews.length > 0 && (
                                <InterviewList matchingInterviews={matchingInterviews}
                                               interviews={interviews}
                                               setInterviews={setInterviews}
                                />
                            )}

                            <button className="button" onClick={() => handleDeleteApplicationAlert(application.id)}>
                                Delete
                            </button>

                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default ApplicationList;