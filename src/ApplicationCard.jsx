function ApplicationCard({applications, handleDelete}) {
    return (

        <ul className={"application-card scroll-container"}>
            <h1 style={{textAlign: "center"}}>Applications
            </h1>
            {applications.map((application) => (
                <li className={"application-individual-card"} key={application.id}>
                    <p><strong>Company Name:</strong> {application.companyName}</p>
                    <p><strong>Job Title:</strong> {application.jobTitle}</p>
                    <p><strong>Date Applied:</strong> {application.dateApplied}</p>
                    <p><strong>Status:</strong> {application.status}</p>
                    <p><strong>Job Link:</strong> {application.jobLink}</p>
                    <p><strong>Notes:</strong> {application.notes}</p>
                    <p><strong>Interview Count:</strong> {application.interviewCount}</p>
                    <button className={"button"} onClick={() => handleDelete(application.id)}> Delete</button>
                </li>
            ))}

        </ul>
    )
}

export default ApplicationCard;