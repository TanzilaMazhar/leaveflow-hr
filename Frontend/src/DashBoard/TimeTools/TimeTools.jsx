import React, { useEffect, useState } from 'react';
import PolicyTable from './PolicyTable';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../Components/Loader';

const typeOptions = ["Sick", "Casual", "Annual"];

function TimeTools() {
    const loaderPolicies = useLoaderData();
    const [policies, setPolicies] = useState(loaderPolicies);
    const [activeTab, setActiveTab] = useState("timeOff");
    const [showModal, setShowModal] = useState(false);
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [loading, setLoading] = useState(!loaderPolicies);
    const [newPolicy, setNewPolicy] = useState({
        title: "",
        policy_date: "",
        type: typeOptions[0]
    });

    useEffect(() => {
        if (loaderPolicies) {
            setLoading(false);
        }
    }, [loaderPolicies]);

    if (loading) return <Loader />;

    const handleChange = (e) => {
        setNewPolicy({
            ...newPolicy,
            [e.target.name]: e.target.value
        });
    };

    const handleAddPolicy = async () => {
        if (!newPolicy.title || !newPolicy.policy_date || !newPolicy.type) {
            toast.error("All fields are required");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/policies",
                newPolicy,
                { withCredentials: true }
            );
            setPolicies([res.data, ...policies]);
            closeModal();
            toast.success("Leave request submitted successfully!");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error submitting leave request");
        }
    };

    const formatDateForInput = (isoDate) => isoDate.split('T')[0];

    const handleEditClick = (policy) => {
        setEditingPolicy(policy);
        setNewPolicy({
            title: policy.title,
            policy_date: formatDateForInput(policy.policy_date),
            type: policy.type
        });
        setShowModal(true);
    };

    const handleUpdatePolicy = async () => {
        if (!newPolicy.title || !newPolicy.policy_date || !newPolicy.type) {
            toast.error("All fields are required");
            return;
        }

        try {
            const isoDate = new Date(newPolicy.policy_date).toISOString().split('T')[0];
            const res = await axios.put(
                `http://localhost:5000/api/policies/${editingPolicy.id}`,
                {
                    title: newPolicy.title,
                    policy_date: isoDate,
                    type: newPolicy.type
                },
                { withCredentials: true }
            );

            setPolicies(prev =>
                prev.map(p => (p.id === editingPolicy.id ? res.data : p))
            );
            closeModal();
            toast.success("Leave request updated successfully!");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error updating leave request");
        }
    };

    const handleDeletePolicy = (policyId) => {
        toast(
            (t) => (
                <div className="rounded bg-white p-3 shadow">
                    <p className="mb-2 text-gray-800">Delete this leave request?</p>
                    <div className="flex justify-end gap-2">
                        <button
                            className="rounded bg-gray-200 px-2 py-1"
                            onClick={() => toast.remove(t.id)} >
                            Cancel
                        </button>
                        <button
                            className="rounded bg-red-600 px-2 py-1 text-white"
                            onClick={async () => {
                                try {
                                    await axios.delete(`http://localhost:5000/api/policies/${policyId}`, { withCredentials: true });
                                    setPolicies(prev => prev.filter(p => p.id !== policyId));
                                    toast.success("Leave request deleted successfully!");
                                } catch (err) {
                                    toast.error(err.response?.data?.error || "Error deleting leave request");
                                }
                                toast.remove(t.id);
                            }}>
                            Delete
                        </button>
                    </div>
                </div>
            ),
            { duration: Infinity }
        );
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingPolicy(null);
        setNewPolicy({
            title: "",
            policy_date: "",
            type: typeOptions[0]
        });
    };

    return (
        <div>
            <div className='mb-4 space-y-14'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-xl font-bold text-gray-800'>Time & Leave</h1>
                        <p className='text-md text-gray-700'>Manage employee leave requests, policy limits, and attendance planning.</p>
                    </div>
                    <button className='h-8 cursor-pointer rounded-md bg-purple-600 px-3 text-white hover:bg-purple-700'>
                        Get the app
                    </button>
                </div>

                <div className='mt-3 flex items-center justify-between'>
                    <div className="inline-flex rounded-md bg-gray-100 p-1">
                        <button
                            onClick={() => setActiveTab("timeTracking")}
                            className={`rounded-md px-2 py-2 text-sm transition-all duration-200
                                ${activeTab === "timeTracking"
                                    ? "bg-white font-medium text-gray-900 shadow"
                                    : "text-gray-600"}`}>
                            Attendance
                        </button>
                        <button
                            onClick={() => setActiveTab("timeOff")}
                            className={`rounded-md px-2 py-2 text-sm transition-all duration-200
                                ${activeTab === "timeOff"
                                    ? "bg-white font-medium text-gray-900 shadow"
                                    : "text-gray-600"}`}>
                            Leave Requests
                        </button>
                    </div>
                </div>
            </div>

            {activeTab === "timeOff" ? (
                <div>
                    <div className='mb-6 flex items-center justify-between sm:gap-8'>
                        <div>
                            <h1 className='text-xl font-semibold'>Leave Requests</h1>
                            <p className='text-gray-600'>
                                Employees can request Sick, Casual, or Annual leave within their yearly balance.
                            </p>
                        </div>
                        <button
                            className="whitespace-nowrap rounded-md border bg-white px-4 py-2 text-sm font-bold hover:bg-gray-50 md:text-md"
                            onClick={() => setShowModal(true)}>
                            + Request Leave
                        </button>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                            <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-xl">
                                <h2 className="border-b pb-2 text-xl font-semibold text-gray-800">
                                    {editingPolicy ? "Edit Leave Request" : "New Leave Request"}
                                </h2>
                                <form className='space-y-4'>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Request Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder='Title'
                                            className='w-full rounded border px-2 py-1'
                                            value={newPolicy.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Leave Date</label>
                                        <input
                                            type="date"
                                            name="policy_date"
                                            className='w-full rounded border px-2 py-1'
                                            value={newPolicy.policy_date}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Leave Type</label>
                                        <select
                                            name="type"
                                            className='w-full rounded border px-2 py-1'
                                            value={newPolicy.type}
                                            onChange={handleChange}>
                                            {typeOptions.map((t) => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>

                                    <div className='flex justify-end gap-2'>
                                        <button
                                            type='button'
                                            className='rounded bg-gray-200 px-3 py-1 hover:bg-gray-300'
                                            onClick={closeModal}>
                                            Cancel
                                        </button>

                                        <button
                                            type='button'
                                            className='rounded bg-purple-600 px-3 py-1 text-white hover:bg-purple-700'
                                            onClick={editingPolicy ? handleUpdatePolicy : handleAddPolicy}>
                                            {editingPolicy ? "Update Request" : "Submit Request"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <PolicyTable
                        policies={policies}
                        onEdit={handleEditClick}
                        onDelete={handleDeletePolicy}
                    />
                </div>
            ) : (
                <div className='px-16 py-16 text-center text-xl font-bold text-gray-600'>
                    Attendance tracking is ready for future check-in and shift records.
                </div>
            )}
        </div>
    );
}

export default TimeTools;
