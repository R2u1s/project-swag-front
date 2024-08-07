// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  items: [],
  setItems: (newItems) => set({ items: newItems }),
  loader: false,
  setLoader: (newLoader) => set({ loader: newLoader }),
  count: 0,
  setCount: (newItems) => set({ count: newItems }),
  activeSearch: 0,
  setActiveSearch: (newItems) => set({ count: newItems }),
  activeCategory: "",
  setActiveCategory: (newItems) => set({ activeCategory: newItems }),
  cart: [],
  setCart: (newItem) =>
    set((state) => {
      const exists = state.cart.find(
        (item) => item.productNumber === newItem.productNumber
      );
      if (exists) {
        return {
          cart: state.cart.filter(
            (item) => item.productNumber !== newItem.productNumber
          ),
        };
      } else {
        return {
          cart: [...state.cart, newItem],
        };
      }
    }),
  search: false,
  setSearch: (newItems) => set({ search: newItems }),
  second: false,
  setSecond: (newItems) => set({ second: newItems }),
  burger: false,
  setBurger: (newItems) => set({ burger: newItems }),
  filter: false,
  setFilter: (newItems) => set({ filter: newItems }),
  filterShow: false,
  setFilterShow: (newItems) => set({ filterShow: newItems }),
  searchName: "",
  setSearchName: (newItems) => set({ searchName: newItems }),
  offcetPrice: {
    start: 0,
    end: 0,
  },
  setOffcetPrice: (newItems) => set({ offcetPrice: newItems }),
  removeCart: (productNumber) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productNumber !== productNumber),
    })),

  favorites: [],
  setFavorites: (newItem) =>
    set((state) => {
      const exists = state.favorites.find(
        (item) => item.productNumber === newItem.productNumber
      );
      if (exists) {
        return {
          favorites: state.favorites.filter(
            (item) => item.productNumber !== newItem.productNumber
          ),
        };
      } else {
        return {
          favorites: [...state.favorites, newItem],
        };
      }
    }),
  removeFavorites: (productNumber) =>
    set((state) => ({
      favorites: state.cart.filter(
        (item) => item.productNumber !== productNumber
      ),
    })),
  page: 1,
  setPage: (newItems) => set({ page: newItems }),
  
}));

export default useStore;
