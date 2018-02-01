import React, { Component } from 'react';
import GithubCorner from 'react-github-corner';

class Corner extends Component {
  render() {
    return (
      <GithubCorner 
      	size="70"
      	octoColor="#f9f9de"
      	bannerColor="#e5e4c7"
      	href="https://github.com/DushanT/Poki" />
    );
  }
}

export default Corner;