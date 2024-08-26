import { ApiMethod } from './types';

const createFn = <T>(method: string, prefix: string) => <T>(
    (path: string, options: Record<string, any>) => {
        return fetch(prefix + path, {
            method,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: options?.body ? JSON.stringify(options.body) : undefined
        }).then((res) => res.json()).catch(console.log);
    }
);

export const createClient = <Paths>(prefix: string) => {
    return {
        get:    createFn<ApiMethod<Paths, 'get'   >>('get',    prefix),
        post:   createFn<ApiMethod<Paths, 'post'  >>('post',   prefix),
        put:    createFn<ApiMethod<Paths, 'put'   >>('put',    prefix),
        delete: createFn<ApiMethod<Paths, 'delete'>>('delete', prefix),
        patch:  createFn<ApiMethod<Paths, 'patch' >>('patch',  prefix),
    }
}