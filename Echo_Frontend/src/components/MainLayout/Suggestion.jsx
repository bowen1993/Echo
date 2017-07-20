import React, { Component } from 'react';
import { connect } from 'dva';
import Preview from 'Questions/Preview';
import _ from 'lodash';

class Suggestions extends Component {
  componentDidMount() {
    this.props.onGetSuggestions();
  }

  render() {
    return (
      <div>
        This is suggestion
        {JSON.stringify(this.props.suggestions)}
        {
          _.map(this.props.suggestions, (suggestion, i) => {
            return <Preview key={i} suggestion={suggestion} />;
          })
        }
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
