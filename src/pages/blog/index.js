import React, { useEffect, useState } from 'react'

import dataBlog from '../../../content/blog.json';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Division from '../../components/division';
import InternalPageHero from '../../components/internal-page-hero';
import BlogHeader from '../../components/blog-header';
import { apiPlugin, storyblokInit, useStoryblokState } from 'gatsby-source-storyblok';
import { graphql } from 'gatsby';


const Blog = ({ data }) => {

  const title = "Democracia en Red | Blog";
  const description = "Conocé nuestras novedades";
  const robot = "noindex"

  useEffect(() => {
    
    storyblokInit({
      accessToken: process.env.STORYBLOK_TOKEN,
      use: [apiPlugin],
      components: {}
    });

  }, [])
  
  let posts = data.allStoryblokEntry.edges.map((edge) => useStoryblokState(edge.node))

  let tags = data.allStoryblokTag.edges.map((tag) => tag.node)

  return (
    <React.Fragment>
      <Layout style={{ margin: 50 }}>
        <SEO title={title} description={description} robot={robot} />
        <InternalPageHero data={dataBlog} background={"pink"} />
        <Division />
        <BlogHeader data={dataBlog} posts={posts} tags={tags}/>
      </Layout>
    </React.Fragment>
  )
}

export const query = graphql`
  {
    allStoryblokTag {
      edges {
        node {
          name
          taggings_count
        }
      }
    }
    allStoryblokEntry(filter: {field_component: {eq: "post"}}) {
      edges {
        node {
          name
          content
          tag_list
          full_slug
          published_at
        }
      }
    }
  }
`

export default Blog