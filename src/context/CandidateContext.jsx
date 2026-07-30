import { createContext, useContext, useState } from "react";

const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidate, setCandidate] = useState({
    fullName: "",
    candidateId: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    location: "",
    education: "",

    appliedJobs: 0,
    assessments: 0,
    interviews: 0,
    offers: 0,
  });

  return (
    <CandidateContext.Provider
      value={{
        candidate,
        setCandidate,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => useContext(CandidateContext);