import React, { useState, useEffect } from "react";
import { Micromark as mdTransformer } from "../../utils/micromark";
import { dateParse } from "../../utils/DateParse";
import { StoryblockService } from '../../services/StoryblockService';
import "./style.scss";

const BlogContent = ({ post }) => {

  const [authors, setAuthors] = useState([])
  const storyblokInstance = StoryblockService()

  useEffect(() => {
    storyblokInstance.get(`cdn/stories`, {
      version: process.env.STORYBLOK_VERSION,
      starts_with: 'authors/'
    })
      .then((res) => {
        setAuthors(res.data.stories)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const findAuthor = () => {
    if (authors.length > 0) {
      const author = authors.find((author) => author.uuid === post.content.author)
      return author
    }
    return ''
  }
  const currentAuthor = findAuthor()
  console.log(currentAuthor)

  if (Object.keys(post).length > 0) {
    console.log(authors)
    return (
      <section className="blogContent">
        <div
          className="post-banner"
          style={{
            backgroundImage: post.content.banner.filename
              ? `url(${post.content.banner.filename})`
              : `url(https://democraciaenred.org/der-share.png)`,
          }}
        >
          <div className="post-banner-overlay">
            <nav
              class="breadcrumb has-succeeds-separator"
              aria-label="breadcrumbs"
            >
              <ul>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li class="is-active">
                  <a href="#" aria-current="page">
                    {post.content.title}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="section is-small">
          <div className="container">
            <div className="columns post-columns is-multiline">
              <div className="column is-three-quarters-tablet is-four-fifths-desktop">
                <div className="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between is-flex-wrap-wrap">
                  <div className="is-flex is-flex-direction-row">
                    <figure className="image is-96x96 pr-4">
                      <img className="is-rounded" src={currentAuthor.content?.photo?.filename ? currentAuthor.content.photo.filename : `https://democraciaenred.org/der-share.png`} />
                    </figure>
                    <div className="is-flex is-flex-direction-column is-justify-content-center">
                      <p>{currentAuthor.name}</p>
                      <p>{dateParse(post.published_at)}</p>
                    </div>
                  </div>
                  <div>
                    {post.tag_list.length > 0 ?
                      (<div>
                        <b className="is-block">Etiquetas</b>
                        <div className="is-flex is-flex-wrap-wrap tags-wrapper">
                          {post.tag_list.map((tag, index) => (
                            <span
                              key={index}
                              className="tag is-warning is-rounded has-text-black my-1"
                            >
                              {tag}
                            </span>))}
                        </div>
                      </div>) :
                      ""}
                  </div>
                </div>
                <h1 className="pb-4 pt-4">{post.content.title}</h1>
                <h2 className="pb-4 has-text-black">{post.content.description}</h2>
                {post.content.bodymd ? (
                  <article
                    className="post-body"
                    dangerouslySetInnerHTML={{
                      __html: mdTransformer(post.content.bodymd),
                    }}
                    style={{ color: "#000" }}
                  ></article>
                ) : (
                  "Contenido en desarrollo..."
                )}
              </div>
              <div className="column is-one-third-tablet is-one-fifth-desktop">
                <div className="columns is-multiline has-text-right post-info-column">
                  <div className="column is-full-tablet">
                    <figure className="image is-128x128 ml-auto mb-3">
                      <img className="is-rounded" src={currentAuthor.content?.photo?.filename ? currentAuthor.content.photo.filename : `https://democraciaenred.org/der-share.png`} />
                    </figure>
                    <b>{currentAuthor.name}</b>
                    <p className="pb-2">{currentAuthor.content?.role}</p>
                    {currentAuthor.content?.linkedin ? <a href={currentAuthor.content.linkedin} style={{ color: '#0077b5' }} target="_blank" ><i className="fab fa-linkedin fa-2x mx-1" /></a> : ''}
                    {currentAuthor.content?.twitter ? <a href={currentAuthor.content.twitter} target="_blank" ><i className="fab fa-twitter fa-2x mx-1" /></a> : ''}
                  </div>
                  <div className="column is-full-tablet">
                    <p>{currentAuthor.content?.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return <h1>CARGANDO POST</h1>;
};

export default BlogContent;