import React from "react";
import { ArrowRight, CheckCircle2, Download, FileText, Plus, Search } from "lucide-react";

function DashboardPage({
  title,
  subtitle,
  action = "Get the app",
  stats = [],
  primaryTitle,
  primaryText,
  tableTitle,
  tableColumns = [],
  tableRows = [],
  sideTitle,
  sideItems = [],
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <p className="text-md text-gray-700">{subtitle}</p>
        </div>
        <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-purple-600 px-3 text-sm font-medium text-white hover:bg-purple-700">
          <Plus className="h-4 w-4" />
          {action}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{primaryTitle}</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-600">{primaryText}</p>
              </div>
              <div className="flex gap-2">
                <button className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 px-3 text-sm text-gray-700 hover:bg-gray-50">
                  <Search className="h-4 w-4" />
                  Search
                </button>
                <button className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 px-3 text-sm text-gray-700 hover:bg-gray-50">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">{tableTitle}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    {tableColumns.map((column) => (
                      <th key={column} className="px-5 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tableRows.map((row) => (
                    <tr key={row[0]} className="text-gray-700">
                      {row.map((cell, index) => (
                        <td key={`${row[0]}-${index}`} className="px-5 py-4">
                          {index === row.length - 1 ? (
                            <span className="rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <aside className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-700" />
            <h2 className="text-base font-semibold text-gray-900">{sideTitle}</h2>
          </div>
          <div className="space-y-3">
            {sideItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-md border border-gray-100 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.text}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default DashboardPage;
