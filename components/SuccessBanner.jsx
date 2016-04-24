import React from 'react';
import Appbar from 'muicss/lib/react/appbar';

const appBarStyle = {
  sentBannerStyle: {
    display: 'block',
    backgroundColor:'#00A9E0',
  },
  noBannnerStyle: {
    display: 'none'
  }
}

const SuccessBanner = (props) => {
  const {bannerState} = props;

  return (
    <div>
      <Appbar style={bannerState ? appBarStyle.sentBannerStyle : appBarStyle.noBannnerStyle} >
        <div className="mui--text-center mui--appbar-height mui--appbar-line-height">
          Thank you, your form has been sent.
          <h5>{bannerState}</h5>
        </div>
      </Appbar>
    </div>
  )
}

export default SuccessBanner;
