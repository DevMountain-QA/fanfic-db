module.exports = {
    add: (req, res, next) => {

        console.log(`adding: `)
        console.log(req.body)

        const dbInstance = req.app.get('db')
        const { title, author, synopsis } = req.body;
        dbInstance.checkAPIKey([req.query.key])
            .then(results => {
                if (JSON.stringify(results[0].api_key) == req.query.key) {
                    dbInstance.postFanfic([title, author, synopsis])
                        .then(() => res.status(201).send())
                        .catch(() => res.status(500).send())
                }
                else (res.status(401).send())
            })
            .catch(() => {
                //unautorized
                res.status(500).send()
            })

    },
    edit: (req, res, next) => {

        const dbInstance = req.app.get('db')
        let { title, author, synopsis } = req.body;
        console.log(`editing: title ${title} author ${author} synopsis ${synopsis}`)
        dbInstance.checkAPIKey([req.query.key])
            .then(results => {
                if (JSON.stringify(results[0].api_key) == req.query.key) {
                    dbInstance.getOneFanfic([req.params.id])
                        .then(result => {
                            let fanfic = result[0]
                            if (!title){
                                title = fanfic.title
                            }
                            if (!author)
                                author = fanfic.author
                            if (!synopsis)
                                synopsis = fanfic.synopsis
                            console.log(`title: ${title}, author: ${author}, synopsis: ${synopsis}`)
                            dbInstance.editFanfic([req.params.id, title, author, synopsis])
                                .then(res.status(202).send())
                                .catch(() => res.status(500).send())
                        })
                        .catch(() => res.status(500).send())
                }
            })
            .catch(() => {
                //unathorized
            })


    },
    delete: (req, res, next) => {
        const dbInstance = req.app.get('db')
        dbInstance.checkAPIKey([req.query.key])
            .then(results => {
                if (JSON.stringify(results[0].api_key) == req.query.key) {
                    dbInstance.deleteFanfic([req.params.id])
                        .then(res.status(202).send())
                        .catch(() => res.status(500).send())
                }
                else
                    res.status(401).send()
            })
            .catch(() => {
                //unathorized
            })

    },
    get: (req, res, next) => {
        console.log(`Get all the fanfics`)
        const dbInstance = req.app.get('db');
        dbInstance.getFanfic()
            .then(fanfic => res.status(200).send(fanfic))
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    },
    search: (req, res, next) => {
        console.log(`Searching for:`)
        console.log([req.query.search])

        const dbInstance = req.app.get('db');

        dbInstance.searchFanfic([req.query.search])
            .then(fanfic => res.status(418).send(fanfic))
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    }
}