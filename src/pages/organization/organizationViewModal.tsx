import Modal from "react-modal";
import { useState } from "react";
import { MdOutlineCopyAll } from "react-icons/md";

interface OrganizationViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    organization: any;
}
const organizationViewModal: React.FC<OrganizationViewModalProps> = ({ isOpen, onClose, organization }) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = async (text: string, fieldName: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(fieldName);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    return (
        <>
            <Modal
                isOpen={isOpen}
                overlayClassName="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-[9999]"
                className="bg-gray-100 rounded-lg shadow-lg w-full max-w-4xl mx-4 outline-none shadow-2xl"
                ariaHideApp={false}
            >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black opacity-40 z-[-1]" />
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-400 px-5 py-3">
                    <h3 className="text-lg font-semibold">Organization {organization?.organizationName}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 hover:cursor-pointer text-xl"
                    >
                        &times;
                    </button>
                </div>
                {/* Body */}
                <div className="p-5 text-sm md:text-base leading-relaxed text-gray-700 h-96 overflow-y-auto space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">Organization ID</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.id}</p>
                        </div>
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">Email</h4>
                            <div className="flex items-center gap-2">
                                <p className="text-blue-600 text-base font-medium">{organization?.contactDetails?.[0]?.telecom?.[0]?.value || "--"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">Contact Name</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.contactDetails?.[0]?.name?.text || "--"}</p>
                        </div>
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">Contact Number</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.contactDetails?.[0]?.telecom?.[1]?.value || "--"}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">Address Line</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.addressDetails?.line || "--"}</p>
                        </div>
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">City</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.addressDetails?.city || "--"}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">State</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.addressDetails?.state || "--"}</p>
                        </div>
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">Country</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.addressDetails?.country || "--"}</p>
                        </div>
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">Zip/Postal Code</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.addressDetails?.postalCode || "--"}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-6">
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">ITI 38</h4>
                            <p className="text-gray-900 text-base font-medium">
                                {organization?.iti_ID?.iti_38 || "--"}
                                {organization?.iti_ID?.iti_38 && (
                                    <button
                                        onClick={() => copyToClipboard(organization?.iti_ID?.iti_38, 'iti_38')}
                                        className="text-gray-400 hover:text-blue-500 p-1 transition-colors duration-200"
                                        title={copiedField === 'iti_38' ? "Copied!" : "Copy ITI 38"}
                                    >
                                        {copiedField === 'iti_38' ? (
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <MdOutlineCopyAll className="text-gray-500 hover:text-blue-500" />
                                        )}
                                    </button>
                                )}
                            </p>
                        </div>
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">ITI 39</h4>
                            <p className="text-gray-900 text-base font-medium">
                                {organization?.iti_ID?.iti_39 || "--"}
                                {organization?.iti_ID?.iti_39 && (
                                    <button
                                        onClick={() => copyToClipboard(organization?.iti_ID?.iti_39, 'iti_39')}
                                        className="text-gray-400 hover:text-blue-500 p-1 transition-colors duration-200"
                                        title={copiedField === 'iti_39' ? "Copied!" : "Copy ITI 39"}
                                    >
                                        {copiedField === 'iti_39' ? (
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <MdOutlineCopyAll className="text-gray-500 hover:text-blue-500" />
                                        )}
                                    </button>
                                )}
                            </p>
                        </div>
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">ITI 55</h4>
                            <p className="text-gray-900 text-base font-medium">
                                {organization?.iti_ID?.iti_55 || "--"}
                                {organization?.iti_ID?.iti_55 && (
                                    <button
                                        onClick={() => copyToClipboard(organization?.iti_ID?.iti_55, 'iti_55')}
                                        className="text-gray-400 hover:text-blue-500 p-1 transition-colors duration-200"
                                        title={copiedField === 'iti_55' ? "Copied!" : "Copy ITI 55"}
                                    >
                                        {copiedField === 'iti_55' ? (
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <MdOutlineCopyAll className="text-gray-500 hover:text-blue-500" />
                                        )}
                                    </button>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-6">
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">Full URL</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.fullUrl|| "--"}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">Latitude</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.Location?.[0]?.latitude || "--"}</p>
                        </div>
                        <div className="">
                            <h4 className="text-sm font-normal text-gray-700 tracking-wide">Longitude</h4>
                            <p className="text-gray-900 text-base font-medium">{organization?.Location?.[0]?.longitude || "--"}</p>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div className="flex justify-end gap-2  px-5 py-3">
                    {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Save Changes
                    </button> */}
                </div>
            </Modal>
        </>
    )
}

export default organizationViewModal