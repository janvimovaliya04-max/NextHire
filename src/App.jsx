import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
import NotesEditorPage from "./Pages/HR Side/NotesEditorPage";
import HRScheduleCalendar from "./Pages/HR Side/HRScheduleCalendar";

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
import Notes from "./Pages/Candidate Side/Notes";
import CandidateCalendar from "./Pages/Candidate Side/CandidateCalendar";

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
import KeepNotes from "./Pages/Interviewer Side/KeepNotes";
import InterviewerCalendar from "./Pages/Interviewer Side/InterviewerCalendar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* HR Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["hr"]} />}>
            <Route path="/hr" element={<HRDashboard />} />
            <Route path="/hr/create-job" element={<CreateJob />} />
            <Route path="/hr/job-management" element={<JobManagement />} />
            <Route path="/hr/candidates" element={<Candidates />} />
            <Route path="/hr/create-assessment" element={<CreateAssessment />} />
            <Route path="/hr/interview-management" element={<InterviewManagement />} />
            <Route path="/hr/interview-schedule" element={<InterviewSchedule />} />
            <Route path="/hr/analytics" element={<Analytics />} />
            <Route path="/hr/notifications" element={<Notifications />} />
            <Route path="/hr/hr-profile" element={<HRProfile />} />
            <Route path="/hr/settings" element={<Settings />} />
            <Route path="/hr/candidate-profile-v" element={<CandidateProfileV />} />
            <Route path="/hr/edit-hr-profile" element={<EditHRProfile />} />
            <Route path="/hr/candidate-feedback" element={<CandidateFeedback />} />
            <Route path="/hr/recruiters" element={<Recruiters />} />
            <Route path="/hr/add-recruiter" element={<AddRecruiter />} />
            <Route path="/hr/notes" element={<NotesEditorPage />} />
            <Route path="/hr/schedule-calendar" element={<HRScheduleCalendar />} />
          </Route>

          {/* Candidate Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["candidate"]} />}>
            <Route path="/candidate" element={<CandidateDashboard />} />
            <Route path="/candidate/browse-jobs" element={<BrowseJobs />} />
            <Route path="/candidate/job-details/:id" element={<JobDetails />} />
            <Route path="/candidate/apply-job/:id" element={<ApplyJob />} />
            <Route path="/candidate/my-applications" element={<MyApplications />} />
            <Route path="/candidate/my-application-job/:id" element={<MyApplicationJobDetails />} />
            <Route path="/candidate/candidate-assessment" element={<Assessment />} />
            <Route path="/candidate/my-interviews" element={<MyInterviews />} />
            <Route path="/candidate/candidate-notifications" element={<CandidateNotifications />} />
            <Route path="/candidate/candidate-profile-r" element={<CandidateProfileR />} />
            <Route path="/candidate/edit-candidate-profile-r" element={<EditCandidateProfileR />} />
            <Route path="/candidate/candidate-settings" element={<CandidateSettings />} />
            <Route path="/candidate/join-interview-c" element={<JoinInterviewC />} />
            <Route path="/candidate/notes-c" element={<Notes />} />
            <Route path="/candidate/candidate-calendar" element={<CandidateCalendar />} />
          </Route>

          {/* Interviewer Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["interviewer"]} />}>
            <Route path="/interviewer" element={<InterviewerDashboard />} />
            <Route path="/interviewer/assigned-interviews" element={<AssignedInterviews />} />
            <Route path="/interviewer/join-interview" element={<JoinInterview />} />
            <Route path="/interviewer/feedback" element={<Feedback />} />
            <Route path="/interviewer/evaluations" element={<Evaluations />} />
            <Route path="/interviewer/interviewer-profile" element={<InterviewerProfile />} />
            <Route path="/interviewer/interviewer-notifications" element={<InterviewerNotifications />} />
            <Route path="/interviewer/edit-interviewer-profile" element={<EditInterviewerProfile />} />
            <Route path="/interviewer/interviewer-settings" element={<InterviewerSettings />} />
            <Route path="/interviewer/keep-notes" element={<KeepNotes />} />
            <Route path="/interviewer/interviewer-calendar" element={<InterviewerCalendar />} />
          </Route>

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="h-screen flex items-center justify-center">
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;