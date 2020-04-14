import React, { useEffect } from "react";
import './App.css'

class App extends React.Component {
  constructor() {
    console.log("Constructor running");
    super();
    this.state = {
      gitcard: {},
      gittext: "",
      followers: [],
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch(`https://api.github.com/users/CWC-88`)
      .then((res) => res.json())
      .then((ppl) => {
        console.log("ppl: ", ppl);
        this.setState({ ...this.state, gitcard: ppl });
        fetch(`${ppl.followers_url}`)
          .then((res) => res.json())
          .then((ppls) => this.setState({ ...this.state, followers: ppls }))
          .catch((err) => console.log("Err: ", err));
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");

    // update the state
    console.log(prevState);

    if (prevState.gitcard !== this.state.gitcard) {
      this.fetchgit();
      console.log("ppl", this.state.followers);
    }
  }

  handleChanges = (e) => {
    this.setState({ gittext: e.target.value });
    console.log("this.state.gittext: ", this.state.gittext);
  };

  fetchgit = (e) => {
    console.log("ran");

    fetch(`${this.state.gitcard.followers_url}`)
      .then((res) => res.json())
      .then((ppls) => this.setState({ ...this.state, followers: ppls }))
      .catch((err) => console.log("Err: ", err));
    console.log(this.state.followers);
  };

  render() {
    return (
      <div>
        <h1 className='headers'>Hello githubpeople!</h1>
        {/* <input
          type="text"
          value={this.state.gittext}
          onChange={this.handleChanges}
        /> */}
        {/* <button onClick={this.fetchgit}>Fetch gitppl</button> */}

        <div className="user">
          {this.state.followers.map(item =>{
            return(
              <p>
                {item.login}
              </p>
            )
          })}
        </div>

        <div className='jyhbjhbhj'>
          <p className='ppppp'>{this.state.gitcard.login}</p>
          <p className='mvmvmvmv'>{this.state.gitcard.followers}</p>
        </div>
      </div>
    );
  }
}

export default App;
