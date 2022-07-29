import React from "react";
import "../../App.css";
import BarChart from "./BarChart";
import { getCampaignAnalytics } from "./../../api/Api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {} from "bootstrap";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: [],
      total1: [],
      total2: [],
      scheduledCalls: 0,
      totalClients: 0,
      noResponse: 0,
      startDate: '',
      endDate: '',
      start: '',
      end: '',
    };
    this.getCampaignAnalyticsApiReq =
      this.getCampaignAnalyticsApiReq.bind(this);
  }
  componentDidMount() {
    this.getCampaignAnalyticsApiReq();
    
  }

  async getCampaignAnalyticsApiReq() {
    //scheduledCalls
    //totalClients
    //noResponse
    let date = {}
    if(this.state.startDate !== '' && this.state.endDate !== '') {
      date = {fromTime: this.state.startDate,
              toTime: this.state.endDate }
    }
    const paramsTotalClients = {
      type: "totalClients",
      ...date
    };
    
    await getCampaignAnalytics(paramsTotalClients).then((res) => {
      if (res.data && res.data.length > 0) {
        const totalClients = res.data[0].TotalClients;
        this.setState({ totalClients: totalClients });
      }
    });
    const paramsScheduledCalls = {
      type: "scheduledCalls",
      ...date
    };
    await getCampaignAnalytics(paramsScheduledCalls).then((res) => {
      if (res.data && res.data.length > 0) {
        const scheduledCalls = res.data[0].scheduledCalls;
        this.setState({ scheduledCalls: scheduledCalls });
      }
    });
    const paramsNoResponse = {
      type: "noResponse",
      ...date
    };
    await getCampaignAnalytics(paramsNoResponse).then((res) => {
      if (res.data && res.data.length > 0) {
        const noResponse = res.data[0].noResponse;
        this.setState({ noResponse: noResponse });
      }
    });
  }
  setStartDate = (date) => {
    //console.log(date);
    const startDate = moment(date).format("YYYY-MM-DD");
    this.setState({ startDate: startDate, start: date });
  };
  setEndDate = (date) => {
    const endDate = moment(date).format("YYYY-MM-DD");
    this.setState({ endDate: endDate, end: date });
  };
  render() {
    // console.log(this.state);
    return (
      <div className="container">
        <div>
          <div>
            <div className="form_group">
              <div className="text-left">
                <label>From Date:</label>
                <DatePicker className="form-control"
                  selected={this.state.start}
                  onChange={(date) => this.setStartDate(date)}
                  selectsStart
                  startDate={this.state.start}
                  endDate={this.state.end}
                />
              </div>
              <div className="text-left">
                <label>To Date: </label>
                <DatePicker className="form-control"
                  selected={this.state.end}
                  onChange={(date) => this.setEndDate(date)}
                  selectsEnd
                  startDate={this.state.start}
                  endDate={this.state.end}
                  minDate={this.state.start}
                />
              </div>
              <button
                onClick={() => this.getCampaignAnalyticsApiReq()}
                className="btn btn-primary"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="page-content fade-in-up px-3 m-2">
          <div className="row mb-4" style={{ display: "inline-flex" }}>
            <div
              className="col-lg-4 col-md-6"
              style={{
                width: "200px",
                height: "140px",
                border: "1px solid",
                margin: "23px",
                padding: "43px",
                backgroundColor: "#4285F4",
              }}
            >
              <div className="card mb-4">
                <div className="card-body flexbox-b">
                  <div>
                    <div className="text-muted">
                      <h6>Total Customers contacted</h6>
                    </div>

                    <h3 className="font-strong text-primary">
                      {this.state.totalClients}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6"
              style={{
                width: "200px",
                height: "140px",
                border: "1px solid",
                margin: "23px",
                padding: "43px",
                backgroundColor: "#DB4437",
              }}
            >
              <div className="card mb-4">
                <div className="card-body flexbox-b">
                  <div>
                    <div className="text-muted">
                      <h6>Total Calls Scheduled</h6>
                    </div>

                    <h3 className="font-strong text-primary">
                      {this.state.scheduledCalls}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6"
              style={{
                width: "200px",
                height: "140px",
                border: "1px solid",
                margin: "23px",
                padding: "43px",
                backgroundColor: "#F4B400",
              }}
            >
              <div className="card mb-4">
                <div className="card-body flexbox-b">
                  <div>
                    <div className="text-muted">
                      <h6>No. of Customers who have not scheduled a call</h6>{" "}
                    </div>

                    <h3 className="font-strong text-primary">
                      {this.state.noResponse}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BarChart {...this.state} />
      </div>
    );
  }
}
