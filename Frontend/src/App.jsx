import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashBoard from './DashBoard/DashBoard'
import People from './DashBoard/People'
import PaySlip from './DashBoard/PaySlip'
import TimeTools from './DashBoard/TimeTools/TimeTools'
import Benefited from './DashBoard/Benefited'
import Performance from './DashBoard/Performance'
import PersonalDetails from './DashBoard/PersonalDetails'
import JobReferances from './DashBoard/JobReferances'
import Document from './DashBoard/Document'
import Settings from './DashBoard/Settings'
import Support from './DashBoard/Support'
import Layout from './Components/SideBarLayout/Layout'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import ProtectedRoute from './Components/SideBarLayout/ProtectedRoute'
import { Toaster } from "react-hot-toast";
import PolicyLoader from './DashBoard/TimeTools/PolicyLoader'
import AuthRedirect from './Components/SideBarLayout/AuthRedirect'

const router = createBrowserRouter([
  //public routes
  { path: '/', element: <AuthRedirect><SignUp /></AuthRedirect> },
  { path: '/signup', element: <AuthRedirect><SignUp /></AuthRedirect> },
  { path: '/signin', element: <AuthRedirect><SignIn /></AuthRedirect> },

  //protected Dashboard
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashBoard /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: 'people', element: <People /> },
      { path: 'payslip', element: <PaySlip /> },
      { path: "timetools", element: <TimeTools />, loader: PolicyLoader },
      { path: 'benefits', element: <Benefited /> },
      { path: 'benefited', element: <Benefited /> },
      { path: 'performance', element: <Performance /> },
      { path: 'personaldetails', element: <PersonalDetails /> },
      { path: 'jobref', element: <JobReferances /> },
      { path: 'document', element: <Document /> },
      { path: 'setting', element: <Settings /> },
      { path: 'support', element: <Support /> },
    ]
  }
])
function App() {
  return (
    <>
      <RouterProvider
        router={router}
        fallbackElement={<div>Loading...</div>}
      />
      <Toaster position="top-right" />
    </>
  )
}

export default App
