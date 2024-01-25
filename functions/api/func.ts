interface Env {
}

export const onRequest: PagesFunction<Env> = async (context) => {
    try {
        const data: any = await readRequestBody(context.request);
        console.log(data);

        return new Response(JSON.stringify({text:"ok"}),{
            headers: {
                'Content-Type': 'application/json'
            },
            status: 200
        });
    } catch (e) {
        console.error("func", context.request.url, e, e.stack);
    }
    return new Response("Not Found", {status: 404});
}

export async function readRequestBody(request: Request) {
    try {
        if (request.method !== 'GET') {
            let contentType = request.headers.get('content-type');

            if (includes(contentType, 'application/json')) {
                return await request.json();
            } else if (includes(contentType, 'form')) {
                let formData = await request.formData();
                let body = {};
                formData.forEach((value, key) => {
                    body[key] = value;
                });
                return {text: body};
            } else {
                return {text: request.text()};
            }
        }
    } catch (e) {
        console.error('readRequestBody: ', e);
    }
    return {text: ''};
}

export function includesArr(arr: [], item: string) {
    for (let i = 0; i < arr.length; i++) {
        if (includes(arr[i], item)) {
            return true;
        }
    }
    return false;
}

export function includes(str: string, item: string) {
    return str === null ? false : str.indexOf(item) !== -1;
}
