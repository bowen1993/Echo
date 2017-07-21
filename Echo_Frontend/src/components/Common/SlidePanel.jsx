import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import style from './SlidePanel.less';

const panelStack = [];

export default class SlidePanel extends React.Component {
  componentDidMount() {
    this.escHandler = (e) => {
      if (e.keyCode === 27 && this.props.lightboxIsOpen === false) {
        this.props.onCancel(false);
      }
    };
    document.body.addEventListener('keydown', this.escHandler);
  }
  componentWillUnmount() {
    _.remove(panelStack, o => o === this);
    document.body.removeEventListener('keydown', this.escHandler);
  }
  render() {
    const { className, visible, children, noPadding } = this.props;
    const classes = classNames(
      `${style.sidePanel}`,
      className,
      { visible, 'no-padding': noPadding },
    );

    return (
      <div className={classes} id='side-panel'>
        {children}
      </div>
    );
  }
}

const mapStateToProps = ({ common: { slidePanel } }, ownProps) => {
  return {
    visible: slidePanel.visible,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    change: () => {
      dispatch(actionCreator);
    },
  };
};
