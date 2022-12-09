import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Newsitem extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    url: PropTypes.string,
    imageurl: PropTypes.string,
    source: PropTypes.string
  }

  render() {
    const { title, description, author, date, url, imageurl, source } = this.props
    return (
      <div className="relative m-4 max-w-md bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <span className='inline-flex w-24 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-2xl absolute top-[-10px] right-[-15px]'>{source}</span>
        <div className='flex justify-center'>
          <img className="rounded-t-lg" src={imageurl ? imageurl : "/news.png"} alt="" />
        </div>
        <div className="p-5">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title ? title.slice(0, 80) + "..." : "News Title. Click on Read More"}</h2>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description ? description.slice(0, 100) + "..." : "News Description. Click on Read More"}</p>
          <div className='flex justify-between'>
            <a href={url} target="blank_" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </a>

            <div className="flex flex-col">
              <span className='font-bold'>
                {author ? author : "Unknown"}
              </span>
              <span>
                {date.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Newsitem