import {useEffect, useState} from "react";

function ApplicationCard({applications, handleDelete}) {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        console.log("Interview state updated:", interviews);
    }, [interviews]);

    useEffect(() => {
        fetch("http://localhost:8080/api/interviews")
            .then(res => res.json())
            .then(data => {
                setInterviews(data);
            })
            .catch(error => console.log(error));
    }, []);


    return (
        <ul className="application-card">
            <h2>Applications</h2>

            {applications.map((application) => {
                const matchingInterviews = interviews.filter((interview) => {
                    return interview.jobApplicationId === application.id;
                });

                return (
                    <li className="application-individual-card" key={application.id}>
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

                                <ul style={{borderRadius: "10px", listStyleType: "none", border: "1px solid white"}}>
                                    {matchingInterviews.map((interview) => (
                                        <li key={interview.id}>
                                            <p>
                                                <strong className="text-before-input-box">Interview Date: </strong>
                                                <span className="application-card-info">{interview.interviewDate}</span>
                                            </p>

                                            <p>
                                                <strong className="text-before-input-box">Interviewer Name: </strong>
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
                                                <span className="application-card-info">{interview.companyName}</span>
                                            </p>

                                            <p>
                                                <strong className="text-before-input-box">Job Title: </strong>
                                                <span className="application-card-info">{interview.jobTitle}</span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        )}
                        <button className="button" onClick={() => handleDelete(application.id)}>
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default ApplicationCard;