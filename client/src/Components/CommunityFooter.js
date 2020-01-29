import React from "react";

export default function CommunityFooter(props) {
  const { post } = props;

  return (
    <div className="tile is-ancestor pr is-marginless">
      <div className="is-vertical is-4 pr">
        <div className="pr">
          <div className="is-parent is-vertical pr">
            <div className="column is-12 com-footer-upper"></div>
            <article className="tile is-child notification content pr">
              <div className="columns">
                <img
                  src={post.community.img}
                  alt="comImage"
                  style={{
                    maxHeight: "10vh",
                    minHeight: "10vh",
                    maxWidth: "5vw",
                    borderRadius: "200%"
                  }}
                  className="tile is-child pr column is-6"
                ></img>
                <h4 className="tile is-child pr column is-6">
                  p/{post.community.name}
                </h4>
              </div>

              <hr
                className="is-child pr hr"
                style={{ marginBottom: "1vh" }}
              ></hr>

              <div className="is-child pr">
                <h5>Community Description</h5>
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                </p>

                <div className="columns">
                  <div className="column is-6">
                    <h3>1.2k members</h3>
                  </div>
                  <div className="column is-6">
                    <h3>376 online</h3>
                  </div>
                </div>
                <hr
                  className="is-child pr hr"
                  style={{ marginBottom: "1vh" }}
                ></hr>

                <p>
                  <i
                    class="fas fa-birthday-cake"
                    style={{ marginRight: "10px" }}
                  ></i>
                  Created Jun 14, 2012
                </p>
                <button className="button join-btn">JOIN</button>
              </div>

              <button
                className="button join-btn"
                aria-haspopup="true"
                aria-controls="dropdown-menu2"
              >
                <span>COMMUNITY OPTIONS</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
