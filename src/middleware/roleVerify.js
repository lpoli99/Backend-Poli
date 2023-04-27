export function roleAdminVerify(req, res, next){
    if (req.session?.admin) {
        return next()
    }
    return res.status(401).send('You are not an admin!')
}
export function roleUserVerify(req, res, next){
    if (req.session?.user) {
        return next()
    }
    return res.status(401).send('You are not an user!')
}