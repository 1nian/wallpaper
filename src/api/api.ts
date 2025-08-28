import request from "@/utils/request";

// banner壁纸
export const getBanner = <T>() => {
    return request<T>("https://tea.qingnian8.com/api/bizhi/homeBanner");
};

// 随机壁纸9张
export const getRandomWallpaper = <T>() => {
    return request<T>("https://tea.qingnian8.com/api/bizhi/randomWall");
};

// 专题壁纸
export const getSpecialWallpaper = <T>() => {
    return request<T>(
        "https://tea.qingnian8.com/api/bizhi/subjectList?pageNum=1&pageSize=9"
    );
};

// 壁纸分类
export const getCategory = <T>() => {
    return request<T>(
        "https://tea.qingnian8.com/api/bizhi/classify?select=true"
    );
};

// 壁纸分类详情
export const getWallpaperDetails = <T>(id: string) => {
    return request<T>(
        `https://tea.qingnian8.com/api/bizhi/wallList?classid=${id}`
    );
};

// 单个壁纸详情
export const getCategoryDetails = <T>(id: string) => {
    return request<T>(
        `https://tea.qingnian8.com/api/bizhi/detailWall?id=${id}`
    );
};
