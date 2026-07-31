import {useEffect, useState} from "react";
import Header from "./Header.jsx";
import ListApplicationsAndInterviews from "./ListApplicationsAndInterviews.jsx";
import ApplicationForm from "./Forms/ApplicationForm.jsx";
import Footer from "./Footer.jsx";
import InterviewForm from "./Forms/InterviewForm.jsx";

function App() {

    // States for applications
    const [applications, setApplications] = useState([]);
    const [appError, setAppError] = useState(false);
    const [appIsLoading, setAppIsLoading] = useState(false);

    // States for interviews
    const [interviews, setInterviews] = useState([]);
    const [interviewError, setInterviewError] = useState(false);
    const [interviewIsLoading, setInterviewIsLoading] = useState(false);

    // State for waking backend up
    const [backendError, setBackendError] = useState(false);

    // Fetches applications from Spring Boot API
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setAppIsLoading(true);
                const response = await fetch("https://spring-boot-job-application-api.onrender.com/api/applications")
                if (!response.ok) {
                    throw new Error("Failed to grab applications.")
                }
                const data = await response.json();
                setApplications(data);
            } catch (e) {
                setAppError(e.message)
            } finally {
                setAppIsLoading(false);
            }
        }

        fetchApplications();
    }, [])

    // Fetches interviews from Spring Boot API
    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                setInterviewIsLoading(true);
                const response = await fetch("https://spring-boot-job-application-api.onrender.com/api/interviews");
                if (!response.ok) {
                    throw new Error("Failed to grab interviews.")
                }
                const json = await response.json();
                setInterviews(json);
            } catch (e) {
                setInterviewError(e.message);
            } finally {
                setInterviewIsLoading(false)
            }
        };
        fetchInterviews();

    }, []);


    const wakeBackendUp = async () => {
        console.log("Waking up Backend...Please wait")
        try {
            const response = await fetch("https://spring-boot-job-application-api.onrender.com/api/applications/health", {
                method: "GET"
            })
            const data = await response.text()
            console.log(data)
        } catch (e) {
            setBackendError(e.message)
        }
    }

    if (appError || interviewError || backendError) {
        return <div>There was an error: {appError || interviewError || backendError}</div>
    }
    if (appIsLoading || interviewIsLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className={"main-card"}>
            <>
                <Header/>
                <button className={"button"} onClick={wakeBackendUp}>
                    Wake-up Backend
                </button>
                <ListApplicationsAndInterviews
                    applications={applications}
                    interviews={interviews}
                />
                <ApplicationForm
                    applications={applications}
                    setApplications={setApplications}
                />
                <InterviewForm
                    interviews={interviews}
                    setInterviews={setInterviews}
                />
                <Footer/>
            </>
        </div>
    )
}

export default App