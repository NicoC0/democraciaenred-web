import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useStoryblokState } from "gatsby-source-storyblok"

const StoryblokController = () => {

    const data = useStaticQuery(graphql`
    {
      posts: allStoryblokEntry(
        filter: {field_component: {eq: "post"}}
      ) {
        edges {
          node {
            id
            uuid
            name
            slug
            full_slug
            content
            created_at
          }
        }
      }
    }
  `)

  let content = JSON.parse(data.posts.edges[0].node.content)
  console.log(content.author.name)
  return null
}

export default StoryblokController