import React from 'react';
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./mar.css"

export default function Marketing() {
  return (
   <div>
    <div className="file-card">
            <div><h3>Add New Campaign</h3></div>
            <div className="file-inputs">
                  <input type="file" />
                  <button>
                      <i>
                          <FontAwesomeIcon icon={faPlus} />
                      </i>
                      Upload
                  </button>
            </div>
            <p className="main"></p>
            <p className="info"><b>Supported files</b>:Excel,Pdf</p>
        </div>
   </div>
  );
}
