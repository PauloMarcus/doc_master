export const formatRouteBuild = <T>() => {
    return (routeName: T, params?: any): string => {
        const route = routeName as unknown as string;

        const has = route.includes(':');

        if (has && !params) throw new Error('Params not informed for route ' + route);
        if (!has && params) throw new Error('Params is present, but route has no wildcard: ' + route);

        return has ? route.replace(/(:[^/]+)/g, (x) => params[x.substring(1)]) : route;
    };
};
