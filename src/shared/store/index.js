// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  items: [],
  setItems: (newItems) => set(() => {
    if (Array.isArray(newItems)) {
      return {items: newItems};
    } else if (typeof newItems === 'object' && newItems !== null) {
      return{items: [newItems]};
    } else {
      return {items:[]};
    }
  }),
  categories: [],
  setCategories: (items) => set(() => {
    if (Array.isArray(items)) {
      return { categories: items };
    } else {
      return { categories: [] };
    }
  }),
  loader: false,
  setLoader: (newLoader) => set({ loader: newLoader }),
  count: null,
  setCount: (newItems) => set({ count: newItems }),
  activeSearch: 0,
  setActiveSearch: (newItems) => set({ count: newItems }),
  activeCategory: {},
  setActiveCategory: (newItems) => set(() => {
    //console.log(newItems);
    return { activeCategory: newItems }
  }),
  cart: [],
  setCartByAddingItem: (newItem) => set((state) => {
    if (!Array.isArray(state.cart)) state.cart = [];

    const { id, qty } = newItem;

    const existingProductIndex = state.cart.findIndex(item => item.id === id);

    const newCart = existingProductIndex !== -1
      ? state.cart.map((item, index) =>
        index === existingProductIndex
          ? { ...item, qty: item.qty + qty }
          : item
      )
      : [...state.cart, newItem];
    localStorage.setItem('cart', JSON.stringify(newCart));

    return { cart: newCart };
  }),

  setCart: (newArr) => set(() => {
    if (!Array.isArray(newArr)) throw new Error("newArr should be an array");
    return { cart: newArr };
  }),

  setCartQtyItem: (obj) => set((state) => {
    const { id, qty } = obj;

    const existingProductIndex = state.cart.findIndex(item => item.id === id);

    let newCart = state.cart;

    if (existingProductIndex >= 0) {
      newCart = state.cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            qty: qty
          }
        } else {
          return item;
        }
      });
    }

    return { cart: newCart };
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
  removeCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log(newCart);
      return { cart: newCart }
    }),

  favorites: [],
  setFavoritesByAddingItem: (newItem) =>
    set((state) => {
      if (!Array.isArray(state.favorites)) state.favorites = [];

      const { id } = newItem;
      const existingProductIndex = state.favorites.findIndex(item => item.id === id);

      const newFavorites = existingProductIndex !== -1
        ? state.favorites.filter(item => item.id === id)
        : [...state.favorites, newItem];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      return { favorites: newFavorites };
    }),
  setFavorites: (newArr) => set(() => {
    if (!Array.isArray(newArr)) throw new Error("newArr should be an array");
    return { favorites: newArr };
  }),
  removeFavorites: (id) =>
    set((state) => {
      const newFavorites = state.favorites.filter((item) => item.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return {
        favorites: state.favorites.filter(
          (item) => item.id !== id
        )
      }
    }),
  lastseen: [],
  setLastseenByAddingItem: (newItem) =>
  set((state) => {
    const  id  = newItem;
    
    // Инициализация пустого массива, если state.lastseen не существует
    const lastseen = Array.isArray(state.lastseen) ? state.lastseen : [];

    // Проверяем, существует ли уже элемент с таким id
    const exists = lastseen.some(item => item.id === id);

    // Если элемент уже есть, возвращаем текущее состояние
    if (exists) return { lastseen };

    // Добавляем новый элемент в начало
    const updatedLastseen = [...lastseen,newItem];

    // Ограничиваем массив до 10 элементов
    if (updatedLastseen.length > 10) {
      updatedLastseen.pop();
    }

    // Сохраняем в localStorage
    localStorage.setItem('lastseen', JSON.stringify(updatedLastseen));

    return { lastseen: updatedLastseen };
    }),
  setLastseen: (newArr) => set(() => {
    if (!Array.isArray(newArr)) throw new Error("newArr should be an array");
    return { lastseen: newArr };
  }),
  page: 1,
  setPage: (newItems) => set({ page: newItems }),

}));

export default useStore;
