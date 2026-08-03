import InterviewForm from "./InterviewForm.jsx";
import InterviewList from "./InterviewList.jsx";

function ApplicationList({applications, interviews, setInterviews, handleDeleteApplication}) {
    let applicationCount = applications.length;

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

export default ApplicationList;