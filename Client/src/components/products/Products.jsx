import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { useState } from 'react'
import { arrPriceRanges } from '../../util/idxToPriceRange'
import classes from './products.module.css'
import { useEffect } from 'react'
import { continentToIdx } from '../../util/idxToContinent'
import { request } from '../../util/fetchAPI'
import person from '../../bgdimages/person.jpg'
import { RxHeight, RxWidth } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const Products = () => {

    const [allProperties, setAllProperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState([])
    const [state, setState] = useState(null)
    const query = (useLocation().search).slice(1) // slice(1) to remove "?"
    const arrQuery = query.split("&")
    const navigate = useNavigate()

    // fetch all properties
    useEffect(() => {
        const fetchAllProperties = async () => {
            const data = await request(`/product/getAll`, 'GET')
            setAllProperties(data)
        }
        fetchAllProperties()
    }, [])

    // console.log(allProperties);
    // console.log(arrQuery);
    // console.log(state);


    //parsing query params
    useEffect(() => {
        if (arrQuery && allProperties?.length > 0 && state === null) {
            let formattedQuery = {}
            arrQuery.forEach((option, idx) => {
                const key = option.split("=")[0]
                const value = option.split("=")[1]

                formattedQuery = { ...formattedQuery, [key]: value }

                // if we are on the last index, assign the formattedQuery obj to state
                if (idx === arrQuery.length - 1) {
                    //console.log(formattedQuery)
                    setState(formattedQuery)
                    handleSearch(formattedQuery)
                }
            })
        }
    }, [allProperties, arrQuery])

    const handleState = (e) => {
        setState(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }


    const handleSearch = (param = state) => {
        let options
        // we either pass the formattedObj or event, that's why we do the IF/ELSE
        if (param?.nativeEvent) {
          options = state
        } else {
          options = param
        }
    
        const filteredProperties = allProperties.filter((property) => {
    
          const priceRange = arrPriceRanges[options.priceRange]
          const minPrice = Number(priceRange.split('-')[0])
          const maxPrice = Number(priceRange.split('-')[1])
        //   console.log(typeof(property.owner))
          //const owner = continentToIdx(options.owner)
        //   console.log(owner)
          
        // console.log(typeof(options.owner));
          if (
            property.type === options.type
            && property.owner === Number(options.owner)
            && property.price >= minPrice && property.price <maxPrice
          ) {
            console.log("Hi");
            return property;
          }
        })


        const queryStr = `type=${options.type}&owner=${options.owner}&priceRange=${options.priceRange}`
    
        navigate(`/product?${queryStr}`, { replace: true })
        setFilteredProperties(filteredProperties)
      }

      console.log(filteredProperties);

    return (
        <div className={classes.container}>
       <div className={classes.wrapper}>
        <div className={classes.options}>
          <select value={state?.type} name="type" onChange={handleState}>
            <option disabled>Select type</option>
            <option value="sofa">Sofa</option>
            <option value="bed">Bed</option>
            <option value="chair">Chair</option>
          </select>
          <select value={state?.priceRange} name="priceRange" onChange={handleState}>
            <option disabled>Select Price Range</option>
            <option value="0">0-5000</option>
            <option value="1">5000-50000</option>
            <option value="2">50000-100,000</option>
            <option value="3">100,000-500,000</option>
            <option value="4">500,000-1000,000</option>
          </select>
          <select value={state?.owner} name="owner" onChange={handleState}>
            <option disabled>Select Type of Owner</option>
            <option value="0">Fresh</option>
            <option value="1">First Owner</option>
            <option value="2">Second Owner</option>
            <option value="3">Third Owner</option>
          </select>
          <button className={classes.searchBtn}>
            <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
          </button>
        </div>
        {filteredProperties?.length > 0 ?
          <>
            <div className={classes.titles}>
              <h5>Selected products</h5>
              <h2>Products you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((product) => (
                <div key = {product._id} className={classes.property}>
                  <Link className={classes.imgContainer} to={`/productDetail/${product._id}`}>
                    <img src={`http://localhost:5000/images/${product?.img}`} alt="" />
                  </Link>
                  <div className={classes.details}>
                    <div className={classes.priceAndOwner}>
                      <span className={classes.price}>${product.price}</span>
                      {/* <img src={person} className={classes.owner}></img> */}
                    </div>
                    <div className={classes.moredetails}>
                    <span>Length:{product.length} <RxHeight className={classes.icon} /></span>
                    <span>Breadth:{product.breadth} <RxWidth className={classes.icon} /></span>
                    </div>
                    <div className={classes.desc}>
                    {product.desc}
                    </div>
                  </div>
                  </div>
              ))}
            </div>
              </> : <h2 className={classes.noProperty}>We have no products with the specified options.</h2>}
      </div>
    </div>
    )
}

export default Products

