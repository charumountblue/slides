import React, { PureComponent } from 'react';
import Header from './Header';
import HomepageBody from './Homebody/HomeBody'

class homepage extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <HomepageBody/>
      </div>
    );
  }
}

export default homepage;