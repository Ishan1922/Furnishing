import React from 'react'
import { Link } from 'react-router-dom'
import classes from './popularProducts.module.css'
import img1 from '../../bgdimages/typesofa.webp'
import img2 from '../../bgdimages/typebed.webp'
import img3 from '../../bgdimages/typechair.webp'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'

const PopularProducts = () => {
  const [sofaProducts, setSofaProducts] = useState(0)
  const [bedProducts, setBedProducts] = useState(0)
  const [chairProducts, setChairProducts] = useState(0)

  useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/product/find/types', 'GET')

         setSofaProducts(data.sofa)
         setBedProducts(data.bed)
         setChairProducts(data.chair)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPropertiesNumber()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h2>Some popular products for you</h2>
        </div>
        <div className={classes.properties}>
          <Link to={`/product?type=sofa&owner=1&priceRange=1`} className={classes.property}>
            <img src={img1} alt=""/>
            <div className={classes.quantity}>{sofaProducts} products</div>
            <h5>Sofa Sets</h5>
          </Link>
          <Link to={`/product?type=bed&owner=1&priceRange=1`} className={classes.property}>
            <img src={img2} alt=""/>
            <div className={classes.quantity}>{bedProducts} products</div>
            <h5>Kingsize Double Beds</h5>
          </Link>
          <Link to={`/product?type=chair&owner=0&priceRange=1`} className={classes.property}>
            <img src={img3} alt=""/>
            <div className={classes.quantity}>{chairProducts} products</div>
            <h5>Leather Chairs</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProducts