const bleno = require('@abandonware/bleno');
const {Descriptor} = require("@abandonware/bleno");
const axios = require("axios");

const serviceUUID = 'c395c2ed-ce49-460d-869e-e85e1272c158';
const characteristicUUID = '6262626200001000800000805f9b34fb';

const customCharacteristic = new bleno.Characteristic({
    uuid: characteristicUUID,
    properties: ['write'],
    descriptors: [new Descriptor({
        uuid: '2901',
        value: 'GPS SERVICE SHARE'
    })],
    onReadRequest: (offset, callback) => {
        console.log('Read request received.');
        callback(bleno.Characteristic.RESULT_SUCCESS, characteristicValue);
    },


    onWriteRequest: (data, offset, withoutResponse, callback) => {
        console.log('Data received:', data.toString('utf8'));
        const geoData = String(data.toString('utf8')).split(',')
        const finaldata = {
            latitude: geoData[0].trim(),
            longitude: geoData[1].trim()
        };

        axios.post("https://blebackend.lakshaygmz.repl.co/map/postData", {
            latitude: finaldata.latitude,
            longitude: finaldata.longitude
        }).then(res => console.log(res.data))

        callback(bleno.Characteristic.RESULT_SUCCESS);
    },
});

// Create a custom service
const customService = new bleno.PrimaryService({
    uuid: serviceUUID,
    characteristics: [customCharacteristic],
});


bleno.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        bleno.setServices([customService], (error) => {
            if (error) {
                console.error('Error setting services:', error);
            } else {
                console.log('Peripheral advertising services...');
                bleno.startAdvertising('MyBluetoothPeripheral', [serviceUUID]);
            }
        });
    } else {
        console.error('Peripheral is not powered on.');
    }
});


bleno.on('advertisingStart', (error) => {
    if (!error) {
        console.log('Peripheral advertising started.');
    } else {
        console.error('Error starting advertising:', error);
    }
});


bleno.on('accept', (clientAddress) => {
    console.log(`Connected to central device at address: ${clientAddress}`);
});


bleno.on('disconnect', (clientAddress) => {
    console.log(`Disconnected from central device at address: ${clientAddress}`);
});


bleno.on('advertisingStart', (error) => {
    if (!error) {
        console.log('Peripheral advertising started.');
    } else {
        console.error('Error starting advertising:', error);
    }
});


bleno.on('advertisingStop', () => {
    console.log('Peripheral advertising stopped.');
});


bleno.on('advertisingError', (error) => {
    console.error('Peripheral advertising error:', error);
});


process.on('SIGINT', () => {
    console.log('Stopping peripheral...');
    bleno.stopAdvertising(() => {
        console.log('Peripheral stopped.');
        process.exit(0);
    });
});
