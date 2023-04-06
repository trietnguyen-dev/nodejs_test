
module.exports = {
    generateUniqueNumber: () => {
        let usersNumbers = []

        let number = Math.floor(Math.random() * 900) + 100
        while (usersNumbers.includes(number)) {
            number = Math.floor(Math.random() * 900) + 100
        }
        usersNumbers.push(number)
        return number
    },

    validateCoordinate: (coordinate) => {
        const regex = /^[0-9]{3}:[0-9]{3}$/
        return regex.test(coordinate)
    },
    distanceLocations: (coordinate1, coordinate2) => {
        const pi = Math.PI;

        let lat1 = parseInt(coordinate1.split(":")[0])
        let long1 = parseInt(coordinate1.split(":")[1])
        let lat2 = parseInt(coordinate2.split(":")[0])
        let long2 = parseInt(coordinate2.split(":")[1])

        lat1 = lat1 * pi / 180
        long1 = long1 * pi / 180
        lat2 = lat2 * pi / 180
        long2 = long2 * pi / 180

        console.log(lat1, long1);

        const deltaLat = (lat2 - lat1) * Math.PI / 180
        const deltaLong = (long2 - long1) * Math.PI / 180



        const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(deltaLong / 2) ** 2
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = c * 1000

        return distance

    },

}