import ky from "ky";

const api = ky.create({
  //prefixUrl: "http://77.238.247.8:3000/api/",
  prefixUrl: "http://localhost:3000/api/",
  timeout: 60000,
});

export const getCatalog = async (start, end) => {
  return await api.get(`catalog?start=${start}&end=${end}`).json();
};

export const getOneProduct = async (id) => {
  return await api.get(`catalog/product/${id}`).json();
};

export const getBarcodeProduct = async (code) => {
  return await api.get(`catalog/barcode/${code}`).json();
};

export const postLocalStorageId = async (id) => {
  return await api
    .post("catalog", {
      json: {
        ids: id,
      },
    })
    .json();
};

export const categoryCatalog = async (data, start, end) => {
  return await api
    .post(`catalog/category?start=${start}&end=${end}`, {
      json: {
        category: data,
      },
    })
    .json();
};
export const categoryCatalogCount = async (data) => {
  return await api
    .post(`catalog/category/count`, {
      json: {
        category: data,
      },
    })
    .json();
};

export const getCountCatalog = async () => {
  return await api.get(`catalog/count`).json();
};

export const searchProduct = async (start, end, data) => {
  return await api
    .post(`catalog/search?start=${start}&end=${end}`, {
      json: {
        name: `%${data}%`,
      },
    })
    .json();
};
export const searchProductCount = async (data) => {
  return await api
    .post("catalog/search", {
      json: {
        name: `%${data}%`,
      },
    })
    .json();
};

export const filterProduct = async (
  start,
  end,
  brand,
  startPrice,
  endPrice
) => {
  return await api
    .post(`catalog/price?start=${start}&end=${end}`, {
      json: {
        start_price: startPrice,
        end_price: endPrice,
        brand: brand,
      },
    })
    .json();
};
