import {useEffect, useState} from "react";
import Header from "./Header.jsx";
import ApplicationCard from "./ApplicationCard.jsx";
import ApplicationForm from "./ApplicationForm.jsx";
import Footer from "./Footer.jsx";

function App() {

    // Stores applications from database
    const [applications, setApplications] = useState([])

    // Create applications from user
    const [newApplication, setNewApplication] = useState({
        companyName: "",
        jobTitle: "",
        dateApplied: "",
        jobLink: "",
        notes: "",
        status: "APPLIED"
    });

    const [error, setError] = useState();

    // Fetches applications from Spring Boot API
    useEffect(() => {
        fetch("https://spring-boot-job-application-api.onrender.com/api/applications")
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(error => console.log(error));
    }, [])

    // Creates a new Job application when submitted
    function handleSubmit(e) {
        e.preventDefault()
        console.log(newApplication)
        window.location.reload();

        fetch("https://spring-boot-job-application-api.onrender.com/api/applications", {
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
                setApplications([...newApplication, savedApplication]);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Fetches the delete method from Job Application Controller, filters job application and removes it
    const handleDelete = (id) => {

        fetch(`https://spring-boot-job-application-api.onrender.com/api/applications/${id}`,
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

    const wakeBackendUp = async () => {
        try {
            const response = await fetch("https://spring-boot-job-application-api.onrender.com/api/applications/health", {
                method: "GET"
            })
            const data = await response.text()
            console.log(data)
        } catch (e) {
            setError(e.message)
        }
    }

    if (error) {
        return <div>
            There was an error: {error}
        </div>
    }

    return (
        <div className={"main-card"}>
            <>
                <Header/>
                <button className={"button"} onClick={wakeBackendUp}>
                    Wake-up Backend
                </button>
                <ApplicationCard
                    applications={applications}
                    handleDelete={handleDelete}
                />
                <ApplicationForm
                    handleSubmit={handleSubmit}
                    newApplication={newApplication}
                    setNewApplication={setNewApplication}
                />
                <Footer/>
            </>
        </div>
    )
}

export default App