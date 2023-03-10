import cartModel from "../models/cart.model.js"

export class CartManagerMongo {
  getCartProducts = async (cid, limit, page) => {
    try {
      const cartProducts = await cartModel.paginate({_id: cid}, {limit: limit, page: page, lean: true})
      console.log(cartProducts)
      return cartProducts
    } catch (error) {
      console.log(error)
    }
  }

  createCart = async () => {
    try {
      await cartModel.create({ products: [] });
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (cid, pid) => {
    try {
      let cart = await cartModel.findOne({ _id: cid });

      let product = cart.products.find((product) => product.pid == pid);
      console.log(cid);

      console.log(product);

      if (product !== undefined) {
        await cartModel.updateOne(
          {_id: cid},
          {$set: {"products.$[pid]": {pid: pid, quantity: product.quantity + 1}}},
          {arrayFilters: [{"pid.pid": pid}]}
        )
      }

      if (product === undefined) {
        await cartModel.findByIdAndUpdate(cid, {$push: {products:{pid: pid, quantity: 1}}})
      }
    } catch (error) {
      console.log(error)
    }
  }

  productArrayUpdate = async (cid, data) => {
    try {
      await cartModel.updateOne(
        {_id: cid},
        {$set: {'products': data}}
        )
    } catch (error) {
      console.log(error)
    }
  }

  deleteCartProducts = async (cid) => {
    try {
        let products = []

        await cartModel.updateOne(
            {_id: cid}, {$set:{'products': products}}
        )
    } catch (error) {
        console.log(error)
    }
  }
}
