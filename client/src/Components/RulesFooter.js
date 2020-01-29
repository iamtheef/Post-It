import React from "react";

export default function RulesFooter(props) {
  const { post } = props;

  return (
    <div className="tile is-ancestor pr is-marginless">
      <div className="is-vertical is-4 pr">
        <div className="pr">
          <div className="is-parent is-vertical pr">
            <div className="column is-12 com-footer-upper"></div>
            <article className="tile is-child notification content pr rule-font">
              <div className="tile is-child pr">
                <h4>{post.community.name} RULES</h4>
                <ol>
                  <li>Respect everyone</li>
                  <hr
                    className="is-child pr hr"
                    style={{ marginBottom: "1vh" }}
                  ></hr>
                  <li>Always talk nicely</li>
                  <hr
                    className="is-child pr hr"
                    style={{ marginBottom: "1vh" }}
                  ></hr>
                  <li>Remember the human</li>
                  <hr
                    className="is-child pr hr"
                    style={{ marginBottom: "1vh" }}
                  ></hr>
                  <li>Be on-topic</li>
                  <hr
                    className="is-child pr hr"
                    style={{ marginBottom: "1vh" }}
                  ></hr>
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
