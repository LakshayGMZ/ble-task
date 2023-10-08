const noble = require('@abandonware/noble');
const axios = require('axios');

// Replace with the UUID of the Bluetooth device you want to connect to
const targetDeviceUUID = '3190ed876f504b83ab6cbdc9919a9683';
const characteristicUUID = '6262626200001000800000805f9b34fb';
const writterUUID = '6363636300001000800000805f9b34fb';

// Initialize noble
noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        console.log('Scanning for devices...');
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

// Discover Bluetooth devices
noble.on('discover', (peripheral) => {
    console.log(`Found some device: ${peripheral}`);
    if (true) {
        console.log(`Found target device: ${peripheral.advertisement.localName}`);
        noble.stopScanning();

        // Connect to the target device
        peripheral.connect((error) => {
            if (error) {
                console.error('Error connecting to the device:', error);
                return;
            }

            console.log('Connected to the device.');

            peripheral.discoverAllServicesAndCharacteristics((error, services, characteristics) => {
                if (error) {
                    console.error('Error discovering services and characteristics:', error);
                    return;
                }

                const targetCharacteristic = characteristics.find((char) => char.uuid === characteristicUUID);
                const writableCharacteristic = characteristics.find((char) => char.uuid === writterUUID);
                if (!targetCharacteristic) {
                    console.error('Target characteristic not found.');
                    peripheral.disconnect();
                    return;
                }
                targetCharacteristic.on('read', (error, data) => {
                    if (error) {
                        console.error('Error reading data from the characteristic:', error);
                        peripheral.disconnect();
                        return;
                    }

                    console.log('Data received:', data.toString('utf8'));
                    const geoData = String(data.toString('utf8')).split(',')
                    const finaldata = {
                        latitude: geoData[0],
                        longitude: geoData[1]
                    };

                    axios.post("https://blebackend.lakshaygmz.repl.co/map/postData", {
                            latitude: finaldata.latitude,
                            longitude: finaldata.longitude
                    })
                        .then(res => console.log(res.data))

                });

                // const stringdata = "this is replay";
                // writableCharacteristic.write(Buffer.from(stringdata, 'utf-8'), false, (err) => {
                //     console.log("sending data failed.")
                // });

            });
        });
    }
});
