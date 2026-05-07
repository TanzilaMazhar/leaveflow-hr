import React, { useMemo, useState } from 'react'
import { CircleHelp, Plus, Search, Send } from 'lucide-react'
import toast from 'react-hot-toast'

const initialTickets = [
  { id: 1, title: 'Payslip correction', requester: 'Ayesha Khan', category: 'Payroll', priority: 'High', status: 'Open' },
  { id: 2, title: 'Leave balance issue', requester: 'Bilal Ahmed', category: 'Leave', priority: 'Medium', status: 'Review' },
  { id: 3, title: 'Document upload problem', requester: 'Sara Malik', category: 'Documents', priority: 'Low', status: 'Resolved' },
]

function Support() {
  const [tickets, setTickets] = useState(initialTickets)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '',
    requester: '',
    category: 'Leave',
    priority: 'Medium',
  })

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStatus = status === 'All' || ticket.status === status
      const searchText = `${ticket.title} ${ticket.requester} ${ticket.category}`.toLowerCase()
      return matchesStatus && searchText.includes(query.toLowerCase())
    })
  }, [query, status, tickets])

  const openCount = tickets.filter((ticket) => ticket.status !== 'Resolved').length
  const resolvedCount = tickets.filter((ticket) => ticket.status === 'Resolved').length

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleCreateTicket = () => {
    if (!form.title.trim() || !form.requester.trim()) {
      toast.error('Ticket title and requester are required')
      return
    }

    setTickets((current) => [
      {
        id: Date.now(),
        ...form,
        status: 'Open',
      },
      ...current,
    ])
    setForm({ title: '', requester: '', category: 'Leave', priority: 'Medium' })
    setShowForm(false)
    toast.success('Support ticket created')
  }

  const updateTicketStatus = (ticketId, nextStatus) => {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: nextStatus } : ticket
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Support</h1>
          <p className="text-md text-gray-700">Track HR help requests for payroll, leave, documents, and employee access.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-purple-600 px-3 text-sm font-medium text-white hover:bg-purple-700">
          <Plus className="h-4 w-4" />
          Create ticket
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Metric label="Open tickets" value={openCount} />
        <Metric label="Resolved tickets" value={resolvedCount} />
        <Metric label="Total requests" value={tickets.length} />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tickets"
              className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-purple-500 focus:outline-none"
            />
          </div>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none">
            <option>All</option>
            <option>Open</option>
            <option>Review</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Ticket</th>
                <th className="px-5 py-3 font-semibold">Requester</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Priority</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="text-gray-700">
                  <td className="px-5 py-4 font-medium text-gray-900">{ticket.title}</td>
                  <td className="px-5 py-4">{ticket.requester}</td>
                  <td className="px-5 py-4">{ticket.category}</td>
                  <td className="px-5 py-4">{ticket.priority}</td>
                  <td className="px-5 py-4">
                    <select
                      value={ticket.status}
                      onChange={(event) => updateTicketStatus(ticket.id, event.target.value)}
                      className="rounded-md border border-gray-300 px-2 py-1 text-xs focus:border-purple-500 focus:outline-none">
                      <option>Open</option>
                      <option>Review</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTickets.length === 0 && (
          <div className="flex flex-col items-center gap-2 px-6 py-12 text-center text-gray-500">
            <CircleHelp className="h-8 w-8" />
            <p>No support tickets match your filters.</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">Create support ticket</h2>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Issue title</span>
                <input
                  value={form.title}
                  onChange={(event) => updateForm('title', event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Requester</span>
                <input
                  value={form.requester}
                  onChange={(event) => updateForm('requester', event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Category</span>
                  <select
                    value={form.category}
                    onChange={(event) => updateForm('category', event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none">
                    <option>Leave</option>
                    <option>Payroll</option>
                    <option>Documents</option>
                    <option>Access</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Priority</span>
                  <select
                    value={form.priority}
                    onChange={(event) => updateForm('priority', event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateTicket}
                className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700">
                <Send className="h-4 w-4" />
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

export default Support
