const dotenv = require("dotenv");
dotenv.config();
const Iyzipay = require("iyzipay");

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZIPAY_API_KEY,
  secretKey: process.env.IYZIPAY_SECRET_KEY,
  uri: "https://sandbox-api.iyzipay.com",
});

const createCheckoutForm = async (req, res) => {
  const { products, user } = req.body;

  const items = products.map((product) => ({
    id: `P${product.name}`,
    name: product.name,
    category1: "General",
    itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
    price: product.price / 100,
  }));

  const request = {
    locale: Iyzipay.LOCALE.TR,
    price: (products.reduce((total, product) => total + product.price, 0) / 100).toString(),
    paidPrice: (products.reduce((total, product) => total + product.price, 0) / 100).toString(),
    currency: Iyzipay.CURRENCY.TRY,
    basketId: "B67832",
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: `${process.env.CLIENT_DOMAIN}/iyzico/callback`,
    buyer: {
      id: "BY789",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: user.email,
      identityNumber: "74300864791",
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      ip: req.ip,
      city: "Istanbul",
      country: "Turkey",
    },
    shippingAddress: {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
    },
    billingAddress: {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
    },
    basketItems: items,
  };

  iyzipay.checkoutFormInitialize.create(request, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error." });
    }

    // Başarıyla paymentPageUrl döndürülür
    res.status(200).json({ paymentPageUrl: result.paymentPageUrl });
  });
};

// Callback URL'de sonucu işleyen kısım
const handleCallback = async (req, res) => {
  const { token } = req.body;

  const request = {
    locale: Iyzipay.LOCALE.TR,
    token: token,
  };

  iyzipay.checkoutForm.retrieve(request, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error." });
    }

    if (result.paymentStatus === "SUCCESS") {
      // İşlem başarılıysa /success sayfasına yönlendir
      res.redirect('/success');
    } else {
      // İşlem başarısızsa /fail sayfasına yönlendir
      res.redirect('/fail');
    }
  });
};

module.exports = { createCheckoutForm, handleCallback };