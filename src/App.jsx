import './App.css'
import {useEffect, useState} from "react";

function App() {

    const [applications, setApplications] = useState([{
        id: 1,
        companyName: "Lockheed Martin",
        jobTitle: "Junior Java Developer",
        dateApplied: "2020-03-01",
        jobLink: "https://junior.io/",
        notes: "Applied",
        status: "INTERVIEWING",
        interviewCount: 2
    }])


    useEffect(() => {
        fetch("http://localhost:8080/api/applications")
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(error => console.log(error));
    }, [])

    console.log(applications)
    return (
        <div>
            <h1>
                Job Application Tracker
            </h1>
            <p>
                <strong>Application Tracker</strong>
            </p>
            <ul>
                {applications.map((application) => (
                    <li key={application.id}>
                        <p><strong>Id: </strong> {application.id}</p>
                        <p><strong>Company Name:</strong> {application.companyName}</p>
                        <p><strong>Job Title:</strong> {application.jobTitle}</p>
                        <p><strong>Date Applied:</strong> {application.dateApplied}</p>
                        <p><strong>Job Link:</strong> {application.jobLink}</p>
                        <p><strong>Notes:</strong> {application.notes}</p>
                        <p><strong>Status:</strong> {application.status}</p>
                        <p><strong>Interview Count:</strong> {application.interviewCount}</p>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default App