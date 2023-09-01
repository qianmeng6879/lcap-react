import React from "react";


const data = import.meta.glob("../pages/**/*.tsx", {
    eager: true,
    import: "default",
})

const routes = Object.entries(data).map(([path, component]) => {
    path = path.replace("../pages", "").replace(".tsx", "").replace("/index", '').toLowerCase();
    if (!path) path = "/";
    return {
        path,
        element: React.createElement(component),
    };
});


const firstLevelRoutes = routes.filter(item => {
    return !item.path.substring(1).includes("/")
})


routes.filter(route => {
    return route.path.substring(1).includes("/")
}).map(route => {
    const element = route.path.substring(1).split("/")
    const parent = firstLevelRoutes.filter(item => item.path.startsWith(`/${element[0]}`))

    if (parent.length > 0) {
        if (!parent[0].children) {
            parent[0].children = [

            ]
        }

        parent[0].children.push(route)
    }
})
export default firstLevelRoutes;