import {useState} from "react";
import {deleteInterview} from "../../api/interviewApi.js";

function InterviewList({matchingInterviews, setInterviews}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Deletes individual interviews by ID
    const handleDeleteInterview = async (id) => {
        try {
            setLoading(true)
            await deleteInterview(id);
            setInterviews(currentInterviews =>
                currentInterviews.filter((interview) => interview.id !== id));
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
        return <div></div>
    }


    return (
        <div>
            <details>

                <summary>
                    Click to
                    view Interview(s)
                </summary>

                <ul>
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