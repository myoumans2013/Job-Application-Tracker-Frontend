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

    // Fetches applications from Spring Boot API
    useEffect(() => {
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


    if (appError || interviewError) {
        return <div>There was an error: {appError || interviewError}</div>
    }
    if (appIsLoading || interviewIsLoading) {
        return <div>Loading... Backend is waking up.</div>
    }

    return (
        <div className={"main-card"}>
            <Header/>
            <ApplicationContainer
                applications={applications}
                setApplications={setApplications}
                interviews={interviews}
                setInterviews={setInterviews}
            />
            <ApplicationForm
                applications={applications}
                setApplications={setApplications}
                interviews={interviews}
            />
            <Footer/>
        </div>
    )
}

export default App