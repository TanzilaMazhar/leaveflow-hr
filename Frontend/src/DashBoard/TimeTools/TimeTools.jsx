import React, { useEffect, useState } from 'react';
import PolicyTable from './PolicyTable';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../Components/Loader';

const typeOptions = ["🔴 Sick", "🟡 Casual", "🔵 Annual"];

function TimeTools() {
    const loaderPolicies = useLoaderData();
    const [policies, setPolicies] = useState(loaderPolicies);
    const [activeTab, setActiveTab] = useState("timeOff");
    const [showModal, setShowModal] = useState(false);
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [loading, setLoading] = useState(!loaderPolicies);

    useEffect(() => {
        if (loaderPolicies)
            setLoading(false)
    }, [loaderPolicies]);
    
    if (loading) return <Loader />

    const [newPolicy, setNewPolicy] = useState({
        title: "",
        policy_date: "",
        type: typeOptions[0]
    });

    const handleChange = (e) => {
        setNewPolicy({
            ...newPolicy,
            [e.target.name]: e.target.value
        });
    };

    // add policy btn
    const handleAddPolicy = async () => {
        if (!newPolicy.title || !newPolicy.policy_date || !newPolicy.type) {
            toast.error("All fields are required");
            return;
        }
        try {
            const res = await axios.post(
                "http://localhost:5000/api/policies", newPolicy,
                { withCredentials: true }
            );
            setPolicies([res.data, ...policies]);
            closeModal();
            toast.success("Policy added Successfully!")
        } catch (err) {
            toast.error(err.response?.data?.error || "Error updating policy");
        }
    };

    const formatDateForInput = (isoDate) => isoDate.split('T')[0];

    //edit policy
    const handleEditClick = (policy) => {
        setEditingPolicy(policy);
        setNewPolicy({
            title: policy.title,
            policy_date: formatDateForInput(policy.policy_date),
            type: policy.type
        });
        setShowModal(true);
    };
    //update policy
    const handleUpdatePolicy = async () => {
        if (!newPolicy.title || !newPolicy.policy_date || !newPolicy.type) {
            toast.error("All fields are required");
            return;
        }

        try {
            // Convert date to ISO format (YYYY-MM-DD) before sending
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

            // Update the policy in local state
            setPolicies(prev =>
                prev.map(p => (p.id === editingPolicy.id ? res.data : p))
            );

            // Close modal and reset
            closeModal();
            toast.success("Policy updated successfully!");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error updating policy");
        }
    };


    //delete btn
    const handleDeletePolicy = (policyId) => {
        //toast modla poppup
        toast(
            (t) => (
                <div className="p-3 bg-white rounded shadow">
                    <p className="text-gray-800 mb-2">Delete this policy?</p>
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-2 py-1 bg-gray-200 rounded"
                            onClick={() => toast.remove(t.id)} >
                            Cancel
                        </button>
                        <button
                            className="px-2 py-1 bg-red-600 text-white rounded"
                            onClick={async () => {
                                try {
                                    await axios.delete(`http://localhost:5000/api/policies/${policyId}`, { withCredentials: true });
                                    setPolicies(prev => prev.filter(p => p.id !== policyId));
                                    toast.success("Policy deleted successfully!");
                                } catch (err) {
                                    toast.error(err.response?.data?.error || "Error deleting policy");
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
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xl font-bold text-gray-800'>Time Tools</h1>
                        <p className='text-md text-gray-700'>Time tools streamline productivity, optimize efficiency</p>
                    </div>
                    <button className='h-8 px-3 rounded-md bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'>
                        Get the app
                    </button>
                </div>

                <div className='mt-3 flex items-center justify-between'>
                    <div className="inline-flex bg-gray-100 p-1 rounded-md">
                        <button
                            onClick={() => setActiveTab("timeTracking")}
                            className={`px-2 py-2 text-sm rounded-md transition-all duration-200
                                ${activeTab === "timeTracking"
                                    ? "bg-white text-gray-900 shadow font-medium"
                                    : "text-gray-600 "}`}>
                            Time Tracking
                        </button>
                        <button
                            onClick={() => setActiveTab("timeOff")}
                            className={`px-2 py-2 text-sm rounded-md transition-all duration-200
                                ${activeTab === "timeOff"
                                    ? "bg-white text-gray-900 shadow font-medium"
                                    : "text-gray-600"}`}>
                            Time Off
                        </button>
                    </div>
                </div>
            </div>

            {activeTab === "timeOff" ? (
                <div>
                    <div className='flex justify-between sm:gap-8 items-center mb-6'>
                        <div>
                            <h1 className='text-xl font-semibold'>Sick Leave Policy</h1>
                            <p className='text-gray-600'>
                                Employees can be enrolled in one sick policy. Make sure that your policy is compliant with your state rules.
                            </p>
                        </div>
                        <button
                            className="px-4 py-2 font-bold rounded-md border bg-white hover:bg-gray-50 cursor-pointer text-sm md:text-md whitespace-nowrap"
                            onClick={() => setShowModal(true)}>
                            + Add Policy
                        </button>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
                            <div className="bg-white shadow-xl p-6 rounded-lg w-full max-w-md space-y-4">
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                                    {editingPolicy ? "Edit Policy" : "Add New Policy"}
                                </h2>
                                <form className='space-y-4'>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Policy Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder='Title'
                                            className='border px-2 py-1 rounded w-full'
                                            value={newPolicy.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                                        <input
                                            type="date"
                                            name="policy_date"
                                            className='border px-2 py-1 rounded w-full'
                                            value={newPolicy.policy_date}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
                                        <select
                                            name="type"
                                            className='border px-2 py-1 rounded w-full'
                                            value={newPolicy.type}
                                            onChange={handleChange}>
                                            {typeOptions.map((t) => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>

                                    <div className='flex justify-end gap-2'>
                                        <button
                                            type='button'
                                            className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'
                                            onClick={closeModal}>
                                            Cancel
                                        </button>

                                        <button
                                            type='button'
                                            className='px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700'
                                            onClick={editingPolicy ? handleUpdatePolicy : handleAddPolicy}>
                                            {editingPolicy ? "Update Policy" : "Add Policy"}
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
                <div className='text-center text-red-500 text-xxl font-bold py-16 px-16'>
                    No Time tracking here now
                </div>
            )}
        </div>
    );
}

export default TimeTools;
