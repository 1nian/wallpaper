interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD";
    data?: any;
    headers?: Record<string, string>;
    timeout?: number;
}

interface ResponseData<T> {
    data: T;
}

const request = <T>(url: string, options?: RequestOptions): Promise<T> => {
    return new Promise((res, rej) => {
        uni.request({
            url,
            ...options,
            success: (response) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    const resData = response.data as ResponseData<T>;
                    res(resData.data);
                } else {
                    rej(
                        new Error(
                            `Request failed with status code ${response.statusCode}`
                        )
                    );
                }
            },
            fail: (error) => {
                rej(new Error(`Request failed: ${error.errMsg}`));
            },
        });
    });
};

export default request;
