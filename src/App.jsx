import {useEffect, useState} from "react";
import Header from "./Header.jsx";
import ApplicationForm from "./components/ApplicationForm.jsx";
import Footer from "./Footer.jsx";
import {getApplications} from "./api/applicationApi.js";
import {getInterviews} from "./api/interviewApi.js";
import ApplicationContainer from "./components/ApplicationCard/ApplicationContainer.jsx";

function App() {

    // States for applications
    const [applications, setApplications] = useState([]);
    const [appError, setAppError] = useState("");
    const [appIsLoading, setAppIsLoading] = useState(false);

    // States for interviews
    const [interviews, setInterviews] = useState([]);
    const [interviewError, setInterviewError] = useState("");
    const [interviewIsLoading, setInterviewIsLoading] = useState(false);

    const fetchApplications = async () => {
        try {
            setAppIsLoading(true);
            // Fetch application data through the API service
            const data = await getApplications();
            setApplications(data);
        } catch (error) {
            setAppError(error.message)
        } finally {
            setAppIsLoading(false);
        }
    }

    // Fetches applications from Spring Boot API
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchApplications();
    }, [])


    // Fetches interviews from Spring Boot API
    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                setInterviewIsLoading(true);
                // Fetch interview data through the API service
                const json = await getInterviews();
                setInterviews(json);
            } catch (error) {
                setInterviewError(error.message);
            } finally {
                setInterviewIsLoading(false)
            }
        };
        void fetchInterviews();

    }, []);

    const handleRetryApplications = () => {
        setAppIsLoading(true);
        void fetchApplications();
    }

    if (appError || interviewError) {
        return <div>There was an error: {appError || interviewError}
        </div>
    }
    if (appIsLoading || interviewIsLoading) {
        return <div>Loading... Backend is waking up.</div>
    }

    return (
        <div className={"main-card"}>
            <Header/>
            <h2>Info to add for job apps</h2>
            <h2>LinkedIn Profile Link: www.linkedin.com/in/michael-youmans</h2>
            <h2>LinkedIn Job Tracker: www.linkedin.com/jobs-tracker/?stage=applied</h2>
            <ApplicationForm
                setApplications={setApplications}
                interviews={interviews}
            />
            <ApplicationContainer
                applications={applications}
                setApplications={setApplications}
                interviews={interviews}
                setInterviews={setInterviews}
                handleRetryApplications={handleRetryApplications}
            />
            <Footer/>
        </div>
    )
}

export default App