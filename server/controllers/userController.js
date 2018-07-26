module.exports = {
    add: (req, res, next) => {
        console.log(`adding user ${req.query.username} with password ${req.query.password}`)
        const dbInstance = req.app.get('db')
        dbInstance.postUser([req.query.username, req.query.password])
            .then(res.status(200).send())
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    },
    delete: (req, res, next) => {
        console.log(`removing user ${req.query.user_id}`)
        const dbInstance = req.app.get('db')
        dbInstance.deleteUser([req.query.user_id])
            .then(res.status(200).send())
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    },
    get: (req, res, next) => {
        console.log(`getting all users`)
        const dbInstance = req.app.get('db')
        dbInstance.checkAPIKey([req.query.key])
            .then(results => {
                if (JSON.stringify(results[0].api_key) == req.query.key) {
                    dbInstance.getUsers()
                        .then(users => res.status(201).send(users))
                        .catch(err => {
                            console.log(err)
                            res.status(500).send(err)
                        })
                }
                else
                    res.status(401).send()
            })
            .catch(() => {
                //unathorized
                res.status(500).send()
            })
    }
}