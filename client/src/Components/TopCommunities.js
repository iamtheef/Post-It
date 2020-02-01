import React from "react";

export default function TopCommunities() {
  return (
    <div className="tile is-marginless ">
      <div className="is-vertical is-12">
        <div className="pr">
          <div className=" pr">
            <div className="column is-12 top-com-footer-upper top-com">
              <h2
                className="tile is-child pr column is-12"
                style={{
                  color: "white",
                  fontSize: "17px",
                  fontWeight: "bold",
                  paddingTop: "45px"
                }}
              >
                Today's Growing Communties
              </h2>
            </div>
            <article className="tile is-child notification content pr">
              <div className="columns"></div>

              <div className="is-child pr">
                <p className="top-com-font">
                  1
                  <span>
                    <img
                      style={{ borderRadius: "200%" }}
                      className="image is-24x24"
                      src="https://steamuserimages-a.akamaihd.net/ugc/781852661624008287/A4DA86E4101D264CC6D4A6BF607DA5D64A287747/?imw=779&imh=1024&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
                    ></img>
                  </span>
                  p/memes
                </p>
                <hr
                  className="is-child pr hr"
                  style={{ marginBottom: "1vh" }}
                ></hr>
              </div>

              <div className="is-child pr">
                <p className="top-com-font">2 p/stupidQuestions</p>
                <hr
                  className="is-child pr hr"
                  style={{ marginBottom: "1vh" }}
                ></hr>
              </div>

              <div className="is-child pr">
                <p className="top-com-font">3 p/science</p>
                <hr
                  className="is-child pr hr"
                  style={{ marginBottom: "1vh" }}
                ></hr>
              </div>

              <div className="is-child pr">
                <p className="top-com-font">4 p/technology</p>
                <hr
                  className="is-child pr hr"
                  style={{ marginBottom: "1vh" }}
                ></hr>
              </div>

              <div className="is-child pr">
                <p className="top-com-font">5 p/synthesizers</p>
                <hr
                  className="is-child pr hr"
                  style={{ marginBottom: "1vh" }}
                ></hr>
              </div>

              <button
                className="button is-small is-info join-btn"
                aria-haspopup="true"
                aria-controls="dropdown-menu2"
              >
                VIEW ALL
              </button>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
