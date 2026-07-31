import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeSelector from "./components/ThemeSelector";

/* Common Pages */
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

/* HR Side */
import HRDashboard from "./Pages/HR Side/HRDashboard";
import CreateJob from "./Pages/HR Side/CreateJob";
import JobManagement from "./Pages/HR Side/JobManagement";
import Candidates from "./Pages/HR Side/Candidates";
import CreateAssessment from "./Pages/HR Side/CreateAssessment";
import InterviewManagement from "./Pages/HR Side/InterviewManagement";
import InterviewSchedule from "./Pages/HR Side/InterviewSchedule";
import Analytics from "./Pages/HR Side/Analytics";
import Notifications from "./Pages/HR Side/Notifications";
import HRProfile from "./Pages/HR Side/HRProfile";
import Settings from "./Pages/HR Side/Settings";
import CandidateProfileV from "./Pages/HR Side/CandidateProfileV";
import EditHRProfile from "./Pages/HR Side/EditHRProfile";
import CandidateFeedback from "./Pages/HR Side/CandidateFeedback";
import Recruiters from "./Pages/HR Side/Recruiters";
import AddRecruiter from "./Pages/HR Side/AddRecruiter";

/* Candidate Side */
import CandidateDashboard from "./Pages/Candidate Side/CandidateDashboard";
import BrowseJobs from "./Pages/Candidate Side/BrowseJobs";
import JobDetails from "./Pages/Candidate Side/JobDetails";
import ApplyJob from "./Pages/Candidate Side/ApplyJob";
import MyApplications from "./Pages/Candidate Side/MyApplications";
import MyApplicationJobDetails from "./Pages/Candidate Side/MyApplicationJobDetails";
import Assessment from "./Pages/Candidate Side/Assessment";
import MyInterviews from "./Pages/Candidate Side/MyInterviews";
import CandidateNotifications from "./Pages/Candidate Side/CandidateNotifications";
import CandidateProfileR from "./Pages/Candidate Side/CandidateProfileR";
import EditCandidateProfileR from "./Pages/Candidate Side/EditCandidateProfileR";
import CandidateSettings from "./Pages/Candidate Side/CandidateSettings";
import JoinInterviewC from "./Pages/Candidate Side/JoinInterviewC";

/* Interviewer Side */
import InterviewerDashboard from "./Pages/Interviewer Side/InterviewerDashboard";
import AssignedInterviews from "./Pages/Interviewer Side/AssignedInterviews";
import JoinInterview from "./Pages/Interviewer Side/JoinInterview";
import Feedback from "./Pages/Interviewer Side/Feedback";
import Evaluations from "./Pages/Interviewer Side/Evaluations";
import InterviewerProfile from "./Pages/Interviewer Side/InterviewerProfile";
import InterviewerNotifications from "./Pages/Interviewer Side/InterviewerNotifications";
import EditInterviewerProfile from "./Pages/Interviewer Side/EditInterviewerProfile";
import InterviewerSettings from "./Pages/Interviewer Side/InterviewerSettings";


function App() {
  return (
    <BrowserRouter>
    <ThemeSelector />
      <Routes>

        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* HR Side */}
        <Route path="/hr" element={<HRDashboard />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/job-management" element={<JobManagement />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/create-assessment" element={<CreateAssessment />} />
        <Route path="/interview-management" element={<InterviewManagement />} />
        <Route path="/interview-schedule" element={<InterviewSchedule />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/hr-profile" element={<HRProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/candidate-profile-v" element={<CandidateProfileV />} />
        <Route path="/edit-hr-profile" element={<EditHRProfile />} />
        <Route path="/candidate-feedback" element={<CandidateFeedback />} />
        <Route path="/recruiters" element={<Recruiters />} />
        <Route path="/add-recruiter" element={<AddRecruiter />} />

        {/* Candidate Side */}
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/my-application-job/:id" element={<MyApplicationJobDetails />} />
        <Route path="/candidate-assessment" element={<Assessment />} />
        <Route path="/my-interviews" element={<MyInterviews />} />
        <Route path="/candidate-notifications" element={<CandidateNotifications />} />
        <Route path="/candidate-profile-r" element={<CandidateProfileR />} />
        <Route path="/edit-candidate-profile-r" element={<EditCandidateProfileR />} />
        <Route path="/candidate-settings" element={<CandidateSettings />} />
        <Route path="/join-interview-c" element={<JoinInterviewC />} />

        {/* Interviewer Side */}
        <Route path="/interviewer" element={<InterviewerDashboard />} />
        <Route path="/assigned-interviews" element={<AssignedInterviews />} />
        <Route path="/join-interview" element={<JoinInterview />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/evaluations" element={<Evaluations />} />
        <Route path="/interviewer-profile" element={<InterviewerProfile />} />
        <Route path="/interviewer-notifications" element={<InterviewerNotifications />} />
        <Route path="/edit-interviewer-profile" element={<EditInterviewerProfile />} />
        <Route path="/interviewer-settings" element={<InterviewerSettings />} />

        {/* Error Message */}
        <Route path="*" element={
          <div className="h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold">
              404 - Page Not Found
            </h1>
          </div>
        }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

