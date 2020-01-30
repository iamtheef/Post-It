import React from "react";

export default function Footer() {
  return (
    <div
      className="tile is-ancestor is-marginless sticky"
      style={{ marginTop: "140px" }}
    >
      <div className="is-vertical is-4">
        <div className="">
          <div className="is-parent is-vertical">
            <article className="tile is-child notification content">
              <div className="columns">
                <div className="column is-6">
                  <ul>
                    <li>
                      <a>Help</a>
                    </li>
                    <li>
                      <a>App</a>
                    </li>
                    <li>
                      <a>Coins</a>
                    </li>
                    <li>
                      <a>Premium</a>
                    </li>
                    <li>
                      <a>Gifts</a>
                    </li>
                    <li>
                      <a>Communities</a>
                    </li>
                    <li>
                      <a>Top Posts</a>
                    </li>
                    <li>
                      <a>Topics</a>
                    </li>
                  </ul>
                </div>
                <div className="column is-6">
                  <ul>
                    <li>
                      <a>About</a>
                    </li>
                    <li>
                      <a>Carrer</a>
                    </li>
                    <li>
                      <a>Press</a>
                    </li>
                    <li>
                      <a>Advertise</a>
                    </li>
                    <li>
                      <a>Blog</a>
                    </li>
                    <li>
                      <a>Terms</a>
                    </li>
                    <li>
                      <a>Content Policy</a>
                    </li>
                    <li>
                      <a>Privacy Policy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
