
var Feedback = require('../Model/Feedback')

exports.getFeedback = async function (query) {
    try {
        return await Feedback.find(query)
    } catch (e) {
        throw Error('Error while Fetching Feedback')
        return []
    }
}

exports.addFeedback = async function (body, page, limit) {
    try {
        const feedback = new Feedback(body)
        return await feedback.save()
    } catch (e) {
        throw Error('Error while Saving Feedback')
        return null
    }
}
