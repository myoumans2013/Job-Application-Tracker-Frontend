import {useState} from "react";
import ApplicationList from "./ApplicationList.jsx";

function ApplicationContainer({interviews, applications, setApplications, setInterviews, handleRetryApplications}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleDeleteApplicationAlert = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this?");
        if (!isConfirmed) {
            return;
        }
        await handleDeleteApplication(id);
    }

    // Fetches the delete method from API, filters and removes it
    const handleDeleteApplication = async (id) => {
        try {
            setLoading(true)
            const response = await fetch(
                `https://spring-boot-job-application-api.onrender.com/api/applications/${id}`,
                {
                    method: "DELETE"
                }
            );
            if (!response.ok) {
                setError("Failed to delete application");
                return;
            }
            setApplications(applications.filter((item) => item.id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    if (error) {
        return <div>There was an error: {error}</div>
    }
    if (loading) {
        return <div>Updating...</div>
    }

    return (
        <ApplicationList applications={applications}
                         setInterviews={setInterviews}
                         handleDeleteApplicationAlert={handleDeleteApplicationAlert}
                         handleRetryApplications={handleRetryApplications}
                         interviews={interviews}
        />
    )
}

export default ApplicationContainer