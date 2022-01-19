// @flow
import { useState, useEffect, useCallback, useRef } from 'react';
import { useToggle } from 'react-use';
import {
  createIssueWithAttachments,
  getJiraUsers,
  getCurrentUser,
} from './utils';

export type CreateJiraIssueProps = {
  title: string,
  description: string | null,
  assignee: string | null,
  isCurrentSprint: boolean,
};

export type JiraLoginProps = { login: string, password: string };

export const useJiraAuth = () => {
  const [jiraToken, setJiraToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<Object | null>(null);
  const [jiraUsers, setJiraUsers] = useState<Object[]>([]);

  const handleLogin = useCallback(
    async (data: JiraLoginProps) => {
      const token = btoa(`${data.login}:${data.password}`);
      window.localStorage.setItem('jira-token', token);
      setJiraToken(token);
    },
    [getCurrentUser, setJiraToken, setCurrentUser],
  );

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setJiraToken(null);
    window.localStorage.removeItem('jira-token');
  }, [setCurrentUser, setJiraToken]);

  const onError = { '401': handleLogout };

  const fetchJiraUsers = useCallback(async () => {
    if (jiraToken) {
      const users = await getJiraUsers(jiraToken, onError);
      if (users) {
        setJiraUsers(users);
      }
    }
  }, [getJiraUsers, setJiraUsers, jiraToken]);

  useEffect(() => {
    if (jiraToken) {
      getCurrentUser(jiraToken, onError).then(user => {
        if (user) setCurrentUser(user);
      });
    }
  }, [jiraToken, getCurrentUser, setCurrentUser]);

  useEffect(() => {
    setJiraToken(window.localStorage.getItem('jira-token'));
  }, [setJiraToken]);

  useEffect(() => {
    fetchJiraUsers();
  }, [fetchJiraUsers]);

  return { currentUser, jiraToken, jiraUsers, handleLogin, handleLogout };
};

export const useScreenCapture = () => {
  const [isRecordingVideo, toggleIsRecordingVideo] = useToggle(false);
  const [isTakingScreenshot, toggleIsTakingScreenshot] = useToggle(false);
  const [screenshot, setScreenshot] = useState(null);
  const [video, setVideo] = useState(null);

  const startRecordingToggle = useCallback(() => {
    toggleIsRecordingVideo();
  }, [toggleIsRecordingVideo]);

  const stopRecordingToggle = useCallback(() => {
    // stop recording video
    toggleIsRecordingVideo();
  }, [toggleIsRecordingVideo]);

  const startTakingScreenshot = useCallback(() => {
    toggleIsTakingScreenshot();
  }, [toggleIsTakingScreenshot]);

  const stopTakingScreenshot = useCallback(() => {
    toggleIsTakingScreenshot();
  }, [toggleIsTakingScreenshot]);

  return {
    isRecordingVideo,
    startRecordingToggle,
    stopRecordingToggle,
    isTakingScreenshot,
    startTakingScreenshot,
    stopTakingScreenshot,
    screenshot,
    setScreenshot,
    video,
    setVideo,
  };
};

export const useCreateJiraIssue = (
  jiraBoardId: string,
  jiraToken: string | null,
  onAuthError: Function,
) => {
  const [issue, setIssue] = useState(null);

  const createIssue = useCallback(
    async (data: CreateJiraIssueProps) => {
      if (jiraToken) {
        const { title, description, assignee, isCurrentSprint } = data;
        const newIssue = await createIssueWithAttachments({
          jiraBoardId,
          title,
          description,
          isCurrentSprint,
          assignee,
          jiraToken,
          onError: {
            '401': onAuthError,
          },
        });
        if (newIssue) {
          setIssue(newIssue);
        }
      }
    },
    [jiraToken, createIssueWithAttachments, jiraBoardId, setIssue],
  );

  return [issue, createIssue];
};

export const useBrowserInfos = () => {
  const [url, setUrl] = useState(null);
  const [userAgent, setUserAgent] = useState(null);
  const [screenResolution, setScreenResolution] = useState(null);
  return {
    url,
    setUrl,
    userAgent,
    setUserAgent,
    screenResolution,
    setScreenResolution,
  };
};

const noop = () => {};

function isObject(o) {
  return o && !Array.isArray(o) && Object(o) === o;
}

function validateMediaTrackConstraints(mediaType) {
  const supportedMediaConstraints = navigator.mediaDevices.getSupportedConstraints();
  const unSupportedMediaConstraints = Object.keys(mediaType).filter(
    constraint => !supportedMediaConstraints[constraint],
  );

  if (unSupportedMediaConstraints.length !== 0) {
    const toText = unSupportedMediaConstraints.join(',');
    console.error(
      `The following constraints ${toText} are not supported on this browser.`,
    );
  }
}

export const useMediaRecorder = ({
  blobOptions,
  onStop = noop,
  onStart = noop,
  onError = noop,
  onDataAvailable = noop,
  mediaRecorderOptions,
  mediaStreamConstraints = {},
  setVideo,
}) => {
  const mediaChunks = useRef([]);
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);

  function handleDataAvailable(e) {
    if (e.data.size) {
      mediaChunks.current.push(e.data);
    }
    onDataAvailable(e.data);
  }

  function handleStop(fileType) {
    if (fileType === 'VIDEO') {
      const [sampleChunk] = mediaChunks.current;
      const blobPropertyBag = Object.assign(
        { type: sampleChunk.type },
        blobOptions,
      );
      const blob = new Blob(mediaChunks.current, blobPropertyBag);
      setVideo(blob);
    }
  }

  function handleError(e) {
    onError(e.error);
  }

  function startRecording(fileType) {
    mediaChunks.current = [];

    if (mediaStream.current) {
      mediaRecorder.current = new MediaRecorder(
        mediaStream.current,
        mediaRecorderOptions,
      );
      mediaRecorder.current.addEventListener(
        'dataavailable',
        handleDataAvailable,
      );
      mediaRecorder.current.addEventListener('stop', () =>
        handleStop(fileType),
      );
      mediaRecorder.current.addEventListener('error', handleError);
      mediaRecorder.current.start();
      onStart(fileType);
    }
  }

  async function getMediaStream(fileType) {
    try {
      const stream = await window.navigator.mediaDevices.getDisplayMedia(
        mediaStreamConstraints,
      );

      mediaStream.current = stream;
    } catch (err) {
      throw new Error(err);
    } finally {
      startRecording(fileType);
    }
  }

  function clearMediaStream() {
    if (mediaRecorder.current) {
      mediaRecorder.current.removeEventListener(
        'dataavailable',
        handleDataAvailable,
      );
      mediaRecorder.current.removeEventListener('stop', () => handleStop(null));
      mediaRecorder.current.removeEventListener('error', handleError);
      mediaRecorder.current = null;
    }

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop());
      mediaStream.current = null;
      mediaChunks.current = [];
    }
  }

  function stopRecording(fileType) {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      // not sure whether to place clean up in useEffect?
      // If placed in useEffect the handler functions become dependencies of useEffect
      mediaRecorder.current.removeEventListener(
        'dataavailable',
        handleDataAvailable,
      );
      mediaRecorder.current.removeEventListener('stop', () => handleStop(null));
      mediaRecorder.current.removeEventListener('error', handleError);
      mediaRecorder.current = null;
      onStop(fileType);
      clearMediaStream();
    }
  }

  useEffect(() => {
    if (!window.MediaRecorder) {
      throw new ReferenceError(
        'MediaRecorder is not supported in this browser. Please ensure that you are running the latest version of chrome/firefox/edge.',
      );
    }

    if (!window.navigator.mediaDevices.getDisplayMedia) {
      throw new ReferenceError(
        'This browser does not support screen capturing',
      );
    }

    if (isObject(mediaStreamConstraints.video)) {
      validateMediaTrackConstraints(mediaStreamConstraints.video);
    }

    if (mediaRecorderOptions && mediaRecorderOptions.mimeType) {
      if (!MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)) {
        console.error(
          `The specified MIME type supplied to MediaRecorder is not supported by this browser.`,
        );
      }
    }
  }, [mediaStreamConstraints, mediaRecorderOptions]);

  return {
    stopRecording,
    getMediaStream,
    startRecording,
    clearMediaStream,
    get liveStream() {
      if (mediaStream.current) {
        return new MediaStream(mediaStream.current.getVideoTracks());
      }
      return null;
    },
  };
};
