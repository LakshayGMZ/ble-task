const noble = require('@abandonware/noble');

noble.state = 'poweredOn';
noble.on('stateChange', state => {
    console.log(`State changed: ${state}`)
    if (state === 'poweredOn') {
        noble.startScanning()
    }
})

noble.on('discover', peripheral => {
    console.log(`Found device, name: ${peripheral.advertisement.localName}, uuid: ${peripheral.uuid}`)

    console.log(peripheral)
    noble.stopScanning()
    peripheral.on('connect', () => console.log('Device connected'))
    peripheral.on('disconnect', () => console.log('Device disconnected'))
    peripheral.connect(error => {
        peripheral.discoverServices((error, services) => {
            console.log(`Found service, name: ${services[0].name}, uuid: ${services[0].uuid}, type: ${services[0].type}`)

            const service = services[0]

            service.discoverCharacteristics(null, (error, characteristics) => {
                characteristics.forEach(characteristic => {
                    console.log(`Found characteristic, name: ${characteristic.name}, uuid: ${characteristic.uuid}, type: ${characteristic.type}, properties: ${characteristic.properties.join(',')}`)
                })

                characteristics.forEach(characteristic => {
                    if (characteristic.name === 'System ID' || characteristic.name === 'PnP ID') {
                        characteristic.read((error, data) => console.log(`${characteristic.name}: 0x${arrayBufferToHex(data)}`))
                    } else {
                        characteristic.read((error, data) => console.log(`${characteristic.name}: ${data.toString('ascii')}`))
                    }
                })
            })
        })
    })
})