import React, { useState } from 'react'
import { Bell, CalendarDays, RotateCcw, Save, Shield, Users } from 'lucide-react'
import toast from 'react-hot-toast'

const defaultSettings = {
  portalName: 'Employee Portal',
  leaveCycle: 'Joining date',
  payrollCurrency: 'USD',
  sickLimit: 16,
  casualLimit: 12,
  annualLimit: 14,
  emailAlerts: true,
  twoFactor: false,
}

function Settings() {
  const [settings, setSettings] = useState(defaultSettings)

  const totalLeave = Number(settings.sickLimit) + Number(settings.casualLimit) + Number(settings.annualLimit)

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleSave = () => {
    if (!settings.portalName.trim()) {
      toast.error('Portal name is required')
      return
    }

    if (totalLeave > 42) {
      toast.error('Total yearly leave limit cannot exceed 42 days')
      return
    }

    toast.success('Settings saved')
  }

  const handleReset = () => {
    setSettings(defaultSettings)
    toast.success('Settings reset')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          <p className="text-md text-gray-700">Manage your account preferences, leave summary, notifications, and security.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 px-3 text-sm text-gray-700 hover:bg-gray-50">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-purple-600 px-3 text-sm font-medium text-white hover:bg-purple-700">
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-700" />
              <h2 className="text-base font-semibold text-gray-900">My portal</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Portal name</span>
                <input
                  value={settings.portalName}
                  onChange={(event) => updateSetting('portalName', event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Leave cycle</span>
                <select
                  value={settings.leaveCycle}
                  onChange={(event) => updateSetting('leaveCycle', event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none">
                  <option>Joining date</option>
                  <option>Calendar year</option>
                  <option>Fiscal year</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Payroll currency</span>
                <select
                  value={settings.payrollCurrency}
                  onChange={(event) => updateSetting('payrollCurrency', event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none">
                  <option>USD</option>
                  <option>PKR</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-purple-700" />
              <h2 className="text-base font-semibold text-gray-900">My leave allowance</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['sickLimit', 'Sick leave'],
                ['casualLimit', 'Casual leave'],
                ['annualLimit', 'Annual leave'],
              ].map(([key, label]) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
                  <input
                    type="number"
                    min="0"
                    max="42"
                    value={settings[key]}
                    readOnly
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                  />
                </label>
              ))}
            </div>
            <p className={`mt-3 text-sm ${totalLeave > 42 ? 'text-red-600' : 'text-gray-500'}`}>
              Total yearly leave allowance: {totalLeave} / 42 days
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TogglePanel
              icon={<Bell className="h-5 w-5 text-purple-700" />}
              title="Notifications"
              text="Receive alerts for leave, payroll, documents, and account updates."
              checked={settings.emailAlerts}
              onChange={() => updateSetting('emailAlerts', !settings.emailAlerts)}
            />
            <TogglePanel
              icon={<Shield className="h-5 w-5 text-purple-700" />}
              title="Account security"
              text="Add an extra security preference for your employee account."
              checked={settings.twoFactor}
              onChange={() => updateSetting('twoFactor', !settings.twoFactor)}
            />
          </div>
        </section>

        <aside className="rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900">Configuration summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            <SummaryRow label="Portal" value={settings.portalName || 'Not set'} />
            <SummaryRow label="Cycle" value={settings.leaveCycle} />
            <SummaryRow label="Currency" value={settings.payrollCurrency} />
            <SummaryRow label="Leave total" value={`${totalLeave} days`} />
            <SummaryRow label="Email alerts" value={settings.emailAlerts ? 'On' : 'Off'} />
            <SummaryRow label="Security" value={settings.twoFactor ? 'Extra check on' : 'Standard'} />
          </div>
        </aside>
      </div>
    </div>
  )
}

function TogglePanel({ icon, title, text, checked, onChange }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          {icon}
          <div>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">{text}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onChange}
          className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-purple-600' : 'bg-gray-300'}`}
          aria-pressed={checked}>
          <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${checked ? 'left-6' : 'left-1'}`} />
        </button>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  )
}

export default Settings
