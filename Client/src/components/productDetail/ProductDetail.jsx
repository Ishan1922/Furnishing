import React from 'react'
import classes from './productDetail.module.css'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { request } from '../../util/fetchAPI'
import { useRef } from 'react'
import { RxHeight, RxWidth } from 'react-icons/rx'
import {AiOutlineClose} from 'react-icons/ai'
import emailjs from '@emailjs/browser'
import person from '../../bgdimages/person.jpg'
import { idxToContinent } from '../../util/idxToContinent'

const ProductDetail = () => {

    const { token, user } = useSelector((state) => state.auth)
    const [propertyDetail, setPropertyDetail] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [desc, setDesc] = useState("")
    // todo display message
    const { id } = useParams()
    const formRef = useRef()
    const navigate = useNavigate()


    const serviceId = process.env.REACT_APP_SERVICE_ID
    const templateId = process.env.REACT_APP_TEMPLATE_ID
    const publicKey = process.env.REACT_APP_PUBLIC_KEY


    useEffect(() => {
        const fetchDetails = async () => {
          try {
            const data = await request(`/product/find/${id}`, "GET")
            // setIsBookmarked(data?.bookmarkedUsers?.includes(user?._id))
            setPropertyDetail(data)
          } catch (error) {
            console.error(error)
          }
        }    
        fetchDetails()
      }, [id])

      const handleCloseForm = () => {
        setShowForm(false)
        setDesc('')
      }
    
      const handleContactOwner = async (e) => {
        e.preventDefault()

         emailjs.sendForm('service_hkn0zd4', 'template_xlhhsvq', formRef.current, 'j9nu58ybyf5QxA5Z-')
        .then((result) => handleCloseForm())
        .catch((err) => console.log(err))
      }


  return (
    <div className={classes.container}>
      <h3 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '32px', marginTop: '-2.5rem' }}>Product Details</h3>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:5000/images/${propertyDetail?.img}`} alt=""/>
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {`${propertyDetail?.title}`}
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndContinent}>
              <div>Type: <span>{`${propertyDetail?.type}`}</span></div>
              <div>Type of Ownership: <span>{`${idxToContinent(propertyDetail?.owner)}`}</span></div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price}><span>Price: $ </span>{`${propertyDetail?.price}`}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                Owner: {propertyDetail?.currentOwner?.profileImg
                  ? (
                    <img src={`http://localhost:5000/images/${propertyDetail?.currentOwner?.profileImg}`} alt='' className={classes.owner} />
                  ) : (
                    <img src={person} className={classes.owner} alt=''/>)
                }</span>
            </div>
            <div className={classes.moreDetails}>
              <span>Length: {propertyDetail?.length}  <RxHeight className={classes.icon} /></span>
              <span>Breadth: {propertyDetail?.breadth} <RxWidth className={classes.icon} /></span>
            </div>
          </div>
          <p className={classes.desc}>
            Desc: <span>{`${propertyDetail?.desc}`}</span>
          </p>
           <button onClick={() => setShowForm(true)} className={classes.contactOwner}>
            Contact Owner
           </button>
        </div>
      </div>
      {
        showForm &&
        <div className={classes.contactForm} onClick={handleCloseForm}>
          <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
            <h2>Send Email To Owner</h2>
            <form onSubmit={handleContactOwner} ref={formRef}>
              <input value={user?.email} type="text" placeholder='My email' name="from_email" />
              <input value={user?.username} type="text" placeholder='My username' name="from_username" />
              <input value={propertyDetail?.currentOwner?.email} type="email" placeholder='Owner email' name="to_email" />
              <input value={desc} type="text" placeholder='Desc' name="message" onChange={(e) => setDesc(e.target.value)} />
              <button>Send</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
          </div>
        </div>
      }
    </div>
  )
}

export default ProductDetail
