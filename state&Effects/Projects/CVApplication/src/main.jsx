import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ResumeDetail from './PersonalDetail.jsx'
import EducationDetails from './Education.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResumeDetail />
    <EducationDetails />
  </StrictMode>,
)
