import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../slice/organization/reducer";

const Header = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector((state: any) => state.organization);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value));
    };

    return (
        <div className='rounded-md shadow-md border-[5] bg-white grid grid-cols-3 gap-4 items-center justify-center ' style={{ padding: '10px', width: '100%', height: '10vh' }} >
            <div className="flex items-center w-full">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e: any) => {
                        handleSearchChange(e);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <h2 className='font-semibold uppercase'>Carequality</h2>
            </div>

        </div>
    )
}

export default Header;