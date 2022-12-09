import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import LoadingBar from 'react-top-loading-bar'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

  constructor() {
    super()
    this.state = {
      articles: [],
      page: 0,
      totalResults: 1,
      loading: true,
      progress: 0
    }
  }

  fetchData = async () => {
    this.setState({
      loading: true
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
    const response = await fetch(url)
    const data = await response.json()
    this.setState({
      articles: this.state.articles.concat(data.articles),
      page: this.state.page + 1,
      loading: false
    })
  }

  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
    const response = await fetch(url)
    this.setState({
      progress: 50
    })
    const data = await response.json()
    this.setState({
      articles: data.articles,
      page: this.state.page + 1,
      totalResults: data.totalResults,
      progress: 100,
      loading: false
    })
    document.title = `NewsItIs: ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`
  }

  render() {
    return (
      <>
        {this.state.loading && <LoadingBar
          color='#f11946'
          progress={this.state.progress}
          onLoaderFinished={() => this.setState({ progress: 0 })} />
        }
        <h2 className='font-medium leading-tight text-4xl my-4 mb-4 text-blue-600 text-center'>{`${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} headines in ${this.props.country.toUpperCase()}`}</h2>
        <div className="">
          <InfiniteScroll
            className='hey flex flex-wrap items-center justify-center'
            dataLength={this.state.articles.length}
            next={this.fetchData}
            hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={<div className='block'><Spinner /></div>}
          // endMessage={
          //   <p className='block text-center text-xl mb-2'>
          //     <b>You have seen it all</b>
          //   </p>
          // }
          >
            {
              this.state.articles.map((element) => {
                return <Newsitem key={element.url} title={element.title} description={element.description} author={element.author} date={element.publishedAt} url={element.url} imageurl={element.urlToImage} source={element.source.name} />
              })
            }
          </InfiniteScroll>
          {
            this.state.loading && <div className='flex justify-center'><Spinner /></div>
          }
          {
            this.state.articles.length === this.state.totalResults && <p className='text-center text-xl mb-2'>You have seen it all!</p>
          }
        </div>
      </>
    )
  }
}

News.propTypes = {
  apikey: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired
}

News.defaultProps = {
  category: "general",
  pageSize: 12,
  country: "in"
}

export default News