/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    web = require('web3')

var app = express();

var db;

var cloudant;

var fileToUpload;

var dbCredentials = {
    dbName: 'usuarios_pass'
};

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

function getDBCredentialsUrl(jsonData) {
    var vcapServices = JSON.parse(jsonData);
    // Pattern match to find the first instance of a Cloudant service in
    // VCAP_SERVICES. If you know your service key, you can access the
    // service credentials directly by using the vcapServices object.
    for (var vcapService in vcapServices) {
        if (vcapService.match(/cloudant/i)) {
            return vcapServices[vcapService][0].credentials.url;
        }
    }
}

function initDBConnection() {
    //When running on Bluemix, this variable will be set to a json object
    //containing all the service credentials of all the bound services
    if (process.env.VCAP_SERVICES) {
        dbCredentials.url = getDBCredentialsUrl(process.env.VCAP_SERVICES);
    } else { //When running locally, the VCAP_SERVICES will not be set

        // When running this app locally you can get your Cloudant credentials
        // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
        // Variables section for an app in the Bluemix console dashboard).
        // Once you have the credentials, paste them into a file called vcap-local.json.
        // Alternately you could point to a local database here instead of a
        // Bluemix service.
        // url will be in this format: https://username:password@xxxxxxxxx-bluemix.cloudant.com
        dbCredentials.url = getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
    }

    cloudant = require('cloudant')(dbCredentials.url);

    // check if DB exists if not create
    cloudant.db.create(dbCredentials.dbName, function(err, res) {
        if (err) {
            console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
        }
    });

    db = cloudant.use(dbCredentials.dbName);
}

initDBConnection();

var web3 = new web(web.givenProvider || "ws://localhost:8545");
console.log(web3);

//Rutas
app.get('/', routes.index); //Home

app.get('/login', function (req, res) {
  res.render('login.html', { title: 'Hey'})
})
//Cambios Paulo
app.use('/admin', function(req, res){
    res.send('hello world');
});
//Cambios

function createResponseData(id, correo, password,) {

    var responseData = {
        id: id,
        correo: sanitizeInput(correo),
        password: sanitizeInput(password),
    };

    return responseData;
}

function sanitizeInput(str) {
    return String(str).replace(/&(?!amp;|lt;|gt;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

var saveDocument = function(id, correo, password, response) {

    if (id === undefined) {
        // Generated random id
        id = '';
    }

    db.insert({
        correo: correo,
        password: password
    }, id, function(err, doc) {
        if (err) {
            console.log(err);
            response.sendStatus(500);
        } else
            response.sendStatus(200);
        response.end();
    });

}
app.post('/api/favorites/attach', multipartMiddleware, function(request, response) {

    console.log("Upload File Invoked..");
    console.log('Request: ' + JSON.stringify(request.headers));

    var id;

    db.get(request.query.id, function(err, existingdoc) {

        var isExistingDoc = false;
        if (!existingdoc) {
            id = '-1';
        } else {
            id = existingdoc.id;
            isExistingDoc = true;
        }

        var correo = sanitizeInput(request.query.correo);
        var password = sanitizeInput(request.query.password);

        var file = request.files.file;
        var newPath = './public/uploads/' + file.correo;

        var responseData = createResponseData(
              id,
              correo,
              password);
              response.write(JSON.stringify(responseData));
              response.end();
                                    return;
                                });
                            } else {
                                console.log(err);
                            }
                        });
                    }
                }
            });
        }

        if (!isExistingDoc) {
            existingdoc = {
                correo: correo,
                password: password,
                create_date: new Date()
            };

            // save doc
            db.insert({
                correo: correo,
                password: password
            }, '', function(err, doc) {
                if (err) {
                    console.log(err);
                } else {

                    existingdoc = doc;
                    console.log("New doc created ..");
                    console.log(existingdoc);

                }
            });

        } else {
            console.log('Adding attachment to existing doc.');
            console.log(existingdoc);
            insertAttachment(file, existingdoc._id, existingdoc._rev, correo, password, response);
        }

    });

});

app.post('/api/favorites', function(request, response) {

    console.log("Create Invoked..");
    console.log("correo: " + request.body.correo);
    console.log("correo" + request.body.correo);
    console.log("correo" + request.body.correo);
    console.log("password: " + request.body.password);

    var id = request.body.id;
    var correo = sanitizeInput(request.body.correo);
    var password = sanitizeInput(request.body.password);

    saveDocument(null, correo, password, response);

});

app.delete('/api/favorites', function(request, response) {

    console.log("Delete Invoked..");
    var id = request.query.id;
    // var rev = request.query.rev; // Rev can be fetched from request. if
    // needed, send the rev from client
    console.log("Removing document of ID: " + id);
    console.log('Request Query: ' + JSON.stringify(request.query));

    db.get(id, {
        revs_info: true
    }, function(err, doc) {
        if (!err) {
            db.destroy(doc._id, doc._rev, function(err, res) {
                // Handle response
                if (err) {
                    console.log(err);
                    response.sendStatus(500);
                } else {
                    response.sendStatus(200);
                }
            });
        }
    });

});

app.put('/api/favorites', function(request, response) {

    console.log("Update Invoked..");

    var id = request.body.id;
    var correo = sanitizeInput(request.body.correo);
    var password = sanitizeInput(request.body.password);

    console.log("ID: " + id);

    db.get(id, {
        revs_info: true
    }, function(err, doc) {
        if (!err) {
            console.log(doc);
            doc.correo = correo;
            doc.password= password;
            db.insert(doc, doc.id, function(err, doc) {
                if (err) {
                    console.log('Error inserting data\n' + err);
                    return 500;
                }
                return 200;
            });
        }
    });
});

app.get('/api/favorites', function(request, response) {

    console.log("Get method invoked.. ")

    db = cloudant.use(dbCredentials.dbName);
    var docList = [];
    var i = 0;
    db.list(function(err, body) {
        if (!err) {
            var len = body.rows.length;
            console.log('total # of docs -> ' + len);
            if (len == 0) {
                // push sample data
                // save doc
                var docName = 'sample_doc';
                var docDesc = 'A sample Document';
                db.insert({
                    correo: docName,
                    password: 'A sample Document'
                }, '', function(err, doc) {
                    if (err) {
                        console.log(err);
                    } else {

                        console.log('Document : ' + JSON.stringify(doc));
                        var responseData = createResponseData(
                            doc.id,
                            docName,
                            docDesc, []);
                        docList.push(responseData);
                        response.write(JSON.stringify(docList));
                        console.log(JSON.stringify(docList));
                        console.log('ending response...');
                        response.end();
                    }
                });
            } else {

                body.rows.forEach(function(document) {

                    db.get(document.id, {
                        revs_info: true
                    }, function(err, doc) {
                        if (!err) {
                            if (doc['_attachments']) {

                                var attachments = [];
                                for (var attribute in doc['_attachments']) {

                                    if (doc['_attachments'][attribute] && doc['_attachments'][attribute]['content_type']) {
                                        attachments.push({
                                            "key": attribute,
                                            "type": doc['_attachments'][attribute]['content_type']
                                        });
                                    }
                                    console.log(attribute + ": " + JSON.stringify(doc['_attachments'][attribute]));
                                }
                                var responseData = createResponseData(
                                    doc._id,
                                    doc.correo,
                                    doc.password
                                    );

                            } else {
                                var responseData = createResponseData(
                                    doc._id,
                                    doc.correp,
                                    doc.password);
                            }

                            docList.push(responseData);
                            i++;
                            if (i >= len) {
                                response.write(JSON.stringify(docList));
                                console.log('ending response...');
                                response.end();
                            }
                        } else {
                            console.log(err);
                        }
                    });

                });
            }

        } else {
            console.log(err);
        }
    });

});


http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
    console.log('Express server listening on port ' + app.get('port'));
});
