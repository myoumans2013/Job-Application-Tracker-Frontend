import {useState} from "react";

function InterviewForm({interviews, setInterviews, applicationId}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [newInterview, setNewInterview] = useState({
        interviewDate: "",
        interviewerType: "",
        interviewerName: "",
        notes: "",
    })

    // Creates a new interview under each unique job application
    const handleSubmitInterview = async (e, id) => {
        e.preventDefault();
        try {
            setLoading(true)
            const interviewToSend = {
                ...newInterview,
                jobApplicationId: id,
            };
            const response = await fetch(`https://spring-boot-job-application-api.onrender.com/api/interviews/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(interviewToSend)
            })
            if (!response.ok) {
                setError("Failed to create Interview.")
                return;
            }
            const data = await response.json();
            setInterviews([...interviews, data]);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }

    }


    const handleOnChange = (e) => {
        setNewInterview({
            ...newInterview,
            [e.target.name]: e.target.value
        })
    }

    if (error) {
        return <div>There was an error: {error}</div>
    }
    if (loading) {
        return <div></div>
    }

    return (

        <details className="interview-form-card">
            <summary>
                Create new Interview
            </summary>
            <form onSubmit={(e) => handleSubmitInterview(e, applicationId)}>

                <ul>
                    <h2>Create new Interview</h2>
                    <label className={"input-container"}>
                                        <span className={"text-before-input-box"}>
                                            Interview Date:
                                        </span>
                        <input className={"interview-input-box"}
                               type={"date"}
                               name={"interviewDate"}
                               value={newInterview.interviewDate}
                               onChange={handleOnChange}>
                        </input>
                        <p>

                        </p>
                    </label>
                    <label className={"input-container"}>
                                        <span className={"text-before-input-box"}>
                                            Interviewer Name:

                                    </span>
                        <input className={"interview-input-box"} type={"text"}
                               name={"interviewerName"}
                               value={newInterview.interviewerName}
                               onChange={handleOnChange}>
                        </input>
                        <p>

                        </p>
                    </label>
                    <label className={"input-container"}>
                                        <span className={"text-before-input-box"}>
                                            Interviewer Type:
                                        </span>
                        <input className={"interview-input-box"}
                               name={"interviewerType"}
                               value={newInterview.interviewerType}
                               onChange={handleOnChange}>
                        </input>
                        <p>

                        </p>
                    </label>
                    <label className={"input-container"}>
                                        <span className={"text-before-input-box"}>
                                            Notes:
                                        </span>
                        <input className={"interview-input-box"} type={"text"}
                               name={"notes"}
                               value={newInterview.notes}
                               onChange={handleOnChange}>
                        </input>
                        <p>

                        </p>
                    </label>

                    <button
                        className="button"
                        type={"submit"}>
                        Submit
                    </button>
                </ul>
            </form>

        </details>
    )
}

export default InterviewForm

