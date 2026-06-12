import './App.css'

function App() {
  const application = {
    companyName: "Lockheed Martin",
    jobTitle: "Junior Java Developer",
    status: "INTERVIEWING",
    interviewCount: 2
  }

  return (
      <div>
        <h1>
          Job Application Tracker
        </h1>
        <h1>
          Frontend connected soon
        </h1>
          <p>
            {application.companyName}
          </p>
          <p>
            {application.jobTitle}
          </p>
          <p>
            {application.status}
          </p>
          <p>
            {application.interviewCount}
          </p>
      </div>

)
}

export default App