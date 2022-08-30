import React, { Component, useState }  from "react";
import axios from "axios";

export class CameraFeed extends Component {
  processDevices(devices) {
    devices.forEach((device) => {
      console.log(device.label);
      this.setDevice(device);
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      resposta: "",
    };
  }

  async setDevice(device) {
    const { deviceId } = device;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId },
    });
    this.videoPlayer.srcObject = stream;
    this.videoPlayer.play();
  }

  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices();
    this.processDevices(cameras);
  }

  takePhoto = () => {
    const context = this.canvas.getContext("2d");
    context.drawImage(this.videoPlayer, 0, 0, 680, 360);
    axios
      .post("http://127.0.0.1:5000/qtdRostos", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        image: this.canvas.toDataURL().split(",")[1],
      })
      .then((response) => {
        this.setState({resposta: response.data});
      });
  };

  render() {

    return (
      <div className="c-camera-feed">
        <div className="c-camera-feed__viewer">
          <video
            ref={(ref) => (this.videoPlayer = ref)}
            width="680"
            heigh="360"
          />
        </div>
        <button onClick={this.takePhoto}>Tirar Foto!</button>
        <div className="c-camera-feed__stage">
          <canvas width="1" height="1" ref={(ref) => (this.canvas = ref)} />
          <h1>{this.resposta}</h1>
        </div>
      </div>
    );
  }
}
