<template>
    <view class="wallper-category-details">
        <view class="details-header">
            <uni-icons type="left" color="" size="24" @click="goback" />
            <view class="header-title">{{ title }}</view>
        </view>

        <CommontList
            :scrollList="categoryList"
            :isMore="false"
            @update:details="gotoDetails"
        />
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import type { List, ListItem } from "@/type";
import { getWallpaperDetails } from "@/api/api";
import CommontList from "@/components/CommontList.vue";

const title = ref("");

const categoryList = ref<List>([]);
const queryCategory = async (id: string) => {
    const res = await getWallpaperDetails<List>(id);
    categoryList.value = res ?? [];
};

onLoad((options: any) => {
    title.value = options.name;
    queryCategory(options.id);
});

const goback = () => {
    uni.navigateBack();
};

const gotoDetails = (item: ListItem) => {
    uni.navigateTo({
        url: `/pages/preview/Index?id=${item._id}`,
    });
};
</script>

<style scoped lang="scss">
.wallper-category-details {
    width: 100%;
    min-height: 100%;
    padding-bottom: 50rpx;

    box-sizing: border-box;
    .details-header {
        display: flex;
        align-items: center;
        padding: 20rpx;
        background-color: #f8f8f8;
        border-bottom: 1rpx solid #e5e5e5;
        margin-bottom: 30rpx;
        .header-title {
            flex: 1;
            font-size: 32rpx;
            font-weight: bold;
            text-align: center;
        }
    }
    .commont-list {
        padding: 0 30rpx;
        box-sizing: border-box;
    }
}
</style>
