import React from "react";

function Notfound() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Arvo&display=swap');

        .page_404 {
          padding: 40px 0;
          background: #fff;
          font-family: 'Arvo', serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: auto;
        }

        .text-center {
          text-align: center;
        }

        .four_zero_four_bg {
          background-image: url("https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif");
          height: 400px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .four_zero_four_bg h1 {
          font-size: 80px;
        }

        .contant_box_404 {
          margin-top: -50px;
        }

        .contant_box_404 h3 {
          font-size: 28px;
          margin-bottom: 10px;
        }

        .contant_box_404 p {
          color: #555;
        }

        .link_404 {
          color: #fff !important;
          padding: 10px 20px;
          background: #39ac31;
          margin: 20px 0;
          display: inline-block;
          text-decoration: none;
          border-radius: 4px;
        }

        .link_404:hover {
          background: #2e8b2e;
        }
      `}</style>

      <section className="page_404">
        <div className="container">
          <div className="text-center">
            <div className="four_zero_four_bg">
              <h1>404</h1>
            </div>

            <div className="contant_box_404">
              <h3>Look like you're lost</h3>
              <p>the page you are looking for not available!</p>
              <a href="/" className="link_404">
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Notfound;
