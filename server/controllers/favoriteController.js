module.exports = {
    get: (req, res, next) => {
        console.log(`getting favorites for user: ${req.params.user}`)
        const dbInstance = req.app.get('db')
        dbInstance.getFavorites([req.params.user])
            .then(favorites => res.status(200).send(favorites))
            .catch(err => res.status(500).send(err))
    },
    add: (req, res, next) => {
        console.log(`adding favorite ${req.body.fanfic_id} for user: ${req.body.user_id}`)
        const dbInstance = req.app.get('db')
        let { user_id, fanfic_id } = req.body
        dbInstance.postFavorite([user_id, fanfic_id, false])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    read: (req, res, next) => {
        console.log(`marking favorite ${req.query.fanfic} read for user: ${req.query.user}`)
        const dbInstance = req.app.get('db')
        dbInstance.toggleRead([req.query.fanfic, req.query.user])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    delete: (req, res, next) => {
        console.log(`deleting favorite ${req.query.fanfic} for user: ${req.query.user}`)
        const dbInstance = req.app.get('db')
        dbInstance.deleteFavorite([req.query.fanfic, req.query.user])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    }
}