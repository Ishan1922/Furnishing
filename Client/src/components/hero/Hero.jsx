import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import classes from './hero.module.css'

const Hero = () => {
  const [type, setType] = useState("sofa")
  const [owner, setOwner] = useState("0")
  const [priceRange, setPriceRange] = useState("0")
  const navigate = useNavigate()

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(`/product?type=${type}&owner=${owner}&priceRange=${priceRange}`)
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>One stop solution for all your Furniture items</h2>
        <h5>Search the best selection of luxurious products</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select type</option>
            <option value="sofa">Sofa</option>
            <option value="bed">Bed</option>
            <option value="chair">Chair</option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select Price Range</option>
            <option value="0">0-5,000</option>
            <option value="1">5,000-50,000</option>
            <option value="2">50,000-1,00,000</option>
            <option value="3">1,00,000-5,00,000</option>
            <option value="4">5,00,000-10,00,000</option>
          </select>
          <select onChange={(e) => setOwner(e.target.value)}>
            <option disabled>Select Type of Owner</option>
            <option value="0">Fresh</option>
            <option value="1">First Owner</option>
            <option value="2">Second Owner</option>
            <option value="3">Third Owner</option>
          </select>
          <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon}>Search</AiOutlineSearch>
        </div>
      </div>
    </div>
  )
}

export default Hero