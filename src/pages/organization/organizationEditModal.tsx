import React from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  organization: any;
}

const OrganizationEditModal: React.FC<Props> = ({ isOpen, onClose, organization }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-[9999]"
      className="bg-gray-100 rounded-lg shadow-lg w-full max-w-4xl mx-4 outline-none shadow-2xl"
      ariaHideApp={false}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black opacity-40 z-[-1]" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-400 px-5 py-3">
      <h3 className="text-lg font-semibold">Edit Organization Details</h3>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-800 hover:cursor-pointer text-xl"
      >
        &times;
      </button>
      </div>

      {/* Body */}
      <div className="p-5 text-sm md:text-base leading-relaxed text-gray-700 h-96 overflow-y-auto space-y-4">

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Organization Name :</label>
        <input
          type="text"
          id="orgName"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter organization name"
          value={organization?.organizationName || ''}
        />
        </div>
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Organization ID :</label>
        <input
          type="text"
          id="orgId"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter organization ID"
          value={organization?.id}
        />
        </div>
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Email :</label>
        <input
          type="text"
          id="email"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter email"
          value={organization?.contactDetails?.[0]?.telecom?.[0]?.value || ""}
        />
        </div>
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Contact Number :</label>
        <input
          type="text"
          id="contactNumber"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter contact number"
          value={organization?.contactDetails?.[0]?.telecom?.[1]?.value || ""}
        />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Contact Name :</label>
        <input
          type="text"
          id="contactName"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter contact name"
          value={organization?.contactDetails?.[0]?.name?.text || ""}
        />
        </div>
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Address Line :</label>
        <input
          type="text"
          id="addressLine"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter address line"
          value={organization?.addressDetails?.line || ""}
        />
        </div>
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >City :</label>
        <input
          type="text"
          id="city"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter city"
          value={organization?.addressDetails?.city || ""}
        />
        </div>
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >State :</label>
        <input
          type="text"
          id="state"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter state"
          value={organization?.addressDetails?.state || ""}
        />
        </div>
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Country :</label>
        <input
          type="text"
          id="country"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter country"
          value={organization?.addressDetails?.country || ''}
        />
        </div>
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Postal Code :</label>
        <input
          type="text"
          id="postalCode"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter postal code"
          value={organization?.addressDetails?.postalCode || ""}
        />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Full Url :</label>
        <input
          type="text"
          id="fullUrl"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter full url"
          value={organization?.fullUrl || '' }
        />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Latitude :</label>
        <input
          type="text"
          id="latitude"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter latitude"
          value={organization?.Location?.[0]?.latitude || ""}
        />
        </div><div className="">
        <label className="block text-black mb-1 font-medium text-[15px]" >Longitude :</label>
        <input
          type="text"
          id="longitude"
          className="border border-gray-300 rounded-md p-1 w-full"
          placeholder="Enter longitude"
          value={organization?.Location?.[0]?.longitude || ""}
        />
        </div>
      </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t border-gray-400 px-5 py-3">
      <button
        onClick={onClose}
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          toast.warn("Save functionality not implemented yet.");
          onClose();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
      </div>
    </Modal>
  );
};

export default OrganizationEditModal;
