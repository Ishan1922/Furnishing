import React, { useState } from 'react'
import classes from './navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { GiWoodenChair } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineFileImage, AiOutlineClose } from 'react-icons/ai'
import { logout } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'

const Navbar = () => {

    const [state, setState] = useState({})
    const [photo, setPhoto] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState(false)
    const { user, token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/signin")
    }


    const handleState = (e) => {
        setState(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleCloseForm = () => {
        setShowForm(false)
        setPhoto(null)
        setState({})
    }

    const handleListProperty = async (e) => {
        e.preventDefault();

        let filename = null
        if (photo) {
            const formData = new FormData()
            filename = crypto.randomUUID() + photo.name
            formData.append('filename', filename)
            formData.append('image', photo)

            const options = {
                "Authorization": `Bearer ${token}`,
            }

            await request("/upload/image", 'POST', options, formData, true)
        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500)
            return
        }

        try {
            const options = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }

            await request("/product", 'POST', options, { ...state, img: filename })

            handleCloseForm();
        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500)
        }



    }



    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Link to='/' className={classes.left}>
                    Happy Furnishings <GiWoodenChair />
                </Link>
                <ul className={classes.center}>
                    <li className={classes.listItem}>Home</li>
                    <li className={classes.listItem}>About</li>
                    <li className={classes.listItem}>Featured</li>
                    <li className={classes.listItem}>Contacts</li>
                </ul>
                <div className={classes.right}>
                    {!user ?
                        <>
                            <Link to='/signup'>Sign up</Link>
                            <Link to='/signin'>Sign in</Link>
                        </>
                        :
                        <>
                            <span className={classes.username} >Hello {user.username}!</span>
                            <span className={classes.logoutBtn} onClick={handleLogout}>Logout</span>
                            <Link onClick={() => setShowForm(true)} className={classes.list}>List your product</Link>
                        </>
                    }
                </div>
            </div>

            {
                // desktop screen
                showForm &&
                <div className={classes.listPropertyForm} onClick={handleCloseForm}>
                    <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
                        <h2>List Product</h2>
                        <form onSubmit={handleListProperty}>
                            <input value={state?.title} type="text" placeholder='Title' name="title" onChange={handleState} />
                            <select value={state?.type} required name='type' onChange={handleState}>
                                <option disabled>Select Type</option>
                                <option value='sofa'>Sofa</option>
                                <option value='bed'>Bed</option>
                                <option value='chair'>Chair</option>
                            </select>
                            <input value={state?.desc} type="text" placeholder='Desc' name="desc" onChange={handleState} />
                            <select value={state?.owner} required name='owner' onChange={handleState}>
                                <option disabled>Select type of Owner</option>
                                <option value='0'>Fresh</option>
                                <option value='1'>First Owner</option>
                                <option value='2'>Second Owner</option>
                                <option value='3'>Third Owner</option>
                            </select>
                            <input value={state?.price} type="number" placeholder='Price' name="price" onChange={handleState} />
                            <input value={state?.length} type="number" placeholder='Length' name="length" onChange={handleState} />
                            <input value={state?.breadth} type="number" placeholder='Breadth' name="breadth" onChange={handleState} />
                            <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', gap: '12px', width: '50%' }}>
                                <label htmlFor='photo'>Picture of the product<AiOutlineFileImage /></label>
                                <input
                                    type="file"
                                    id='photo'
                                    style={{ display: 'none' }}
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                />
                                {photo && <p>{photo.name}</p>}
                            </div>
                            <button>List product</button>
                        </form>
                        <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
                    </div>
                </div>
            }

            {error && (
                <div className={classes.error}>
                    <span>All fields must be filled!</span>
                </div>
            )}

        </div>
    )
}

export default Navbar
