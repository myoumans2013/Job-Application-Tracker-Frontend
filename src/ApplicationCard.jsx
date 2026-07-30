import {useEffect, useState} from "react";

function ApplicationCard({applications, handleDelete}) {
    // fetching backend interview objects
    const [interviews, setInterviews] = useState([]);

    // creating new interviews
    const [newInterview, setNewInterview] = useState({
        interviewDate: "",
        interviewerName: "",
        interviewerType: "",
        notes: "",
    });

    const applicationCount = applications.length;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();


    useEffect(() => {
        console.log("Interview state updated:", interviews);
    }, [interviews]);

    // fetches interview objects
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://spring-boot-job-application-api.onrender.com/api/interviews");
                if (!response.ok) {
                    throw new Error("Failed to grab data.")
                }
                const json = await response.json();
                console.log("Fetched interview JSON:", json);
                setInterviews(json);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false)
            }
        };
        fetchData();

    }, []);

    // Creating interviews under job applications
    const handleSubmitInterview = async (e, id) => {
        e.preventDefault();
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
        const data = await response.json();
        setInterviews([...interviews, data]);

    }

    // Deleting individual interviews
    const handleDeleteInterview = (id) => {

        fetch(`https://spring-boot-job-application-api.onrender.com/${id}`, {
            method: "DELETE"
        })
            .then((response => {
                if (!response.ok) {
                    throw new Error("Interview was unable to be deleted.");
                }
                setInterviews(interviews.filter(interview =>
                    interview.id !== id));
            }))
    }

    if (error) return <p>
        There was an error: {error}
    </p>

    if (isLoading) return <p>
        Loading...
    </p>

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
                        }}>App Id: {application.id}</div>

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

                            {/* Interview Form */}

                            <details>
                                <summary style={{
                                    marginBottom: "10px",
                                    fontStyle: "italic",
                                    fontSize: "17px",
                                    color: "honeydew"
                                }}>
                                    Create new Interview
                                </summary>
                                <form onSubmit={(e) => handleSubmitInterview(e, application.id)}>

                                    <ul style={{
                                        borderRadius: "10px",
                                        listStyleType: "none",
                                        border: "1px solid white",
                                        marginBottom: "10px",
                                        textAlign: "center"
                                    }}>
                                        <h2>Create new Interview</h2>
                                        <label className={"input-container"}>
                                        <span className={"text-before-input-box"}>
                                            Interview Date:
                                        </span>
                                            <input className={"interview-input-box"} type={"date"}
                                                   name={"interviewerDate"}
                                                   value={newInterview.interviewDate}
                                                   onChange={(e) => setNewInterview({
                                                       ...newInterview,
                                                       interviewDate: e.target.value
                                                   })}>
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
                                                   onChange={(e) => setNewInterview({
                                                       ...newInterview,
                                                       interviewerName: e.target.value
                                                   })}>
                                            </input>
                                            <p>

                                            </p>

                                        </label>
                                        <label className={"input-container"}>
                                        <span className={"text-before-input-box"}>
                                            Interviewer Type:
                                        </span>
                                            <input className={"interview-input-box"}
                                                   value={newInterview.interviewerType}
                                                   onChange={(e) => setNewInterview({
                                                       ...newInterview,
                                                       interviewerType: e.target.value
                                                   })}>
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
                                                   onChange={(e) => setNewInterview({
                                                       ...newInterview,
                                                       notes: e.target.value
                                                   })}>
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
                            <button className="button" onClick={() => handleDelete(application.id)}>
                                Delete
                            </button>

                        </div>
                    </li>

                );
            })}
        </ul>
    );
}

export default ApplicationCard;