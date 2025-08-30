import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PersonalDetail from './PersonalDetail.jsx'
import EducationDetails from './Education.jsx'
import ExperienceDetails from './Experience.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExperienceDetails/>
    <EducationDetails/>
    <PersonalDetail/>
  </StrictMode>,
)
