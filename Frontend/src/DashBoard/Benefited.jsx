import React from 'react'
import DashboardPage from './DashboardPage'
import { dashboardPages } from './pageData'

function Benefited() {
  return <DashboardPage {...dashboardPages.benefited} />
}

export default Benefited
