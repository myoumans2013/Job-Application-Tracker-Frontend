import {useState} from "react";

function InterviewList({matchingInterviews, interviews, setInterviews}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Deletes individual interviews by ID
    const handleDeleteInterview = async (id) => {
        try {
            setLoading(true)
            const response = await fetch(
                `https://spring-boot-job-application-api.onrender.com/api/interviews/deleteJobInterviewsByJobAppId/${id}`,
                {
                    method: "DELETE"
                }
            );
            if (!response.ok) {
                setError("Interview was unable to be deleted.");
                return;
            }
            setInterviews(interviews.filter((interview) => interview.id !== id));

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
        <div>
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

                            <p>
                                <button className="button"
                                        onClick={() => handleDeleteInterview(interview.id)}>Delete
                                </button>
                            </p>

                        </li>
                    ))}
                </ul>
            </details>
        </div>
    )
}

export default InterviewList