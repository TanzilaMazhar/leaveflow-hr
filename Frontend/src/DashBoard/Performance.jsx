import React from 'react'
import DashboardPage from './DashboardPage'
import { dashboardPages } from './pageData'

function Performance() {
  return <DashboardPage {...dashboardPages.performance} />
}

export default Performance
