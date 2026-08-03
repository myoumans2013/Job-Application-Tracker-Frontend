export const getInterviews = async () => {
    const response = await fetch("https://spring-boot-job-application-api.onrender.com/api/interviews");

    if (!response.ok) {
        throw new Error("Failed to grab interviews.");
    }

    return response.json();
}