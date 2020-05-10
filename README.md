# lan-scan

A website that will detect a local IP address and run a local network scan. It returns a downloadable JSON with the results.

## Usage

Visit [https://lan.neerajaggarwal.com](https://lan.neerajaggarwal.com) in your browser to see a working demonstration.

Opening the website will automatically run the scan. A JSON should be downloadable within 10 seconds, which will contain all the successful responses.

**JSON Format**

```json
[
  {
    "address": "IP Address",
    "response": "success",
    "data": "data"
  }
]
```

### Anonymized IP

An experimental feature of Chromium is to automatically anonymize local IPs exposed by WebRTC. To be able to retrieve the local IP address, you must disable this feature.

Go to [`chrome://flags/#enable-webrtc-hide-local-ips-with-mdns`](chrome://flags/#enable-webrtc-hide-local-ips-with-mdns) in your Chrome browser to disable.

<img width="758" alt="Screen Shot 2019-10-07 at 5 38 47 PM" src="https://user-images.githubusercontent.com/7104017/66354088-6fcabf80-e929-11e9-8cb4-8028538e31d1.png">

### Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No                                                                                                                                                                                                             | Yes                                                                                                                                                                                                              | Yes                                                                                                                                                                                                          | No                                                                                                                                                                                                           | Yes                                                                                                                                                                                                      |

## How It Works

### Detecting Local IP

The auto detection for the local IP is based on [webrtc-ip](https://github.com/n3a9/webrtc-ip). For more information about how it works, refer to the README.

### Local Network Scanning

Once the beginning address and ports are set, the scanner will iterate through all IP address variations by changing the last octet, ranging from 0 to 255.

For each address, an asynchronous AJAX will be made to each port . The callback will then determine whether the request timed out, or if there was an error, and append it to the CSV. Unfortunately, it is not possible to determine the different errors from the request (such as `401` or `404`) due to security enforcements from the browser.
