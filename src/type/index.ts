interface ListItem {
    name: string; // 名称："可爱萌宠"
    sort?: number; // 排序（可选）
    picurl: string; // 高清图片URL
    description: string; // 高清图片URL
    classid: string; // 高清图片URL
    smallPicurl?: string; // 是否选中（可选）
    tabs?: string[]; // 是否选中（可选）
    nickname?: string; // 是否选中（可选）
    select?: boolean; // 是否选中（可选）
    updateTime?: number; // 更新时间（时间戳，可选）
    _id: string;
    [key: string]: any; // 其他可能存在的字段
}

type List = ListItem[];

export type { List, ListItem };
