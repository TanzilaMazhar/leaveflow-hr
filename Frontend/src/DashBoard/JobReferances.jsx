import React from 'react'
import DashboardPage from './DashboardPage'
import { dashboardPages } from './pageData'

function JobReferances() {
  return <DashboardPage {...dashboardPages.jobReferences} />
}

export default JobReferances
