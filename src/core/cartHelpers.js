export const addItem = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({
      ...item,
      count: 1,
    });

    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getItems = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

export const updateItem = (id, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      // eslint-disable-next-line array-callback-return
      cart.map((product, index) => {
        if (product._id === id) {
          cart[index].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};

export const removeItem = (id) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      // eslint-disable-next-line array-callback-return
      cart.map((product, index) => {
        if (product._id === id) {
          cart.splice(index, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  return cart;
};

export const removeCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};
