import React from 'react'
import DashboardPage from './DashboardPage'
import { dashboardPages } from './pageData'

function People() {
  return <DashboardPage {...dashboardPages.people} />
}

export default People
