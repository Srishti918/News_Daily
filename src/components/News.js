import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    
    static defaultProps={
        country: "in",
        pageSize: 6,
        category: "general",

    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1
            

        }
        document.title=`${this.props.category}-NewsDaily`;
    }
    async updateNews(){
        console.log("Previous");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dc064fe501614b6991e192d015dc1b50&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            
            articles: parsedData.articles,
            loading: false
        })
    }
    async componentDidMount(){
         document.body.style.backgroundColor = "#bcdbdf"
        this.updateNews();

    }
    handlePreviousClick=async ()=>{
        this.setState({page: this.state.page - 1});
        this.updateNews();

    
        }
    handleNextClick=async ()=>{
        this.setState({page: this.state.page + 1});
        this.updateNews();
        
    }
  render() {
    return (
        
      <div className="container my-3" style={{backgroundColor: "#bcdbdf"}}>
        <h1 className='text-center' style={{margin: '30px 0px'}}>NewsDaily- Top {this.props.category} HeadLines</h1>
            {this.state.loading && <Spinner/>}
            <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{ 
                return <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title?element.title.slice(0,60):""} description={element.description?element.description.slice(0,150):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
                })}
                
                
            </div>
            <div className="container d-flex justify-content-between " >
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

            </div>
      </div>
      
    )
  }
}

export default News
