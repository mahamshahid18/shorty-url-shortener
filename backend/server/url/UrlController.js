'use strict';

const shortid = require('shortid');
const express = require('express');
const Url = require('./Url');

const router = express.Router();

let checkUrlExists = (req, res, next) => {
    Url.findOne(
        { "long_url": req.body.url }
    )
    .then((data) => {
        if (data) {
            req.resolvedUrl = data.short_url;
        }
        next();
    })
    .catch((err) => next(err));
}

router.route('/')
    .post(checkUrlExists, (req, res, next) => {
        const resolved = req.resolvedUrl;
        if (resolved) {
            res.status(200).send(resolved);
            console.log('Shortened url already exists: %s', resolved);
        } else {
            const longUrl = req.body.url;
            const shortUrl = `${process.env.APP_BASE_URL}${shortid.generate()}`;
            const expiry = req.body.expiry;

            const urlRecord = new Url({
                long_url: longUrl,
                short_url: shortUrl,
                created_at: new Date(),
                expired: false,
                expiry,
            });
            urlRecord.save()
            .then((data) => {
                res.status(200).send(data.short_url);
                console.log('Sending new shortened url: %s', data.short_url);
            })
            .catch(err => next(err));
        }

    })
    .get((req, res, next) => {
        const shortUrl = req.query.shorturl;
        Url.findOne(
            { "short_url": shortUrl }
        )
        .then((record) => {
            if (!record) {
                console.log('Short url %s does not exist in db', shortUrl);
                return res
                  .status(404)
                  .send("No such resource exists!");
            }

            res.status(200);
            res.send(record.long_url);
            console.log('Short url %s resolved to %s', shortUrl, record.long_url);
        })
        .catch(err => next(err));
    });

module.exports = router;
