const iceServer = "stun:stun.l.google.com:19302?transport=udp";

const ipRegex = {
  local: /^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/,
  public: /([0-9]{1,3}(\.[0-9]{1,3}){3}|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])))($|\s)/,
};

let anonMessage = document.createElement("p");
anonMessage.innerHTML =
  "<em>Note: </em> Your IP address is anonymized! To fix, go to <u>chrome://flags/#enable-webrtc-hide-local-ips-with-mdns</u> in your browser and disable.";

let badAddressMessage = document.createElement("p");
badAddressMessage.textContent = "Unable to determine IP address!";

const today = new Date().toISOString().substring(0, 10);
let downloadElement = document.createElement("a");
downloadElement.textContent = "Download Scan Results";
downloadElement.download = `scan-results-${today}.json`;

runScan();
