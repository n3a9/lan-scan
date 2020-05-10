const ports = [80, 8000, 8080, 5000, 8008];
let scanResults = [];
let json = "";

runScan = () => {
  findLocalAddress();
  setTimeout(function () {
    scanLocal(address, ports);
  }, 1000);
};

scanLocal = async (address, ports) => {
  if (isAnonymized(address)) {
    document.body.removeChild(document.getElementById("loading"));
    document.body.appendChild(anonMessage);
    return;
  }

  const index = address.lastIndexOf(".");
  if (index == -1) {
    document.body.removeChild(document.getElementById("loading"));
    document.body.appendChild(badAddressMessage);
    return;
  }

  beginningAddress = address.slice(0, index + 1);
  for (let port of ports) scanPort(beginningAddress, ports);

  setTimeout(function () {
    const encodedUri =
      "data:application/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(scanResults));

    downloadElement.href = encodedUri;
    document.body.removeChild(document.getElementById("loading"));
    document.body.appendChild(downloadElement);
  }, 10000);
};

scanPort = (beginningAddress, port) => {
  for (let octet = 0; octet <= 255; octet++) {
    const newAddress =
      "http://" + beginningAddress + octet.toString() + ":" + port;
    $.ajax({
      crossDomain: true,
      url: newAddress,
      async: true,
      success: function (data) {
        scanResults.push({
          address: newAddress,
          response: "response",
          data: data,
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {},
      timeout: 1.5 * 1000,
    });
  }
};
