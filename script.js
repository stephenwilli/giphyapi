'use strict';

  class GifSearch extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        value: ""
      }
      
      this.handleSubmit = this.handleSubmit.bind(this);
      this.searchQuery = this.searchQuery.bind(this);
    }
    
    searchQuery(event){
      this.setState({
        value: event.target.value
      });
    }
    
    handleSubmit(event){
      event.preventDefault();
      this.setState({
        value: event.target.value
      });
      console.log(this.state.value);
      this.props.onSearch(this.query.value);
    }
    
    render() {
      
      return(
        <div>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input type="search" name="search" placeholder="Search GIFs..." ref={(input) => this.query = input} value={this.state.value} onChange={this.searchQuery}/>
            <button type="submit" id="submit" className="search-button"><i className="fa fa-fw fa-search"></i></button>
          </form>
        </div>
      )
    
    }
  }
  
  class GifDisplay extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        gifs: []
      }
      this.performSearch = this.performSearch.bind(this);
    }
      
  componentWillMount(){
    this.performSearch();
  }
  
  performSearch(query){
    let url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=1S71I5aax6sXjhzv10ZAVnQRuejRdVPG&limit=24`;
    
    fetch(url).then((result) => {
      return result.json();
    }).then((response) => {
        console.log(response)
        this.setState({
          gifs: response.data
        })
    });
  }

  render() {
  
    let gifGrid = [];
    this.state.gifs.forEach((image, index) => {
      gifGrid.push(
        <div key={index} className="gif-frame">
          <div className="overlay"></div>
          <div className="share-wrap">
            <div className="caption">
              <h3>Share</h3>
              <ul>
                <li><i className="fa fa-fw fa-external-link"></i></li>
                <li><i className="fa fa-fw fa-facebook"></i></li>
                <li><i className="fa fa-fw fa-twitter"></i></li>
              </ul>
            </div>
          </div>
          <img src={image.images.fixed_width.url} />
        </div>
      );
    });
    
    return(
      <div>
        <GifSearch onSearch={this.performSearch}/>
        <div className="gif-grid">
          {gifGrid}
        </div>
      </div>
    )
    
  }
}

ReactDOM.render(<GifDisplay />, document.getElementById('gif-wrapper'));
