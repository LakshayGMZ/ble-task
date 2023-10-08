# ble-task

Internship task for `lvl-alpha` company.

## Steps to Use
This repo consist of backend using express framework for Restful api integration. The GPSsend.js file is to be run locally on computer.
Steps to transfer GPS data over bluetooth network:

- Run `GPSsend.js` on the BLE device to advertise packets and register as peripheral.

- Install `lightblue` app from playstore. Pair with the BLE device. Click Connect

![image](https://github.com/LakshayGMZ/ble-task/assets/103425127/8b293234-41c3-4f26-9e71-0eecf93758c0)

- Scroll down and click on `GPS SERVICE SHARE`.

![image](https://github.com/LakshayGMZ/ble-task/assets/103425127/1ab74ccb-7fdf-4e52-a0dc-91486e1e1ffa)



- Write down the coordinates of your choice in format `LATITUDE, LONGITUDE` and hit write.

![image](https://github.com/LakshayGMZ/ble-task/assets/103425127/f90d4271-1cdc-4927-945e-acad9437d296)



- Now go to https://blebackend.lakshaygmz.repl.co/ and watch coordinates being updated on your satellite map!!

# Links
- repl link:  https://replit.com/@LakshayGMZ/bleBackend
- backend hosted endpoint: https://blebackend.lakshaygmz.repl.co/
- endpoint to update live location data of BLE device: POST at /map/postData
- endpoint to get live location data of BLE device: GET at /map/getData
- `node GPSsend.js` to run bleno packet advertizer to BLE device to get data from
