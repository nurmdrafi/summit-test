import Head from "next/head"
import React from "react"

// Interface
interface PropTypes {
  title: string;
  description?: string;
  keywords?: string;
}

const Meta: React.FC<PropTypes> = ({ title, description, keywords }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={ description } />
      <meta name="keywords" content={ keywords } />
    </Head>
  )
}

export default Meta
