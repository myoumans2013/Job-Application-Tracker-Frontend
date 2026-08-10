const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getApplications = async () => {
    const response = await fetch(`${API_BASE_URL}/api/applications/getAll`)

    if (!response.ok) {
        throw new Error("Failed to fetch applications")
    }

    return response.json();
}

export const createApplication = async (newApplication) => {
    const response = await fetch(`${API_BASE_URL}/api/applications/createApplication`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newApplication)
    })
    if (!response.ok) {
        throw new Error("Failed to create application.")

    }
    return response.json();
}

// delete Application API
export const deleteApplication = async (id) => {
    const response = await fetch(
        `${API_BASE_URL}/api/applications/deleteApplication/${id}`,
        {
            method: "DELETE"
        })

    if (!response.ok) {
        throw new Error("Cannot delete Application")
    }
}

export const selectStatus = async (status) => {
    const response = await fetch(`${API_BASE_URL}/api/applications/status/${status}`);

    if (!response.ok) {
        throw new Error('failed to find applications with the status: ' + status)

    }
    return response.json();
}