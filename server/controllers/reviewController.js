module.exports = {
    get: (req, res, next) => {
        console.log(`getting review for: ${req.params.fanfic}`)
        const dbInstance = req.app.get('db')
        dbInstance.getReviews(req.params.fanfic)
            .then(reviews => res.status(200).send(reviews))
            .catch(err => res.status(500).send(err))
    },
    add: (req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(`adding review:`)
        console.log(req.body)
        let { fanfic_id, user_id, stars, review } = req.body
        dbInstance.postReview([fanfic_id, user_id, stars, review])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    delete: (req, res, next) => {
        const dbInstance = req.app.get('db')
        console.log(`deleting review ${req.params.review} by ${req.params.user}`)
        dbInstance.deleteReview([req.params.review, req.params.user])
            .then(()=>res.status(200).send())
            .catch(()=>res.status(500).send())
    }
}