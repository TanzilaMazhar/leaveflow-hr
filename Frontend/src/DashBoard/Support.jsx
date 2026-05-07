import React from 'react'
import DashboardPage from './DashboardPage'
import { dashboardPages } from './pageData'

function Support() {
  return <DashboardPage {...dashboardPages.support} />
}

export default Support
