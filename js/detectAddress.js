findLocalAddress = () => {
  let RTCPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;

  if (!RTCPeerConnection) {
    RTCPeerConnection =
      iframe.contentWindow.RTCPeerConnection ||
      iframe.contentWindow.mozRTCPeerConnection ||
      iframe.contentWindow.webkitRTCPeerConnection;
  }

  const servers = {
    iceServers: [{ urls: iceServer }],
  };

  const rtc = new RTCPeerConnection(servers);
  rtc.createDataChannel("rtc");

  parseCandidate = (candidate) => {
    detectLocal(candidate);
    const match = ipRegex.public.exec(candidate);
    if (match && match[0].match(ipRegex.local)) address = match[0];
  };

  detectLocal = (candidate) => {
    const tempAddress = candidate.split(" ")[4];
    const type = candidate.split(" ")[7];
    if (type === "host" && isAnonymized(tempAddress)) address = tempAddress;
  };

  rtc.onicecandidate = (ice) => {
    if (ice.candidate) parseCandidate(ice.candidate.candidate);
  };

  rtc.createOffer(
    (result) => {
      rtc.setLocalDescription(result);
      const lines = rtc.localDescription.sdp.split("\n");
      lines.forEach((line) => {
        if (~line.indexOf("a=candidate") || ~line.indexOf("c="))
          parseCandidate(line);
      });
    },
    () => {}
  );
};

isAnonymized = (address) => {
  return address && address.includes(".local");
};
