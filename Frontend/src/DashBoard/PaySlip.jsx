import React from 'react'
import DashboardPage from './DashboardPage'
import { dashboardPages } from './pageData'

function PaySlip() {
  return <DashboardPage {...dashboardPages.payslip} />
}

export default PaySlip
