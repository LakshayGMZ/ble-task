const noble = require('@abandonware/noble');
const axios = require('axios');


const targetAdvertisementName = 'Galaxy M30';
const characteristicUUID = '6262626200001000800000805f9b34fb';


noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        console.log('Scanning for devices...');
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});


noble.on('discover', (peripheral) => {
    // console.log(`Found some device: ${peripheral}`);
    if (peripheral.advertisement.localName === targetAdvertisementName) {
        console.log(`Found target device: ${peripheral.advertisement.localName}`);
        noble.stopScanning();


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
                if (!targetCharacteristic) {
                    console.error('Target characteristic not found.');
                    peripheral.disconnect();
                    return;
                }
                targetCharacteristic.on('read', (data, isNotification) => {
                    if (isNotification) {
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
            });
        });
    }
});
