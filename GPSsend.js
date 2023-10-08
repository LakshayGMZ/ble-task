const bleno = require('bleno');

// Define a custom service and characteristic UUID
const serviceUUID = 'CUSTOM BLE TEST';
const characteristicUUID = 'GPS DATA';

// Define the custom characteristic value
let characteristicValue = Buffer.from('Hello, Bluetooth!');

// Create a custom characteristic
const customCharacteristic = new bleno.Characteristic({
    uuid: characteristicUUID,
    properties: ['write', "notify"], // You can customize these properties
    // value: characteristicValue,

    // Handle read requests from the central device
    onReadRequest: (offset, callback) => {
        console.log('Read request received.');
        callback(bleno.Characteristic.RESULT_SUCCESS, characteristicValue);
    },

    // Handle write requests from the central device
    onWriteRequest: (data, offset, withoutResponse, callback) => {
        console.log('Write request received with data:', data.toString());
        characteristicValue = data; // Update the characteristic value
        callback(bleno.Characteristic.RESULT_SUCCESS);
    },
});

// Create a custom service
const customService = new bleno.PrimaryService({
    uuid: serviceUUID,
    characteristics: [customCharacteristic],
});

// Set the services on the peripheral
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

// Handle peripheral advertising events
bleno.on('advertisingStart', (error) => {
    if (!error) {
        console.log('Peripheral advertising started.');
    } else {
        console.error('Error starting advertising:', error);
    }
});

// Handle central device connections
bleno.on('accept', (clientAddress) => {
    console.log(`Connected to central device at address: ${clientAddress}`);
});

// Handle central device disconnections
bleno.on('disconnect', (clientAddress) => {
    console.log(`Disconnected from central device at address: ${clientAddress}`);
});

// Handle peripheral advertising events
bleno.on('advertisingStart', (error) => {
    if (!error) {
        console.log('Peripheral advertising started.');
    } else {
        console.error('Error starting advertising:', error);
    }
});

// Handle peripheral advertising stop events
bleno.on('advertisingStop', () => {
    console.log('Peripheral advertising stopped.');
});

// Handle peripheral advertising error events
bleno.on('advertisingError', (error) => {
    console.error('Peripheral advertising error:', error);
});

// Gracefully exit the program on Ctrl+C
process.on('SIGINT', () => {
    console.log('Stopping peripheral...');
    bleno.stopAdvertising(() => {
        console.log('Peripheral stopped.');
        process.exit(0);
    });
});
