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

    const [newCompanyName, setNewCompanyName] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/applications")
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {

    })

    function handleSubmit(e) {
        e.preventDefault()
        const newApplication = {
            companyName: newCompanyName,
            jobTitle: "Junior Java Developer",
            dateApplied: "2020-03-01",
            jobLink: "https://junior.io/",
            notes: "Applied",
            status: "INTERVIEWING",
            interviewCount: 2
        };

        fetch("http://localhost:8080/api/applications",
            {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(newApplication)})
        console.log(newApplication);
        console.log(newCompanyName);
    }

    return (
        <div className={"main-card"}>
            <h1>
                Job Application Tracker
            </h1>
            <h2>
                <strong>Track job applications and interviews</strong>
            </h2>
            <ul className={"application-card"}>
                {applications.map((application) => (
                    <li className={"application-individual-card"} key={application.id}>
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

            <form onSubmit={handleSubmit}>
                <label>
                    Company Name: <input type={"text"} name={"companyName"} value={newCompanyName}
                                         onChange={(e) => setNewCompanyName(e.target.value)}>
                </input>
                    <p>

                    </p>
                </label>

                <button type="submit"> Submit</button>
            </form>

            <footer>
                <p className={"main-card"}>Made by Michael</p>
            </footer>
        </div>
    )
}

export default App