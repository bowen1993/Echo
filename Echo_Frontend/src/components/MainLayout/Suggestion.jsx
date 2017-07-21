import React, { Component } from 'react';
import { connect } from 'dva';

class Suggestions extends Component {
  componentDidMount() {
    this.props.onGetSuggestions();
  }

  render() {
    return (
      <div>
        This is suggestion
        {this.props.suggestions}
      </div>
    );
  }
}

const mapStateToProps = ({ questions }, ownProps) => {
  return {
    suggestions: questions.suggestions,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGetSuggestions: () => {
      dispatch({ type: 'questions/onSuggest' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
