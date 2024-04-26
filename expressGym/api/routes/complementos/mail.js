const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = require("../account_transport.json");

const mail_rover = async (callback) => {
    const oauth2Client = new OAuth2(
        accountTransport.auth.clientId,
        accountTransport.auth.clientSecret,
        "https://developers.google.com/oauthplayground",
    );
    oauth2Client.setCredentials({
        refresh_token: accountTransport.auth.refreshToken,
        tls: {
            rejectUnauthorized: false
        }
    });
    oauth2Client.getAccessToken((err, token) => {
        if (err)
            return console.log(err);;
        accountTransport.auth.accessToken = token;
        callback(nodemailer.createTransport(accountTransport));
    });
};

send(mail_rover)
function send(callback) {
    mail_rover(function (emailTransporter) {
                json = {
                    url: _SERVER + 'check/', mail: emailTransporter, app: 'CHECK', from: 'Check <colinagym3@gmail.com>',
                    to: 'CHECK <vic.cabello@duocuc.cl>',
                    slogan: 'uwu nya',
                    body_bienvanida: 'Hola', head_bienvanida: 'nyaaaaaaaaaaaaaaaaaaaaaaaaa'
                };
                return callback(json);
        })
    }

