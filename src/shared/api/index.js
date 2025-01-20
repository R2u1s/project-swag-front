import ky from "ky";
import { PAGINATION } from "../../utils/constants";
import _ from 'lodash';

/* const backend = "http://localhost:3000"; */
export const backend = `http://77.238.250.70`

export const getImageGiftsUrl = _.debounce((url) => {
  return `${backend}/api/imagegifts/?url=${url}`;
}, 250);

const api = ky.create({
  prefixUrl: `${backend}/api/`,
  timeout: 60000,
});

export const getCatalog = async (start, end) => {
  // return await api.get(`catalog?start=${start}&end=${end}`).json();

};

export const getOneProduct = async (id) => {
  return await api.get(`catalog/product/${id}`).json();
};

export const getAllCategories = async () => {
  return await api.get(`catalog/categories`).json();
};

export const getAnotherColorProduct = async (id,catalog) => {
  return await api.get(`catalog/product?id=${id}&catalog=${catalog}`).json();
};

export const getCartProducts = async (arrayId) => {
  return await api.post(`catalog/cart`,{
    json: {
      arrayId: arrayId
    }
  }).json();
};

export const getGroupProducts = async (arrayId) => {
  return await api.post(`catalog/group`,{
    json: {
      arrayId: arrayId
    }
  }).json();
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
export const getCategoryProducts = async (data, page) => {
  return await api
    .post(`catalog/category?pagination=${PAGINATION}&page=${page}`, {
      json: {
        category: data,
      },
    })
    .json();
};
export const getCategoryInfo = async (id) => {
  return await api
    .get(`catalog/category?id=${id}`).json();
};
export const getCategoryProductsCount = async (data) => {
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

export const searchProduct = async (data, page) => {
  return await api
    .post(`catalog/search?pagination=${PAGINATION}&page=${page}`, {
      json: {
        name: data,
      },
    })
    .json();
};

export const findProductOtherColor = async (data) => {
  return await api
    .post('catalog/findpic', {
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

export const findSimilarProducts = async (id) => {
  return await api.get(`catalog/findsimilarproducts/${id}`).json();
};

export const getFiles = async (id) => {
  return await api.get(`catalog/files/${id}`).json();
};
