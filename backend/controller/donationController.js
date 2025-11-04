const { createError } = require("../middlewares/common/errorHandler");
const pool = require("../db/config/dbConfig");
const validator = require("validator");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.DONATION_STORE_ID;
const store_passwd = process.env.DONATION_STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox
const sendEmail = require("../middlewares/nodeMailer/nodemailer");

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

    const result = await pool.query(
      `INSERT INTO donation (txn_id, email, amount) VALUES ($1, $2, $3) RETURNING *`,
      [tran_id, email, amount]
    );

    const GatewayPageURL = apiResponse.GatewayPageURL;
    res.status(200).json({ url: GatewayPageURL });
  } catch (err) {
    next(err);
  }
}

async function success(req, res, next) {
  const { tran_id } = req.body;

  try {
    const donation = await pool.query(
      `SELECT * FROM donation WHERE txn_id = $1`,
      [tran_id]
    );

    if (donation.rows.length > 0) {
      const donator = donation.rows[0].email;
      const subject = "Donation Successful in Maktabatus Salam";
      const text = `Thanks for your donation in Maktabatus Salam. Your Transaction Id is ${tran_id}`;
      try {
        const response = await sendEmail(donator, subject, text);
      } catch (err) {
        // console.log(err);
      }
    }

    res.redirect(`${process.env.DONATION_URL_GET}/${tran_id}`);
  } catch (err) {
    next(err);
  }
}

async function fail(req, res, next) {
  const { tran_id } = req.body;

  try {
    const result = await pool.query(
      `DELETE FROM donation WHERE txn_id = $1 RETURNING *`,
      [tran_id]
    );
  } catch (err) {
    next(err);
  }

  res.redirect(`${process.env.DONATION_URL_GET}/fail`);
}

async function cancel(req, res, next) {
  const { tran_id } = req.body;

  try {
    const result = await pool.query(
      `DELETE FROM donation WHERE txn_id = $1 RETURNING *`,
      [tran_id]
    );
  } catch (err) {
    next(err);
  }

  res.redirect(`${process.env.DONATION_URL_GET}/cancel`);
}

async function list(req, res, next) {
  try {
    const donation = await pool.query(
      `SELECT * FROM donation ORDER BY date DESC`
    );
    const total_donation = await pool.query(`SELECT SUM(amount) FROM donation`);

    res.status(200).json({
      donations: donation.rows,
      total_donation: total_donation.rows[0].sum,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  donation,
  success,
  fail,
  cancel,
  list,
};
