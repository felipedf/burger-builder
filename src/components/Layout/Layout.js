import React from 'react';

const layout = (props) => (
  <React.Fragment>
    <div></div>
    <main>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;
