import React from 'react';

import { NextPageWithAuth } from 'next';

export type Props = {
  className?: string;
};

const Restricted: NextPageWithAuth<Props> = () => {
  return (
    <React.Fragment>
      <h1>RESTRICTED</h1>
    </React.Fragment>
  );
};

Restricted.auth = {
  isRestricted: true,
};

export default Restricted;
