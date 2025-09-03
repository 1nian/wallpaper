/**
 * 本地存储工具函数
 */

// 存储分类详情数据数组
export const setCategoryDetailsList = (storageKey: string, data: any[]) => {
    try {
        uni.setStorageSync(`${storageKey}`, data);
    } catch (e) {
        console.error("存储分类详情数据数组失败", e);
    }
};

// 获取整个分类详情数据数组
export const getCategoryDetailsList = (storageKey: string) => {
    try {
        return uni.getStorageSync(`${storageKey}`) || [];
    } catch (e) {
        console.error("获取分类详情数据数组失败", e);
        return [];
    }
};

// 清除分类详情数据
export const clearCategoryDetailsList = (storageKey: string) => {
    try {
        uni.removeStorageSync(`${storageKey}`);
    } catch (e) {
        console.error("清除分类详情数据失败", e);
    }
};
