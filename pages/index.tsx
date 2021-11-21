import { NextPage } from 'next';
import React from 'react'
import Wrapper from '../src/components/common/Wrapper';
import Index from '../src/components/landing';


const index: NextPage = ({}) => {
    return (
      <>
        <Wrapper>
        <Index/>
        </Wrapper>
      </>
    );
}

export default index