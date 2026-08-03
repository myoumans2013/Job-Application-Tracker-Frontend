import {useState} from "react";
import ApplicationList from "./ApplicationList.jsx";

function ApplicationContainer({applications, setApplications, interviews, setInterviews}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleDeleteApplicationAlert = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this?");
        if (isConfirmed) {
            void handleDeleteApplication(id)
        } else {
            return <div>Deletion canceled.</div>
        }
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
                         interviews={interviews}
                         setInterviews={setInterviews}
                         handleDeleteApplicationAlert={handleDeleteApplicationAlert}
        />
    )
}

export default ApplicationContainer