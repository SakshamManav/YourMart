import React from "react";
// This is the final purchased popup
export default function Popup() {
  return (
    <>
      <div>
        <div
          className="modal fade"
          style={{ color: "black", marginTop: "70px" }}
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h1
                  style={{
                    fontSize: "35px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Congratulations!
                </h1>
                <div className="mx-2" style={{ textAlign: "center" }}>
                  {" "}
                  <img
                    src="./output-onlinegiftools (1).gif"
                    alt="img"
                    height="300"
                    width="400"
                  />
                </div>
                <div>
                  <h1
                    style={{
                      fontWeight: "700",
                      fontSize: "30px",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    Your Item purchased Successfully
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
