import React from 'react'
import DashboardPage from './DashboardPage'
import { dashboardPages } from './pageData'

function PersonalDetails() {
  return <DashboardPage {...dashboardPages.personalDetails} />
}

export default PersonalDetails
