/*
* GIPHY API GIF SEARCH ONE PAGE APP
* STEPHEN WILLIAMS
* http://github.com/stephenwilli
* 
*/
  
  'use strict';
  
  /*
  * GifSearch Class 
  * @prop this.state.value - holds the value of the entered search
  * @prop handleSubmit - 
  * @prop searchQuery - sets the this.state.value with the value input from the form
  * @render - Returns a simple search form with one input and one button
  */
  
  class GifSearch extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        value: ""
      }
      
      this.handleSubmit = this.handleSubmit.bind(this);
      this.searchQuery = this.searchQuery.bind(this);
    }
  
    handleSubmit(event){
      event.preventDefault();
      console.log(this.state.value);
      this.props.onSearch(this.query.value);
    }
    
    searchQuery(event){
      this.setState({
        value: event.target.value
      });
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
  
  /*
  * GifDisplay class
  * @prop this.state.gifs - holds an array of gifs 
  * @prop performSearch - passes in the query from the form into the GiphyApi url 
  *                       fetches that URL with 24 matches
  *                       returns the data, parses into json and pushes that into the this.state.gifs array
  * @render - turns each data from the array into a grid of gifs using the url of the source image
  *           returns the GifSearch class above the grid of gifs
  */          
  
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

// Render the GifDisplay class to the DOM elemenet ID# gif-wrapper

ReactDOM.render(<GifDisplay />, document.getElementById('gif-wrapper'));
