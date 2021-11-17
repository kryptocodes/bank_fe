import { NextPage } from 'next';
import React from 'react'
import Index from '../src/components/landing';

interface indexProps {

}

const index: NextPage = ({}) => {
    return (
      <>
        <Index/>
      </>
    );
}

export default index