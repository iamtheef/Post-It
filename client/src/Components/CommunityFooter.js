import React from "react";

export default function CommunityFooter(props) {
  const { post } = props;

  return (
    <div className="tile is-ancestor pr is-marginless">
      <div className="is-vertical is-4 pr">
        <div className="pr">
          <div className="is-parent is-vertical pr">
            <article className="tile is-child notification content pr">
              <img
                src={post.community.img}
                alt="comImage"
                style={{ maxHeight: "20vh", minWidth: "20vw" }}
                className="tile is-child pr"
              ></img>
              <hr
                className="hr tile is-child pr"
                style={{ marginBottom: "10vh", backgroundColor: "black" }}
              ></hr>

              <div className="tile is-child pr">
                <h3>SUB RULES</h3>
                <ol>
                  <li>Respect everyone</li>
                  <li>Always talk nicely</li>
                  <li>Remember the human</li>
                  <li>Be on-topic</li>
                  <li>{`Your post should include ${post.community.name} material only`}</li>
                </ol>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
