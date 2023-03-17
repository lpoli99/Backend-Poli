function validation (req, res, next){
    let {title, description, price, thumbnail, code, stock, category, status} = req.body
    if (!title || !description || !price || !thumbnail || !code || !stock || !category || !status)  {
        return res.status(401).send({mensaje: 'You must fill all empty spaces!'})
    }
    return next()
}

export default validation
