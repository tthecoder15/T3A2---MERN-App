import customErrors from "../errorObjs.js"

function errorHandler (err, req, res, next) {
    let retErrObj

    // Handles mongoose errors with multiple errors at once 
    if ("errors" in err) { 
        let errKeys = Object.keys(err.errors)
        retErrObj = {"error/s": errKeys}
        for (let err1 of errKeys) {
            if (err.errors[err1].reason) {
                retErrObj[err.errors[err1].path] = `${err.errors[err1].reason}`
            }
            else {
                retErrObj[err.errors[err1].path] = `${err.errors[err1].message}`
            }
        }
        res.status(400).send(retErrObj)
    }

    // Handles mongoose errors with only one error
    else if ("path" in err) {
        retErrObj = {"error/s": [err.name]}
        retErrObj[err.name] = String(err.reason)
        res.status(400).send(retErrObj)
    }

    // Handles JWT auth errors
    else if (err.code == 'credentials_bad_format' || err.code == 'credentials_required' || err.code == 'invalid_token') {
        retErrObj = {"error/s": [err.code]}
        retErrObj[err.code] = err.inner.message
        res.status(400).send(retErrObj)
    }

    // Handles custom errors I have coded, errors thrown are described in '../errorObjs.js'
    else {
        if (typeof(err.code) == 'number') {
            retErrObj = {...err}
            delete retErrObj.code
            res.status(err.code).send(retErrObj.message)
        }
        else if (err.status) {
            res.status(err.status).send(err)
        }
        else {
            res.send(err).status(400)
        }
    }
}

export default errorHandler