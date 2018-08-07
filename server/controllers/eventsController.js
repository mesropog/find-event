const Event = require('../models/event');

exports.saveEvent = function(req, res, next) {
    const title = req.body.title;
    const location = req.body.location;
    const startDate = req.body.startDate;
    const endDate   = req.body.endDate;
    const photoPath     = req.body.photoPath;
    const description = req.body.description;
    const organizerName = req.body.organizerName;

    //console.log(req.body);

    const submissionErrors = [];

    if (!title) submissionErrors.push('You must provide title for your event');
    if (!location) submissionErrors.push('You must specify location for your event');
    if (!startDate) submissionErrors.push('You must specify start date for your event');
    if (!endDate) submissionErrors.push('You must specify end date for your event');
    if (!description) submissionErrors.push('You must specify description of your event');
    if (!organizerName) submissionErrors.push('You must provide your name');

    if (submissionErrors.length) return res.status(422).send({errors : submissionErrors});

    const event = new Event({
        title : title,
        location : location,
        startDate : startDate,
        endDate   : endDate,
        photoPath   : photoPath,
        description : description,
        organizerName : organizerName
    });

    event.save(function(err){
        if(err) return next(err);
        return res.status(200).send({message : 'Event was saved successfully'});
    })
};