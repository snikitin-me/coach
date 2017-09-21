import React from "react";

export default class Subtitles extends React.Component {
  constructor() {
    super();
    
    this._article = null;
    this._fragmentIndex = -1;
  }


  componentDidMount() {
    // return fetch(this.props.fileUrl)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this._article = responseJson;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    this._article = INTERACTIVE_TRANSCRIPT_CONFIG.data
  }

  componentDidUpdate(prevProps, prevState){
    this.highlightFragment(this.props.time);
  }

  highlightFragment(time){
    var curIndex = this.searchIndexByTime(time, this.getFragments());

    if(curIndex > -1 && this._fragmentIndex != curIndex){

      var lastSpan = document.querySelector(`.talk-transcript__fragment[data-index="${this._fragmentIndex}"]`);
      // unselect last 
      if(lastSpan) {
        lastSpan.className = lastSpan.className.replace(/\sselected\b/, "");
      }
      var newSpan =  document.querySelector(`.talk-transcript__fragment[data-index="${curIndex}"]`);
      newSpan.className += " selected";

      this._fragmentIndex = curIndex;
    }
  }

  searchIndexByTime(t, A) {
      var i = 0,
          j = A.length,
          k;

      while (i < j) {
          k = Math.floor((i + j) / 2);
          if (t <= A[k].from) j = k;
          else i = k + 1;
      }

      if(i>0) i--;

      if (A[i].from <= t && A[i].to >= t) return i;
      else return -1;
  }

  getArticles() {
    return this._article;
  }

  getFragments(){
    return this._article[0].fragments;    
  }

  render() {

    var articles = "";
    if(this.getArticles()){
    	articles = this.getArticles().map((article) => {

    	  	const fragments = article.fragments.map((fragment, index) => {
           return <span class="talk-transcript__fragment" data-index={index} key={index}>{fragment.text}</span>
          });

          const divStyle = {
            color: 'blue'
          };

          return <p style={divStyle} class="talk-transcript__para" key={article.time}>
            			<data class="talk-transcript__para__time">
            				{article.time}
            			</data>
            			<span class="talk-transcript__para__text">
            				{fragments}
            			</span>
            		</p>;
      });
    }

    return (
      <div>{this.props.time}
      <div class="talk-article__body talk-transcript__body">
	    {articles}
	   </div>
	   </div>
    );
  }
}
