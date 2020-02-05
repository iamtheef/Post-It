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
              <div className="is-child pr">
                <p className="top-com-font columns">
                  <span className="column is-1">1</span>
                  <img
                    style={{ borderRadius: "200%" }}
                    className="image column is-2"
                    src="https://www.getdigital.eu/web/getdigital/gfx/products/__generated__resized/380x380/Aufkleber_Trollface.jpg"
                  ></img>

                  <span className="column is-1">p/memes</span>
                </p>
                <hr
                  className="is-child pr hr"
                  style={{ marginBottom: "1vh" }}
                ></hr>
              </div>

              <div className="is-child pr">
                <p className="top-com-font columns">
                  <span className="column is-1">2</span>
                  <img
                    style={{ borderRadius: "200%" }}
                    className="image column is-2"
                    src="https://pics.imgrapid.com/wp-content/uploads/2013/10/08140919/eset-7.jpg"
                  ></img>
                  <span className="column is-1">p/technology</span>
                </p>
                <hr
                  className="is-child pr hr"
                  style={{ marginBottom: "1vh" }}
                ></hr>
              </div>

              <div className="is-child pr">
                <p className="top-com-font columns">
                  <span className="column is-1">3</span>
                  <img
                    style={{ borderRadius: "200%" }}
                    className="image column is-2"
                    src="https://cdn.worldsciencefestival.com/wp-content/uploads/2016/04/Unweave-e1509131688730.jpg"
                  ></img>
                  <span className="column is-1">p/science</span>
                </p>
                <hr
                  className="is-child pr hr"
                  style={{ marginBottom: "1vh" }}
                ></hr>
              </div>

              <div className="is-child pr">
                <p className="top-com-font columns">
                  <span className="column is-1">4</span>
                  <img
                    style={{ borderRadius: "200%" }}
                    className="image column is-2"
                    src="https://theglobalcoverage.com/wp-content/uploads/2019/11/Netflix-Movies-and-Tv-Shows-List-696x467.png"
                  ></img>
                  <span className="column is-1">p/series</span>
                </p>
                <hr
                  className="is-child pr hr"
                  style={{ marginBottom: "1vh" }}
                ></hr>
              </div>

              <div className="is-child pr">
                <p className="top-com-font columns">
                  <span className="column is-1">4</span>
                  <img
                    style={{ borderRadius: "200%" }}
                    className="image column is-2"
                    src="https://m.media-amazon.com/images/I/81I8p4nOlNL._SS500_.jpg"
                  ></img>
                  <span className="column is-1">p/synthesizers</span>
                </p>
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
