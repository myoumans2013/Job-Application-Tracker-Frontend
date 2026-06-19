function ApplicationCard({applications, handleDelete}) {
    const count = 1;

    const add = () => {
        return count + 1
    }

    return (

        <ul className={"application-card"}>
            <h2>Applications
            </h2>
            {applications.map((application) => (
                <li className={"application-individual-card"} key={application.id}>
                    <p><strong className={"text-before-input-box"}>Company Name: </strong>
                        <span className={"application-card-info"}>{application.companyName}</span>
                    </p>
                    <p><strong className={"text-before-input-box"}>Job Title: </strong>
                        <span className={"application-card-info"}>{application.jobTitle}</span>
                    </p>
                    <p><strong className={"text-before-input-box"}>Date Applied: </strong>
                        <span className={"application-card-info"}>{application.dateApplied}</span>
                    </p>
                    <p><strong className={"text-before-input-box"}>Status: </strong>
                        <span className={"application-card-info"}>{application.status}</span>
                    </p>
                    <p><strong className={"text-before-input-box"}>Job Link: </strong>
                        <span className={"application-card-info"}>{application.jobLink}</span>
                    </p>
                    <p><strong className={"text-before-input-box"}>Notes: </strong>
                        <span className={"application-card-info"}>{application.notes}</span>
                    </p>
                    <p><strong className={"text-before-input-box"}>Interview Count: </strong>
                        <span className={"application-card-info"}>{application.interviewCount}</span>
                        <button style={{marginLeft: "25px"}} onClick={add}>
                            See Interviews + {count}
                        </button>
                    </p>
                    <button className={"button"} onClick={() => handleDelete(application.id)}> Delete</button>
                </li>
            ))}

        </ul>
    )
}

export default ApplicationCard;