const db = require('./pg-config')

const addDevice = (req, res) => {

    const body = req.body
    const json = body.data
    const data = JSON.parse(json)
    // console.log(data)

    const { name, type, price, description, image } = data.data


    db.pool.query(`
        INSERT INTO devices (name, type, price, description, image)
        VALUES ($1, $2, $3, $4, $5);`,
        [name, type, price, description, image]
    )

    res.json({ result: 'ok' })
}

const getAllDevices = (req, res) => {


    db.pool.query(`SELECT * FROM devices ORDER BY id ASC;`, (e, result) => {
        if (e) throw e

        res.status(200).json(result.rows)
    })
}


const deleteOneDevice = (req, res) => {
    const id = req.body.id

    db.pool.query(`DELETE FROM devices WHERE id=${id}`, (e, result) => {
        if (!e) res.status(200).json({ result: 'ok' })
        else res.status(500).json({ error: e })
    })

}


const editOneDevice = (req, res) => {
    const data = JSON.parse(req.body.data)

    console.log(data)
    
    const createSetQueryString = (obj) => {
        let str = ''

        for (const prop in obj) {
            if (prop === 'id') 
                continue
            str += `${prop}='${obj[prop]}', `
        }

        str = str.slice(0, str.length - 2)
        console.log('\n\n' + str)
        return str
    }

    db.pool.query(
        `UPDATE devices
        SET ${createSetQueryString(data)}
         WHERE id=${data.id}`,
        (e, result) => {
        if (!e) res.status(200).json({result: 'ok'})
        else res.status(500).json({error: e})  
    })
    // SET name=${name}, type=${type}, model=${model}, price=${price}, description=${description}, battery_capacity=${batteryCapacity}, image=${image}
}

module.exports = {
    addDevice,
    getAllDevices,
    deleteOneDevice,
    editOneDevice
}