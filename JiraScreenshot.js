/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-no-literals */
import React, { useRef, useEffect, useContext } from 'react';

import { JiraContext } from './JiraContextProvider';

import { useMediaRecorder } from './hooks';
import ScreenShotIcon from './ScreenShotIcon';
import VideoIcon from './VideoIcon';

const PHOTO = 'PHOTO';
const VIDEO = 'VIDEO';

// TODO: delete, just for preview
function Player({ video }) {
  if (!video) {
    return null;
  }

  return <video src={URL.createObjectURL(video)} width={150} controls />;
}

const JiraScreenshot = props => {
  const {
    screenshot,
    setScreenshot,
    video,
    setVideo,
    isRecordingVideo,
    startRecordingToggle,
    startTakingScreenshot,
    stopTakingScreenshot,
  } = useContext(JiraContext);
  const {
    // status,
    liveStream,
    stopRecording,
    getMediaStream,
    clearMediaStream,
  } = useMediaRecorder({
    onStart: fileType => {
      if (fileType === VIDEO) startRecordingToggle();

      if (fileType === PHOTO) startTakingScreenshot();
    },
    onStop: fileType => {
      if (fileType === PHOTO) stopTakingScreenshot();
    },
    mediaStreamConstraints: { audio: false, video: true },
    setVideo,
  });
  const videoPreviewRef = useRef();
  const canvasRef = useRef();

  useEffect(() => clearMediaStream, []);

  useEffect(() => {
    if (videoPreviewRef.current && liveStream) {
      videoPreviewRef.current.srcObject = liveStream;
    }
  }, [liveStream]);

  useEffect(() => {
    if (liveStream && !isRecordingVideo) {
      stopRecording(VIDEO);
    }
  }, [isRecordingVideo]);

  const takeScreenshot = async () => {
    const w = videoPreviewRef.current.videoWidth;
    const h = videoPreviewRef.current.videoHeight;
    canvasRef.current.width = w;
    canvasRef.current.height = h;
    const context = await canvasRef.current.getContext('2d');
    context.drawImage(videoPreviewRef.current, 0, 0, w, h);
    const frameImg = canvasRef.current.toDataURL('image/png');
    stopRecording(PHOTO);
    setScreenshot(frameImg);
  };

  const handleScreenshot = async () => {
    try {
      await getMediaStream(PHOTO);
      setTimeout(takeScreenshot, 1000);
    } catch (err) {
      console.log('Permission on screenshot denied');
    }
  };

  const handleVideo = async () => {
    try {
      await getMediaStream(VIDEO);
    } catch (err) {
      console.log('Permission on video denied');
    }
  };

  return (
    <div className="jiraCapture">
      <div className="jiraCaptureScreenshot">
        <button
          type="button"
          className="jiraButton"
          disabled={screenshot}
          onClick={handleScreenshot}
        >
          <ScreenShotIcon />
        </button>
        <span className="jiraTooltip">Screenshot</span>
      </div>
      <div className="jiraCaptureVideo">
        <button
          type="button"
          className="jiraButton"
          disabled={video}
          onClick={handleVideo}
        >
          <VideoIcon />
        </button>
        <span className="jiraTooltip">Vidéo</span>

        {video && video !== true && <Player video={video} />}
        {screenshot && (
          <img alt="screenshot" src={screenshot} style={{ width: 150 }} />
        )}
        {liveStream && (
          <>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <video
              ref={videoPreviewRef}
              width={520}
              height={480}
              autoPlay
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default JiraScreenshot;
