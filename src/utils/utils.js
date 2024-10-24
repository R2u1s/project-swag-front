//функция для парсинга массива attributes. Находит все цвета товара и соответствующий штрихкод
export function parseAttributes(arr) {
    const uniqueValues = new Set();
    const newArray = [];
    
    for (const obj of arr) {
        if (
            obj.id === 1000000001 && 
            obj.item_id !== 1 &&
            !uniqueValues.has(obj.value)
        ) {
            uniqueValues.add(obj.value);
            newArray.push(obj);
        }
    }
    
    return newArray;
}

export function getUniqueSizes(arr) {
    const sizeOrder = ['XS', 'S', 'S_v2','M','M_v2', 'L','L_v2', 'XL','XL_v2', 'XXL','2XL','2XL_v2','3XL','3XL_v2','4XL','4XL_v2' ];
    const valuesSet = new Set();

    arr.forEach(obj => {
        if (obj.name === 'Размер' && obj.value) {
            valuesSet.add(obj.value);
        }
    });

    const sortedValues = Array.from(valuesSet).sort((a, b) => {
        return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
    });

    return sortedValues.join(', ');
}

export function parseApplications(arr) {
    return arr
        .filter(obj => obj.id === 1000000008)
        .map(obj => obj.value);
}

export const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // плавная прокрутка
    });
  };

//функция для генерирования массива для хлебных крошек на основе массива переданных категорий
export const crumbsConvert = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
        return [];
    }
    return arr.reverse().map(item => ({
        url: `/catalog?category=${item.id}&page=1`,
        label: item.name
    }));
}

//функция на основе переданного списка категорий и заданной текущей категории выдает
//только текущий раздел каталога с текущей категорией. Нужно для боковой менюшки
export function setCategoryLevels(categories, currentCategoryId) {
    let currentCategory = null;

    // Вспомогательная функция для поиска категории и установки уровней
    function findCategoryAndSetLevels(category, path) {
        category.level = path.includes(category.id);

        if (category.id === currentCategoryId) {
            currentCategory = category;
            path.push(category.id);
        }

        if (Array.isArray(category.child)) {
            for (let child of category.child) {
                findCategoryAndSetLevels(child, [...path]);
            }
        }
    }

    // Ищем категорию и строим путь родителей
    function buildPathToRoot(categories, currentId) {
        for (let category of categories) {
            if (category.id === currentId) {
                if (category.parent_id !== '1') {
                    const parentPath = buildPathToRoot(categories, category.parent_id);
                    if (parentPath) {
                        return [...parentPath, category.id];
                    }
                }
                return [category.id];
            }

            if (Array.isArray(category.child)) {
                const result = buildPathToRoot(category.child, currentId);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }

    // Находим путь к корню
    const pathToRoot = buildPathToRoot(categories, currentCategoryId) || [];

    // Устанавливаем уровни для всех категорий
    categories.forEach(category => {
        if (category.parent_id === '1') {
            findCategoryAndSetLevels(category, pathToRoot);
        }
    });

    // Ищем корневую родительскую категорию
    function findRootParent(categories, currentId) {
        for (let category of categories) {
            if (category.id === currentId) {
                if (category.parent_id === '1') {
                    return category;
                }
                return findRootParent(categories, category.parent_id);
            }

            if (Array.isArray(category.child)) {
                const found = findRootParent(category.child, currentId);
                if (found) return category;
            }
        }
        return null;
    }

    const rootParent = findRootParent(categories, currentCategoryId);
    return rootParent;
}

//функция выдает массив категорий, которые нужно подвсетить/раскрыть в колонке слева
export function getCategoriesWithLevelTrue(categories) {
  let result = [];

  function traverse(categories) {
    for (const category of categories) {
      if (category.level === true) {
        result.push(category.id);
      }
      if (category.child && category.child.length > 0) {
        traverse(category.child);
      }
    }
  }

  traverse(categories);
  return result;
}
