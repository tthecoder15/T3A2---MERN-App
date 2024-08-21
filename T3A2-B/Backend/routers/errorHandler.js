function errorHandler (err, req, res, next) {
    let jsonErr = err
    let jsonErrKeys = Object.keys(jsonErr.errors)
    let retErrObj = {"error/s": jsonErrKeys}
    for (let err of jsonErrKeys) {
        if (jsonErr.errors[err].reason) {
            retErrObj[jsonErr.errors[err].path] = `${jsonErr.errors[err].reason}`
        }
        else {
            retErrObj[jsonErr.errors[err].path] = `${jsonErr.errors[err].message}`
        }
    }
    res.status(400).send(retErrObj)
}

export default errorHandler