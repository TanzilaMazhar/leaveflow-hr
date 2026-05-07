import React from 'react'
import DashboardPage from './DashboardPage'
import { dashboardPages } from './pageData'

function Settings() {
  return <DashboardPage {...dashboardPages.settings} />
}

export default Settings
