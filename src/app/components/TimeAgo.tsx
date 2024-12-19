'use client';
import ReactTimeAgo from 'react-timeago';

export default function TimeAgo({createdAt}:{createdAt:string}) {
  return (
    <>
      <ReactTimeAgo date={createdAt}/>
    </>
  );
}
//npm install react-timeago
//npm install --save-dev @types/react-timeago