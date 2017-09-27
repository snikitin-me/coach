import React from "react";
export default class Subtitles extends React.Component {
  constructor() {
    super();
    this.state={
      article:INTERACTIVE_TRANSCRIPT_CONFIG.data || [],
      index:-1,
    }
  }

  componentWillUpdate(nextProps, nextState) {
   this.searchIndexByTime(nextProps.time, this.state.article[0].fragments);
  }

  shouldComponentUpdate(nextProps, nextState) {
    
    if(this.state.index!==nextState.index){
      return true;
    }
    if(this.props.time!==nextProps.time){
      return true;
    }
    return false
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

      if (A[i].from <= t && A[i].to >= t) return this.setState({index:i});
      else return this.setState({index:-1});
  }

  render() {
    var articles = this.state.article.map((article) => {

    	  	const fragments = article.fragments.map((fragment, index) => {
           return <span class={"talk-transcript__fragment " + (index===this.state.index?"selected":"")} data-index={index} key={index}>{fragment.text.replace(/>>/,"")}</span>
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
    

    return (
      <div>{this.props.time}
      <div class="talk-article__body talk-transcript__body">
	    {articles}
	   </div>
	   </div>
    );
  }
}
