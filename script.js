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
      console.log(this.state.value);
      this.props.onSearch(this.query.value);
    }
    
    render() {
      
      return(
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input type="search" name="search" placeholder="Search GIFs..." ref={(input) => this.query = input} value={this.state.value} onChange={this.searchQuery}/>
          <button type="submit" id="submit" className="search-button">GO</button>
        </form>
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
  
    let gifList = [];
    this.state.gifs.forEach((image, index) => {
      gifList.push(
        <img className="gif-frame" key={index} src={image.images.fixed_width.webp} />
      );
    });
    
    return(
      <div>
        <GifSearch onSearch={this.performSearch}/>
        <div className="gif-list">
          {gifList}
        </div>
      </div>
    )
    
  }
}

ReactDOM.render(<GifDisplay />, document.getElementById('gif-wrapper'));
