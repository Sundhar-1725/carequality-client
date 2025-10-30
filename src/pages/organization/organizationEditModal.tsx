
const OrganizationEditModal = () => {
  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
            <div className="bg-white rounded-lg border-[0.5] shadow-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Organization</h2>
                <div>Organization Edit Modal</div>
                <div className="mt-6 flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                    <button className="ml-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default OrganizationEditModal;