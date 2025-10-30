import axios from "axios";
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import OrganizationEditModal from "./organizationEditModal";

const organizationIndex = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [organizationData, setOrganizationData] = useState<any>();
    useEffect(() => {
        // Fetch organization data or perform any setup
        const fetchData = async () => {
            // Simulate data fetching
            console.log("Fetching organization data...");
            const response = await axios.get('http://localhost:8000/api/fhir/Organization/getOrganization');
            console.log("Organization data:", response.data);
            if (response.data.status === "success") {
                setOrganizationData(response.data);
            } else {
                setOrganizationData(null);
            }
        }
        fetchData();
    }, [])
    // const filteredPatients = organizationData.data?.filter((patient: any) =>
    //     `${patient.first_name} ${patient.last_name} ${patient.dob} ${patient.document_type.join(" ")} ${patient.request_id}`
    //         .toLowerCase()
    //         .includes(searchQuery.toLowerCase())
    // );
    const totalPages = Math.ceil(500 / patientsPerPage);
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
            <div className="overflow-x-auto px-5">
                <div className="max-h-[450px] hidden-scrollbar" style={{
                    width: "100%"
                }}>
                    <div className="w-full overflow-x-auto  ">
                        <table className="min-w-full bg-white shadow-md rounded-lg" style={{ width: "100%" }}>
                            <thead className="sticky top-0 bg-indigo-100 text-black-700 z-10">
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
                                                    <FaEdit fontSize='14px' className="cursor-pointer transition-transform duration-200 hover:scale-105 transition-colors duration-200 text-blue-400 hover:text-blue-600" />
                                                    <MdOutlineDeleteForever fontSize='16px' className="text-red-400 hover:text-red-600 cursor-pointer transition-transform duration-200 hover:scale-105 transition-colors duration-200" />
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
                <div className="inline-flex border border-gray-300 rounded overflow-hidden text-sm">

                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-blue-600 hover:underline hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                    >
                        « First
                    </button>

                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-blue-600 hover:underline hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                    >
                        ‹ Prev
                    </button>

                    {getPageNumbers(totalPages, currentPage).map((page, index) =>
                        typeof page === "number" ? (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 border-r border-gray-300 ${currentPage === page
                                    ? "bg-gray-200 text-gray-800 font-semibold"
                                    : "text-blue-600 hover:underline hover:cursor-pointer"
                                    }`}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className="px-3 py-1 border-r border-gray-300">...</span>
                        )
                    )}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-blue-600 hover:underline hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                    >
                        Next ›
                    </button>

                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-blue-600 hover:underline hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Last »
                    </button>
                </div>
            </div>
            {/* <OrganizationEditModal /> */}
        </>
    )
}

export default organizationIndex