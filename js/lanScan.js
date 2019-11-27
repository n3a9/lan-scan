const scanResults = [];

runScan = () => {
  if (address === "default") {
    findLocalAddress();
    setTimeout(function() {
      scanLocal(address, ports);
    }, 1000);
  } else {
    scanLocal(address, ports);
  }
};

scanLocal = async (address, ports) => {
  if (debug) console.log("Scanning local network.");

  if (isAnonymized(address)) {
    if (debug) console.log("Address is anonymized!");
    document.body.appendChild(anonMessage);
    return;
  }

  const index = address.lastIndexOf(".");
  if (index == -1) {
    if (debug) console.log("Bad address!");
    document.body.appendChild(badAddressMessage);
    return;
  }

  if (debug) console.log("Local IP: ", address);

  beginningAddress = address.slice(0, index + 1);
  for (let i = 0; i < ports.length; i++) scanPort(beginningAddress, i);

  setTimeout(function() {
    if (debug) console.log(scanResults);

    const csv =
      "data:text/csv;charset=utf-8," +
      scanResults.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csv);

    csvDownload.href = encodedUri;
    document.body.appendChild(csvDownload);
  }, 10000);
};

scanPort = (beginningAddress, index) => {
  port = ports[index];
  for (let index = 0; index <= 255; index++) {
    const newAddress =
      "http://" + beginningAddress + index.toString() + ":" + port.toString();
    $.ajax({
      crossDomain: true,
      url: newAddress,
      async: true,
      success: function(data) {
        if (debug) console.log(`Recieved success on address ${newAddress}.`);
        if (debug) console.log(data);
        scanResults.push([newAddress, "response", data.toString()]);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (debug)
          console.log(`Recieved ${textStatus} on address ${newAddress}.`);
        scanResults.push([newAddress, textStatus, jqXHR.status]);
      },
      timeout: timeout * 1000
    });
  }
};
