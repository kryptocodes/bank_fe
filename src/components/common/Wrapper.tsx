import React from 'react'
import Head from 'next/head'

interface WrapperProps {
    children: React.ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({children}) => {
    const HeadSEO = () => (
        <Head>
            <title>{'BankFE'}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="BankFE" />
            <meta name="keywords" content="BankFE" />
            <meta name="author" content="BankFE" />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="revisit-after" content="1 days" />
            <meta name="language" content="en" />
            <meta name="distribution" content="global" />
            <meta name="rating" content="general" />
            <meta name="expires" content="never" />
        </Head>
    )
    
    return (
        <>
        <HeadSEO/>
        {children}  
        </>);
}

export default Wrapper