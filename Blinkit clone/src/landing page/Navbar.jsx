import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Logo from '../components/Logo';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store/slices/SliceWish';
import {useState} from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';


export default function Navbar({handleModalOpen}) {
    const cartData = useSelector((state) => state.cart);
    const {isLoggedIn, user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    console.log(isLoggedIn)
    console.log(user)
    return (
        <nav>
            <div
                className="nav-container justify-between flex border-b items-center px-6 fixed bg-white w-full top-0 z-10 h-20">

                <NavLink to="/">
                    <div className="h-full border-r items-center flex pr-4">
                        <Logo/>
                    </div>
                </NavLink>

                <div className="item-container flex gap-6 px-4 flex-grow">
                    <div className="delivery text-xs">
                        <h1 className='font-bold'>Deliver in 8 minutes</h1>
                        <p className='w-45'>B62, Pocket B, South City I, Sector...<ArrowDropDownIcon
                            onClick={() => setOpen(true)}
                            className={"cursor-pointer"}/></p>
                        {/*    POPUP FOR LOCATION  */}
                        <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                            // sx={{
                            //     alignItems: 'flex-start',
                            //     justifyContent: 'flex-start',
                            // }}
                            className="[&_.MuiDialog-container]:items-start [&_.MuiDialog-container]:justify-start"
                        >
                            <div className={"w-fit h-fit p-4 relative"}>

                                <IconButton
                                    onClick={() => setOpen(false)}
                                    sx={{position: 'absolute', top: 8, right: 8}}>
                                    <CloseIcon/>
                                </IconButton>
                                <p className={"font-semibold mb-3 pr-8"}>Select your Location</p>

                                <div className={"flex items-center rounded px-2 gap-2.5"}>
                                    {/*<SearchIcon/>*/}
                                    <button className={"bg-green-600 whitespace-nowrap p-2 rounded text-blue-50"}>Detect
                                        my Location
                                    </button>
                                    <p className={'border rounded-[100%] p-1 text-gray-400'}>-OR-</p>
                                    <input
                                        className={"p-1 outline-amber-300 border-b-gray-950 border"}
                                        placeholder={"Search delivery location"}
                                    />
                                </div>
                            </div>
                        </Dialog>
                    </div>
                    <div className="search-tem flex-grow self-center">
                        <div className="flex bg-gray-100 rounded-md px-2 py-1 border border-slate-200 items-center">
                            <SearchIcon fontSize='small'/>
                            <form action="">
                                <input type="text" className=' bg-gray-100 outline-none'/>
                            </form>
                        </div>
                    </div>

                    <div className="action flex items-center gap-4 relative">
                        {!isLoggedIn ? (
                            <button onClick={handleModalOpen}>Login</button>
                        ) : (
                            <>
                                <span>Hello, {user.name}</span>
                                <button onClick={() => dispatch(logout())}>Logout</button>
                            </>
                        )}

                        <NavLink to="/cart" className="relative">
                            <button
                                className="bg-gray-200 py-2 px-3 rounded text-white text-xs font-bold flex items-center gap-1">
                                <ShoppingCartOutlinedIcon/> My Cart
                            </button>
                            {cartData.length > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartData.length}
                                </span>
                            )}
                        </NavLink>

                    </div>


                </div>
            </div>
        </nav>
    )
}