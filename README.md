# ble-task

Internship task for `lvl-alpha` company.

## Working
This repo consist of backend using express framework for Restful api integration. The GPSsend.js file is to be run locally on computer.
Steps to transfer GPS data over bluetooth network:

Step 1:
Run `GPSsend.js` on the BLE device to advertise packets and register as peripheral.

Step2:
Install `lightblue` app from playstore. Pair with the BLE device. Click Connect
![image](https://github.com/LakshayGMZ/ble-task/assets/103425127/31e4aa3c-7c57-4510-abab-16c52a4a0d96)

Step3:
Scroll down and click on `GPS SERVICE SHARE`.
![image](https://github.com/LakshayGMZ/ble-task/assets/103425127/6fbe4f3b-983e-4792-9d22-ed51b8c43ac9)

Step4:
Write down the coordinates of your choice in format `LATITUDE, LONGITUDE` and hit write.
![image](https://github.com/LakshayGMZ/ble-task/assets/103425127/79a87ad1-10a2-466c-9151-c918302074d3)

Step5:
Now go to https://blebackend.lakshaygmz.repl.co/ and watch coordinated being updated on map.


