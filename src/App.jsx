import './App.css'
import {useEffect, useState} from "react";
import Header from "./Header.jsx";

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

    const [status, setStatus] = useState("APPLIED");

    const [newCompanyName, setNewCompanyName] = useState("");
    const [newJobTitle, setNewJobTitle] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newJobLink, setNewJobLink] = useState("");
    const [newNote, setNewNote] = useState("");


    useEffect(() => {
        fetch("http://localhost:8080/api/applications")
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(error => console.log(error));
    }, [])

    // Creates a new Job application when submitted
    function handleSubmit(e) {
        e.preventDefault()
        const newApplication = {
            companyName: newCompanyName,
            status: newStatus,
            jobTitle: newJobTitle,
            dateApplied: newDate,
            jobLink: newJobLink,
            notes: newNote,
        };
        console.log(newApplication)

        fetch("http://localhost:8080/api/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newApplication)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to create application");
                }

                return response.json();
            })
            .then((savedApplication) => {
                setApplications([...applications, savedApplication]);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleDelete = (id) => {

        fetch(`http://localhost:8080/api/applications/${id}`,
            {
                method: "DELETE"
            })
            .then((response => {
                if (!response.ok) {
                    throw new Error("Failed to delete application");
                }
                setApplications(applications.filter((item) => item.id !== id));
            }))
            .catch((error) => {
                error.message = "Failed to delete application";
            })
    }

    return (
        <div className={"main-card"}>
            <Header/>
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

            <form className={"form-card"}
                  onSubmit={handleSubmit}>
                <h2>Create new Application</h2>
                <label>
                    Company Name: <input className={"input-box"} type={"text"} name={"companyName"}
                                         value={newCompanyName}
                                         onChange={(e) => setNewCompanyName(e.target.value)}>
                </input>
                    <p>

                    </p>
                </label>
                <label>
                    Job Title: <input className={"input-box"} type={"text"} name={"jobTitle"}
                                      value={newJobTitle}
                                      onChange={(e) => setNewJobTitle(e.target.value)}>
                </input>
                    <p>

                    </p>
                </label>
                <label>
                    Status: <select className={"input-box"} name={"status"} value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}>
                    <option value="APPLIED">APPLIED</option>
                    <option value="INTERVIEWING">INTERVIEWING</option>
                    <option value="OFFER">OFFER</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="GHOSTED">GHOSTED</option>
                </select>
                    <p>

                    </p>
                </label>
                <label>
                    Date: <input className={"input-box"} type={"date"} name={"dateApplied"} value={newDate}
                                 onChange={(e) => setNewDate(e.target.value)}>
                </input>
                    <p>

                    </p>
                </label>
                <label>
                    Notes: <input className={"input-box"} type={"text"} name={"notes"} value={newNote}
                                  onChange={(e) => setNewNote(e.target.value)}>
                </input>
                    <p>

                    </p>
                </label>
                <label>
                    Job Link: <input className={"input-box input-box input"} type={"text"} name={"jobLink"}
                                     value={newJobLink}
                                     onChange={(e) => setNewJobLink(e.target.value)}>
                </input>
                    <p>

                    </p>
                </label>

                <button className={"button"} type="submit"> Submit</button>
            </form>

            <footer style={{textAlign: "center"}}>
                <p className={"main-card"}>Made by Michael</p>
            </footer>
        </div>
    )
}

export default App