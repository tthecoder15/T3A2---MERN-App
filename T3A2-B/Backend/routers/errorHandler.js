function errorHandler (err, req, res, next) {
    let retErrObj
    if ('path' in err) {
        let errKeys = Object.keys(err.errors)
        retErrObj = {"error/s": errKeys}
        for (let err of errKeys) {
            if (err.errors[err].reason) {
                retErrObj[err.errors[err].path] = `${err.errors[err].reason}`
            }
            else {
                retErrObj[err.errors[err].path] = `${err.errors[err].message}`
            }
        }
    }
    else if (err.code == 'credentials_required' || err.code == 'invalid_token') {
        retErrObj = {"error/s": [err.code]}
        retErrObj[err.code] = err.inner.message
        res.status(400).send(retErrObj)
    }
    else {
        res.status(400).send(err)
    }
    
}

export default errorHandler