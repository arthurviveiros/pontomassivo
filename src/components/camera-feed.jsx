import React, { Component } from "react";
import axios from "axios";

export class CameraFeed extends Component {
  processDevices(devices) {
    devices.forEach((device) => {
      console.log(device.label);
      this.setDevice(device);
    });
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
    console.log(this.canvas.toDataURL());
    axios
      .post("http://127.0.0.1:5000/qtdRostos", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        image: this.canvas.toDataURL().split(",")[1],
      })
      .then((response) => {
        console.log(response.data);
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
          <canvas width="680" height="360" ref={(ref) => (this.canvas = ref)} />
        </div>
      </div>
    );
  }
}
