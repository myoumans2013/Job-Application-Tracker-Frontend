import {useState} from "react";
import InterviewForm from "./Forms/InterviewForm.jsx";

function ListApplicationsAndInterviews({applications, interviews}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const applicationCount = applications.length;

    // Deleting individual interviews
    const handleDeleteInterview = async (id) => {
        try {
            setLoading(true)
            const response = await fetch(
                `https://spring-boot-job-application-api.onrender.com//deleteJobInterviewsByJobAppId/${id}`,
                {
                    method: "DELETE"
                }
            );
            if (!response.ok) {
                throw new Error("Interview was unable to be deleted.");
            }
            interviews(interviews.filter((interview) => interview.id !== id));

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    // Fetches the delete method from Job Application Controller, filters job application and removes it
    const handleDeleteApplication = async (id) => {
        try {
            const response = await fetch(
                `https://spring-boot-job-application-api.onrender.com/api/applications/${id}`,
                {
                    method: "DELETE"
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete application");
            }
            applications(applications.filter((item) => item.id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    if (error) {
        return <div>There was an error: {error}</div>
    }
    if (loading) {
        return <div>:Loading...</div>
    }

    return (

        <ul className="application-card">
            {/* Displaying Job Applications */}

            <span># of Applications - ({applicationCount})</span>
            <h2>Applications</h2>

            {applications.map((application) => {
                const matchingInterviews = interviews.filter((interview) => {
                    return interview.jobApplicationId === application.id;
                });

                return (

                    <li className="application-individual-card" key={application.id}>


                        <div style={{
                            textAlign: "left",
                            justifySelf: "start",
                            alignSelf: "center",
                        }}></div>


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
                                <span className="application-card-info">{application.interviewCount}</span>
                            </p>

                            {/* Displaying interviews if exist */}
                            {matchingInterviews.length > 0 && (
                                <details>

                                    <summary style={{
                                        marginBottom: "10px",
                                        fontStyle: "italic",
                                        fontSize: "17px",
                                        color: "honeydew"
                                    }}>Click to
                                        view Interview(s)
                                    </summary>

                                    <ul style={{
                                        borderRadius: "10px",
                                        listStyleType: "none",
                                        border: "1px solid white",
                                        marginBottom: "10px",
                                        textAlign: "center"
                                    }}>
                                        {matchingInterviews.map((interview) => (
                                            <li key={interview.id}>
                                                <p>
                                                    <strong className="text-before-input-box">Interview Date: </strong>
                                                    <span
                                                        className="application-card-info">{interview.interviewDate}</span>
                                                </p>

                                                <p>
                                                    <strong className="text-before-input-box">Interviewer
                                                        Name: </strong>
                                                    <span
                                                        className="application-card-info">{interview.interviewerName}</span>
                                                </p>

                                                <p>
                                                    <strong className="text-before-input-box">Interview Type: </strong>
                                                    <span
                                                        className="application-card-info">{interview.interviewerType}</span>
                                                </p>

                                                <p>
                                                    <strong className="text-before-input-box">Notes: </strong>
                                                    <span className="application-card-info">{interview.notes}</span>
                                                </p>

                                                <p>
                                                    <strong className="text-before-input-box">Company Name: </strong>
                                                    <span
                                                        className="application-card-info">{interview.companyName}</span>
                                                </p>

                                                <p>
                                                    <strong className="text-before-input-box">Job Title: </strong>
                                                    <span className="application-card-info">{interview.jobTitle}</span>
                                                </p>

                                                <InterviewForm applicationId={application.id}/>

                                                <p>
                                                    <button className="button"
                                                            onClick={() => handleDeleteInterview(interview.id)}>Delete
                                                    </button>
                                                </p>

                                            </li>
                                        ))}
                                    </ul>
                                </details>


                            )}


                            <button className="button" onClick={() => handleDeleteApplication(application.id)}>
                                Delete
                            </button>

                        </div>
                    </li>

                );
            })}
        </ul>
    );
}

export default ListApplicationsAndInterviews;