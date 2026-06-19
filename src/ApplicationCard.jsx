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

                        <details>
                            <summary>Click to view Interviews</summary>

                            <ul style={{borderRadius: "10px", listStyleType: "none"}}>
                                {matchingInterviews.map((interview) => (
                                    <li key={interview.id}>
                                        <p>{interview.interviewDate}</p>
                                        <p>{interview.interviewerName}</p>
                                        <p>{interview.interviewType}</p>
                                        <p>{interview.notes}</p>
                                        <p>{interview.jobApplicationId}</p>
                                        <p>{interview.companyName}</p>
                                        <p>{interview.jobTitle}</p>
                                    </li>
                                ))}
                            </ul>
                        </details>

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