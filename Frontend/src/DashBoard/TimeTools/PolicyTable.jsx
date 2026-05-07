import React, { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';

function PolicyTable({ policies, onEdit, onDelete }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="text-md font-semibold rounded-xl w-full">
      <table className="w-full border-collapse">
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id} className="border-b border-t border-gray-200">
              <td className="py-2 pr-2 lg:py-3 lg:pr-0 flex items-center gap-2 pl-2">
                {/* Optional Avatar/Image */}
              </td>
              <td className="py-2 pl-0 lg:py-3 lg:pl-0 text-gray-700 truncate max-w-[150px] lg:max-w-none">
                {policy.title}
              </td>
              <td className="py-2 px-2 lg:py-3 lg:px-4 text-gray-700 whitespace-nowrap">
                {new Date(policy.policy_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </td>
              <td className="py-2 px-2 lg:py-3 lg:px-4 text-gray-700 whitespace-nowrap">
                <span className="text-xs lg:text-sm border rounded-lg border-gray-300 px-2 py-1">
                  {policy.type}
                </span>
              </td>
              <td className="px-4 py-2">
                {policy.status === "pending" && (
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-sm">
                    Pending
                  </span>
                )}
              </td>
              <td className="py-2 px-2 lg:py-3 lg:px-4 relative text-gray-500">
                <EllipsisVertical
                  className="cursor-pointer"
                  onClick={() => setOpenDropdown(openDropdown === policy.id ? null : policy.id)}
                />
                {openDropdown === policy.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => { onEdit(policy); setOpenDropdown(null); }}
                    >
                      Edit
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                      onClick={() => { onDelete(policy.id); setOpenDropdown(null); }}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PolicyTable;
