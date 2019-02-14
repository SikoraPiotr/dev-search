import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import './main.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hits: null,
      last_key: '',
    };
  }


  onSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    const cachedHits = localStorage.getItem(value);
    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits) });
      return;
    }


    fetch('https://hn.algolia.com/api/v1/search?query=' + value)
        .then(response => response.json())
        .then(result => this.onSetResult(result, value))

  };

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result.hits));
    this.setState({ hits: result.hits });
  };


  render() {
    return (
        <div>
          <section className="hero is-medium is-primary">
            <div className="hero-body">
              <div className="container">
                <div className="columns">
                  <div className="column is-8-desktop is-offset-2-desktop">
                    <h1 className="title is-2 is-spaced">
                      Search Hacker News
                    </h1>
                    <form className="field is-grouped" type="submit" onSubmit={this.onSearch}>
                      <input className="input" type="text" ref={node => this.input = node} />
                      <button className="button is-info" type="button">Search</button>
                    </form>

                    <p>
                      <small>
                        Last searched key : {localStorage.key(1)}
                      </small>
                    </p>

                    {this.state.hits &&
                      this.state.hits.map(item =>
                         <a key={item.objectID} href={item.url}>
                           <div className="box box-search-tile">
                             <article className="media">
                               <div className="media-content">
                                 <div className="content">
                                   <p>
                                     <strong>{item.title}</strong>
                                     <br/>
                                     Author: {item.author}
                                   </p>
                                 </div>
                               </div>
                             </article>
                           </div>
                         </a>)}
                  </div>
                </div>
              </div>
            </div>
          </section>



          <footer className="footer has-text-centered">
            <div className="container">
              <div className="columns">
                <div className="column is-8-desktop is-offset-2-desktop">
                  <p>
                    <small>
                      Hacker Browser Footer
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
    );
  }
}

export default App;
