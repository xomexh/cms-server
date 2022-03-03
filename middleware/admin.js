module.exports = function (req,res,next){
    const token = req.header('x-auth-token')
    if(!token)
    return res.status(401).send('Access denied. No token sent')
    else
    return next()
}