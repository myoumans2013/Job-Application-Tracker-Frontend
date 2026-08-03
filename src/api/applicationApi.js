export const getApplications = async () => {
    const response = await fetch("https://spring-boot-job-application-api.onrender.com/api/applications")

    if (!response.ok) {
        throw new Error("Failed to fetch applications")
    }

    return response.json();
}
