import React from 'react';

import { NextPageWithAuth } from 'next';

export type Props = {
  className?: string;
};

const Post: NextPageWithAuth<Props> = ({ className }) => {
  return <React.Fragment></React.Fragment>;
};

Post.auth = true;

export default Post;
