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
    const sizeOrder = ['XS', 'S', 'S_v2', 'M', 'M_v2', 'L', 'L_v2', 'XL', 'XL_v2', 'XXL', '2XL', '2XL_v2', '3XL', '3XL_v2', '4XL', '4XL_v2'];
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

    let temp = '';
    return arr.map(item => {
        temp = temp + '/' + item.name_eng;
        return {
            url: `/catalog${temp}?page=1`,
            label: item.name
        }
    }, '');
}

//функция на основе переданного списка категорий и заданной текущей категории выдает
//только текущий раздел каталога с текущей категорией. Нужно для боковой менюшки
//закомментированный вариант ниже выводит только родительский раздел
function cloneCategories(categories) {
    return categories.map(category => ({
        ...category,
        child: cloneCategories(category.child || [])
    }));
}

export function setCategoryLevels(categories, currentCategoryId, level) {
    const clonedCategories = cloneCategories(categories);

    function findCategoryAndSetLevels(category, path) {

        category.level = level ? path.includes(category.id) : false;

        if (Array.isArray(category.child)) {
            for (let child of category.child) {
                findCategoryAndSetLevels(child, path);
            }
        }
    }

    function buildPathToRoot(categories, currentId, path = []) {
        for (let category of categories) {
            if (category.id === currentId) {
                path.push(category.id);
                if (category.parent_id !== '1') {
                    buildPathToRoot(categories, category.parent_id, path);
                }
                return path;
            }

            if (Array.isArray(category.child)) {
                const result = buildPathToRoot(category.child, currentId, path);
                if (result.length) {
                    path.push(category.id);
                    return path;
                }
            }
        }
        return [];
    }

    const pathToRoot = buildPathToRoot(clonedCategories, currentCategoryId).reverse();

    clonedCategories.forEach(category => {
        if (category.parent_id === '1') {
            findCategoryAndSetLevels(category, pathToRoot);
        }
    });

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

    const rootParent = findRootParent(clonedCategories, currentCategoryId);
    return rootParent;
}
// function cloneCategories(categories) {
//     return categories.map(category => ({
//         ...category,
//         child: cloneCategories(category.child || [])
//     }));
// }

// export function setCategoryLevels(categories, currentCategoryId) {
//     const clonedCategories = cloneCategories(categories);

//     function findCategoryAndSetLevels(category, path) {
//         category.level = path.includes(category.id);

//         if (Array.isArray(category.child)) {
//             for (let child of category.child) {
//                 findCategoryAndSetLevels(child, path);
//             }
//         }
//     }

//     function buildPathToRoot(categories, currentId, path = []) {
//         for (let category of categories) {
//             if (category.id === currentId) {
//                 path.push(category.id);
//                 if (category.parent_id !== '1') {
//                     buildPathToRoot(categories, category.parent_id, path);
//                 }
//                 return path;
//             }

//             if (Array.isArray(category.child)) {
//                 const result = buildPathToRoot(category.child, currentId, path);
//                 if (result.length) {
//                     path.push(category.id);
//                     return path;
//                 }
//             }
//         }
//         return [];
//     }

//     const pathToRoot = buildPathToRoot(clonedCategories, currentCategoryId).reverse();

//     clonedCategories.forEach(category => {
//         findCategoryAndSetLevels(category, pathToRoot);
//     });

//     return clonedCategories;
// }

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

//функция возвращает массив с перечислением названий родительских категорий для текущей по id
//используется для генерирования url вида: odezhda/verkhnyaya-odezhda/dozhdeviki
//сохраняем и name и name_eng для формирования хлебных крошек (crumbsConvert выше)
export function findCategoryPath(categories, targetId) {
    // Вспомогательная рекурсивная функция
    function findPathRecursive(categories, targetId, path) {
        for (const category of categories) {
            // Добавляем текущую категорию в путь
            const newPath = [...path, {
                name: category.name,
                name_eng: category.name_eng
            }];

            // Проверяем, совпадает ли текущее ID с целевым
            if (category.id === targetId) {
                return newPath; // Возвращаем путь, если нашли целевую категорию
            }

            // Если у категории есть дочерние элементы, ищем в них
            if (category.child && category.child.length > 0) {
                const result = findPathRecursive(category.child, targetId, newPath);
                if (result) {
                    return result; // Если нашли, возвращаем результат
                }
            }
        }
        return null; // Если не нашли, возвращаем null
    }

    // Начинаем поиск с пустого пути
    return findPathRecursive(categories, targetId, []);
}

//функция возвращает массив названий категорий, вытаскивая их из url
export const extractCategories = (pathname) => {
    const regex = /\/catalog\/([^?]*)/;
    const match = pathname.match(regex);

    if (match && match[1]) {
        return match[1].split('/');
    }

    return [];
};

//функция возвращает id категории по пути, построенному из имен категорий типа
// ['odezhda','verkhnyaya-odezhda','dozhdeviki']
export function findCategoryId(categories, path) {

    function findCategory(categories, path) {
        if (path.length === 0) {
            return null;
        }

        const currentCategoryName = path[0];
        const remainingPath = path.slice(1);
        for (const category of categories) {
            if (category.name_eng === currentCategoryName) {
                if (remainingPath.length === 0) {
                    return category.id;
                } else {
                    return findCategory(category.child || [], remainingPath);
                }
            }
        }
        return null;
    }

    return findCategory(categories, path);
}