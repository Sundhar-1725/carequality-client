import axios from "axios";
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import OrganizationEditModal from "./organizationEditModal";
import Modal from "react-modal";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

const organizationIndex = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 10;
    const [searchQuery, _] = useState<string>("");
    const [organizationData, setOrganizationData] = useState<any>();
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        // Fetch organization data or perform any setup
        const fetchData = async () => {
            setIsLoading(true);
            // Simulate data fetching
            try {
                console.log("Fetching organization data...");
                // const response = await axios.get('http://localhost:8000/api/fhir/Organization/getOrganization');
                const response = await axios.get('https://carequality-server-1cw2.onrender.com/api/fhir/Organization/getOrganization');
                console.log("Organization data:", response.data);
                if (response.data.message.status === "success") {
                    setOrganizationData(response.data);
                } else {
                    setOrganizationData(null);
                }
            } catch (error) {
                console.error("Error fetching organization data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])
    const filteredOrganizations = Array.isArray(organizationData?.data) ? organizationData?.data.filter((org: any) =>
        `${org?.organizationName} ${org?.id} ${org?.contactDetails?.[0]?.telecom?.[0]?.value} ${org?.contactDetails?.[0]?.telecom?.[1]?.value} ${org?.addressDetails?.country}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    ) : [];
    const totalPages = Math.ceil(filteredOrganizations.length ?? 0 / patientsPerPage);
    const getPageNumbers = (total: number, current: number): (number | string)[] => {
        const delta = 2;
        const pages: (number | string)[] = [];

        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
                pages.push(i);
            } else if (
                (i === current - delta - 1 && i > 1) ||
                (i === current + delta + 1 && i < total)
            ) {
                pages.push("...");
            }
        }

        return pages.filter((item, index, arr) => {
            if (item !== "...") return true;
            return arr[index - 1] !== "...";
        });
    };
    return (
        <>
            {isLoading && <Loader />}
            <div className="overflow-x-auto px-5">
                <div className="max-h-[450px] hidden-scrollbar" style={{
                    width: "100%"
                }}>
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg" style={{ width: "100%" }}>
                            <thead className="bg-indigo-100 text-black-700 z-10" style={{ position: "sticky", top: 0 }}>
                                <tr style={{ fontSize: "12px" }}>
                                    <th className="text-left px-5 py-2 font-semibold whitespace-nowrap">S.NO</th>
                                    <th className="text-left px-5 py-2 font-semibold whitespace-nowrap">Name</th>
                                    <th className="text-left px-5 py-2 font-semibold whitespace-nowrap">Organization Id</th>
                                    <th className="text-left px-5 py-2 font-semibold whitespace-nowrap">Email</th>
                                    <th className="text-left px-5 py-2 font-semibold whitespace-nowrap">Contact Number</th>
                                    <th className="text-left px-5 py-2 font-semibold whitespace-nowrap">Address</th>
                                    <th className="text-left px-5 py-2 font-semibold whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    Array.isArray(organizationData?.data) && organizationData?.data.slice((currentPage - 1) * patientsPerPage, currentPage * patientsPerPage).map((orgData: any, index: number) => (
                                        <tr key={index} style={{ fontSize: "12px" }} className="hover:bg-gray-100">
                                            <td className="px-5 py-3 whitespace-nowrap">{(currentPage - 1) * patientsPerPage + index + 1}</td>
                                            <td className="px-5 py-3 whitespace-nowrap">{orgData?.organizationName ?? "--"}</td>
                                            <td className="px-5 py-3 whitespace-nowrap" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <span title={orgData?.fullUrl}>{orgData?.id ?? "--"}</span>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap" style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <span title={orgData?.contactDetails?.[0]?.telecom?.[0]?.value}>
                                                    {orgData?.contactDetails?.[0]?.telecom?.[0]?.value ?? "--"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap" style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <span title={orgData?.contactDetails?.[0]?.telecom?.[1]?.value}>
                                                    {orgData?.contactDetails?.[0]?.telecom?.[1]?.value ?? "--"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap" style={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <span>
                                                    {orgData?.addressDetails?.country ?? "--"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <div className="flex flex-row gap-3 ">
                                                    <FaEdit
                                                        fontSize='14px'
                                                        className="cursor-pointer transition-transform duration-200 hover:scale-105 transition-colors duration-200 text-blue-400 hover:text-blue-600"
                                                        onClick={() => {
                                                            setSelectedOrganization(orgData);
                                                            setIsEditModalOpen(true);
                                                        }}
                                                    />
                                                    <MdOutlineDeleteForever
                                                        fontSize='16px'
                                                        className="text-red-400 hover:text-red-600 cursor-pointer transition-transform duration-200 hover:scale-105 transition-colors duration-200"
                                                        onClick={() => {
                                                            setSelectedOrganization(orgData);
                                                            setIsDeleteModalOpen(true);
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-center py-4">
                <div className="inline-flex border border-gray-300 rounded overflow-hidden text-xs sm:text-sm">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-1 py-1 sm:px-2 md:px-3 text-blue-600 hover:underline hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                    >
                        <span className="hidden sm:inline">« First</span>
                        <span className="sm:hidden">««</span>
                    </button>

                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-1 py-1 sm:px-2 md:px-3 text-blue-600 hover:underline hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                    >
                        <span className="hidden sm:inline">‹ Prev</span>
                        <span className="sm:hidden">‹</span>
                    </button>

                    {getPageNumbers(totalPages, currentPage).map((page, index) =>
                        typeof page === "number" ? (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(page)}
                                className={`px-1 py-1 sm:px-2 md:px-3 border-r border-gray-300 ${currentPage === page
                                    ? "bg-gray-200 text-gray-800 font-semibold"
                                    : "text-blue-600 hover:underline hover:cursor-pointer"
                                    }`}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className="px-1 py-1 sm:px-2 md:px-3 border-r border-gray-300">...</span>
                        )
                    )}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-1 py-1 sm:px-2 md:px-3 text-blue-600 hover:underline hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                    >
                        <span className="hidden sm:inline">Next ›</span>
                        <span className="sm:hidden">›</span>
                    </button>

                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-1 py-1 sm:px-2 md:px-3 text-blue-600 hover:underline hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="hidden sm:inline">Last »</span>
                        <span className="sm:hidden">»»</span>
                    </button>
                </div>
                <OrganizationEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} organization={selectedOrganization} />
            </div>
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => { }}
                shouldCloseOnOverlayClick={false}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'transparent',
                        zIndex: 10000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        position: 'relative',
                        inset: 'unset', // let overlay flex centering handle placement
                        width: '400px',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    },
                }}
            >
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Delete Organization</h2>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete "<strong>{selectedOrganization?.organizationName}</strong>"?
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                // Add delete logic here
                                // console.log("Deleting organization:", selectedOrganization?.id);
                                toast.warn("Delete functionality not implemented yet.");
                                setIsDeleteModalOpen(false);
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default organizationIndex