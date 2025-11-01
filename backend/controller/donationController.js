const { createError } = require("../middlewares/common/errorHandler");
const validator = require("validator");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.DONATION_STORE_ID;
const store_passwd = process.env.DONATION_STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

async function donation(req, res, next) {
  try {
    let { amount, email } = req.body;

    amount = amount?.trim();
    email = email?.trim();

    if (!validator.isInt(amount, { min: 1 })) {
      throw createError(400, "Invalid total amount!");
    }

    if (!validator.isEmail(email)) {
      throw createError(400, "Invalid email address!");
    }

    amount = parseInt(amount);
    const tran_id = `TXN${Date.now()}${Math.floor(Math.random() * 1e6)}`;

    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id: tran_id,
      success_url: `${process.env.DONATION_SUCCESS_URL_POST}/${tran_id}`,
      fail_url: `${process.env.DONATION_FAIL_URL_POST}`,
      cancel_url: `${process.env.DONATION_CANCEL_URL_POST}`,
      ipn_url: "",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: email,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);
    const GatewayPageURL = apiResponse.GatewayPageURL;
    res.status(200).json({ url: GatewayPageURL });
  } catch (err) {
    next(err);
  }
}


async function success(req, res, next) {
    const { tran_id } = req.params;
  res.redirect(`${process.env.DONATION_URL_GET}/${tran_id}`);
}


async function fail(req, res, next) {
    res.redirect(`${process.env.DONATION_URL_GET}/fail`);
}

async function cancel(req, res, next) {
    res.redirect(`${process.env.DONATION_URL_GET}/cancel`);    
}



module.exports = {
    donation,
    success,
    fail,
    cancel,
};
