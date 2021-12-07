import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
// api
const url = 'https://course-api.com/react-tours-project'

const Tours = () => {
  // state values
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [end, setEnd] = useState(200)
  const [data, setData] = useState()

  // fetching data from the api using axios
  const getData = async () => {
    try {
      const res = await axios.get(url)
      setData(res?.data)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setIsError(true)
    }
  }
  // console.log(data)

  // function that refreshes the page
  const refreshData = () => {
    setIsLoading(true)
    getData()
  }

  // useEffect
  useEffect(() => {
    getData()
  }, [])

  // read more toggle function
  const clickBtn = useCallback(
    (text) => {
      if (end === text.length) {
        setEnd(200)
      } else {
        setEnd(text.length)
      }
    },
    [end]
  )

  // not interested function
  const notInterested = useCallback(
    (id) => {
      setData(data.filter((item) => item.id !== id))
    },
    [data]
  )

  // conditional rendering
  if (isLoading) {
    return (
      <div className='is-loading'>
        <h1 className='heading heading-res'>Loading...</h1>
      </div>
    )
  }
  if (isError) {
    return (
      <div className='is-error'>
        <h1 className='heading heading-res'>Error...</h1>
      </div>
    )
  }

  return (
    <article className='wrapper'>
      <div className='head'>
        <h2 className='heading'>
          {' '}
          {data && data.length === 0 ? 'No Tours Left' : 'Our Tours'}{' '}
        </h2>
        {data && data.length === 0 ? (
          <></>
        ) : (
          <div className='heading-underline'></div>
        )}
      </div>
      <div className='content'>
        {data &&
          data.map(({ id, name, info, image, price }) => {
            return (
              <div className='card' key={id}>
                <div>
                  <img src={image} alt='' className='card-img' />
                  <div className='card-content'>
                    <div className='card-head'>
                      <h6 className='desc'>{name}</h6>
                      <h6 className='desc-pricing'>${price}</h6>
                    </div>
                    <p>
                      {info.substring(0, end)}
                      <i onClick={() => clickBtn(info)}>
                        {end === info.length ? '  show less' : '... read more'}
                      </i>
                    </p>
                    <div className='button'>
                      <button
                        className='card-btn'
                        onClick={() => notInterested(id)}
                      >
                        Not Interested
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      {data && data.length === 0 ? (
        <div className='refresh' style={{ marginTop: '-1.5rem' }}>
          <button className='refresh-btn' onClick={refreshData}>
            Refresh
          </button>
        </div>
      ) : (
        <></>
      )}
    </article>
  )
}

export default Tours
