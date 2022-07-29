import { fas } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { getExistingCampaign, sendData } from "../../api/Api";
import loading from "../../images/Loading_icon.gif";
import "./consulting.css";
export default function Consulting() {
  const [data, setData] = useState([]);
  const [selectedData, setSendSelectedData] = useState("");
  const [sendMsg, setSendMsg] = useState(false);
  const [isLoaading, setIsLoading] = useState(false);
  let uniqueData = [...new Set(data)];
  const sendSelectedData = (e) => {
    if (isLoaading) {
      return;
    }
    const params = { name: selectedData };
    setIsLoading(true);
    setSendMsg(false);
    sendData(params).then((res) => {
      setSendMsg(true);
      setIsLoading(false);
      console.log("res", res);
    });
  };
  const onChangeSetData = (e) => {
    setSendMsg(false);
    setSendSelectedData(e.target.value);
  };
  useEffect(() => {
    getExistingCampaign().then((res) => {
      setData(new Set(res.data));
    });
  }, []);
  return (
    <>
      <h1 style={{ color: "cornflowerblue" }}>Existing Campaign</h1>
      <div className="container campign">
        <div className="form_group">
          <select
            id="dropdown"
            className="form-control"
            onChange={onChangeSetData}
          >
            <option value="N/A">--Select--</option>
            {uniqueData &&
              uniqueData.length > 0 &&
              uniqueData.map((op, index) => {
                return (
                  <option key={index} value={op}>
                    {op}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form_group">
          <button
            disabled={isLoaading}
            className="btn btn-primary"
            onClick={sendSelectedData}
          >
            Send
          </button>
        </div>
      </div>
      <br></br>
      {isLoaading && (
        <span>
          <img className="loading" src={loading} />
        </span>
      )}
      {sendMsg ? <h3>{selectedData} send successfully</h3> : ""}
    </>
  );
}
