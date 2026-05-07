import React from 'react'
import DashboardPage from './DashboardPage'
import { dashboardPages } from './pageData'

function DashBoard() {
  return <DashboardPage {...dashboardPages.dashboard} />
}

export default DashBoard
