# lan-scan

A scanner that will use a starting address, or detect a local IP address, and probe all other IP address variations with the specified ports. It will then put all of the findings into a downloadable CSV.

## Usage

Opening the website will automatically run the scan. A CSV should be downloadable within 10 seconds, which will contain the following format:

| Column 1   | Column 2 | Column 3      |
| ---------- | -------- | ------------- |
| IP Address | success  | data (string) |
| IP Address | error    | error code    |
| IP Address | timeout  | error code    |

### Settings

The following variables can be configured in [`userSettings.js`](https://github.com/n3a9/lan-scan/blob/master/js/userSettings.js):

- `debug`: printing progress to browser console
- `address`: `default` if to be auto-detected, otherwise the starting local address
- `ports`: a list of ports to probe
- `timeout`: how long to timeout for each address probe in seconds

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

Once the beginning address and ports are set, an asynchronous AJAX will be made to the port of every address. The callback will then determine whether the request timed out, or if there was an error. Unfortunately, it is not possible to determine the different errors from the request (such as 401 or 404).
