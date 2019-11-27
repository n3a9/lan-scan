findLocalAddress = () => {
  if (debug) console.log("Default address given! Searching for local IP.");

  let RTCPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;

  if (!RTCPeerConnection) {
    if (debug) console.log("WebRTC connection blocked! Attempting in iFrame.");
    RTCPeerConnection =
      iframe.contentWindow.RTCPeerConnection ||
      iframe.contentWindow.mozRTCPeerConnection ||
      iframe.contentWindow.webkitRTCPeerConnection;
  }

  const servers = {
    iceServers: [{ urls: iceServer }]
  };

  const rtc = new RTCPeerConnection(servers);
  rtc.createDataChannel("rtc");

  parseCandidate = candidate => {
    if (debug) console.log("Parsing candidate: ", candidate);

    detectLocal(candidate);
    const match = ipRegex.public.exec(candidate);
    if (match && match[0].match(ipRegex.local)) address = match[0];
  };

  detectLocal = candidate => {
    const tempAddress = candidate.split(" ")[4];
    const type = candidate.split(" ")[7];
    if (type === "host" && isAnonymized(tempAddress)) address = tempAddress;
  };

  rtc.onicecandidate = ice => {
    if (ice.candidate) parseCandidate(ice.candidate.candidate);
  };

  rtc.createOffer(
    result => {
      if (debug) console.log("SDP offer successful. Result: ", result);
      rtc.setLocalDescription(result);
      const lines = rtc.localDescription.sdp.split("\n");
      lines.forEach(line => {
        if (~line.indexOf("a=candidate") || ~line.indexOf("c="))
          parseCandidate(line);
      });
    },
    () => {
      if (debug) console.warn("SDP offer failed.");
    }
  );
};

isAnonymized = address => {
  return address && address.includes(".local");
};
