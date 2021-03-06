import React, { Component } from 'react';
import './AppContainer.scss';
import { connect } from 'react-redux';
import { getFilename } from '../../selectors/image';
import ImageBox from '../ImageBox/ImageBox';
import Toolbox from '../Toolbox/Toolbox';
import Loader from '../Loader/Loader';
import { isLoaderShown } from '../../selectors/loader';

class AppContainer extends Component {
  render() {
    const { filename, loaderShown } = this.props;
    return (
      <div className="box">
        <ImageBox filename={filename} />
        {filename && <Toolbox />}
        {loaderShown && <Loader withBackdrop />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filename: getFilename(state),
    loaderShown: isLoaderShown(state)
  };
}

export default connect(mapStateToProps)(AppContainer);
