import { useEffect, useState } from 'react';
import './sidebar.css'
import { FaBars } from 'react-icons/fa';
import { GrOrganization } from 'react-icons/gr';
import { NavLink } from 'react-router-dom';
interface SidebarProps {
    children: any;
}

const ResizeHandler = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(window.innerWidth > 1068);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return null;
};

const Sidebar = ({ children }: SidebarProps) => {

    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
    const toggle = () => setIsOpen(!isOpen);
    const [selected, setSelected] = useState<string>("Organization");
    const menuItem = [
        { name: 'Organization', path: '/', icon: <GrOrganization /> }
    ];
    return (
        <>
            <div className='flex flex-row p-1 bg-gray-100 '>
                { /* Sidebar */}
                <div style={{ width: isOpen ? "230px" : "60px", display: 'flex', flexDirection: 'column' }} className="sidebar rounded-md">
                    <div className="top_section" style={{ justifyContent: isOpen ? 'space-between' : 'center', height: '55px', borderBottom: '2px solid #0f3995' }}>
                        <h1 style={{ display: isOpen ? "block" : "none", fontSize: '18px', marginTop: '5px' }} className="logo">
                            CQ
                        </h1>
                        <div style={{ marginLeft: isOpen ? "65px" : "0px", fontSize: '18px' }} className="bars">
                            <FaBars onClick={toggle} style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div className=''>
                        {/* Sidebar content can go here */}
                        {
                            menuItem.map((route, index) => (
                                <NavLink
                                    to={route.path}
                                    key={index}
                                    style={{
                                        textDecoration: 'none',
                                        color: selected === route.name ? '#0f3995' : 'inherit',
                                        fontSize: '14px',
                                        fontWeight: selected === route.name ? 'bold' : 'normal',
                                    }}
                                    onClick={() => {
                                        setSelected(route.name)
                                    }}
                                >
                                    <div
                                        className=""
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: isOpen ? '' : 'center',
                                            padding: isOpen ? '0px 0px 0px 10px' : '12px',
                                            cursor: 'pointer',
                                            background: selected === route.name ? '#e6f0ff' : 'transparent',
                                            borderRadius: selected === route.name ? '6px' : '0px',
                                        }}
                                    >
                                        {route.icon}
                                        <p style={{
                                            display: isOpen ? "block" : "none",
                                            padding: '10px',
                                            color: selected === route.name ? '#0f3995' : 'inherit',
                                            fontWeight: selected === route.name ? 'bold' : 'normal',
                                        }}>
                                            {route.name}
                                        </p>
                                    </div>
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
                { /* Main Content Area */ }
                <div className="p-2 pt-0 hidden-scrollbar"
                    style={{
                        marginLeft: (isOpen ? "230px" : "66px"),
                        marginTop: 0,
                        overflowY: "auto",
                        height: '100vh',
                        width: `calc(100% - ${isOpen ? "230px" : "66px"})`,
                        transition: "margin-left 0.5s ease",
                    }}>
                        { /* Header */ }
                    <div className='rounded-md shadow-md border-[5] bg-white flex items-center justify-center' style={{ padding: '10px', width: '100%', height: '10vh' }} >
                        {/* <h2>{selected}</h2> */}
                        <h2 className='font-semibold uppercase'>Carequality</h2>
                        {/* <div>profile</div> */}
                    </div>
                    { /* Content */ }
                    <div className='rounded-md shadow-md border-[5] bg-white' style={{ padding: '10px', marginTop: '10px', height: '90vh' }} >
                        {children}
                    </div>
                </div>
            </div>
            <ResizeHandler setIsOpen={setIsOpen} />
        </>
    )
}

export default Sidebar