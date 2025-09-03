<template>
    <view class="wallper-category-details">
        <CommonBar
            :border="false"
            statusBar
            fixed
            left-icon="left"
            @clickLeft="goback"
        />

        <!-- 下拉刷新容器 -->
        <view
            class="refresh-container"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            :style="{ transform: `translateY(${pullDownDistance}px)` }"
        >
            <!-- 刷新指示器 -->
            <view class="refresh-indicator" v-if="pullDownDistance > 0">
                <view v-if="pullDownDistance < 50">下拉刷新</view>
                <view v-else>释放刷新</view>
            </view>

            <CommontList
                :scrollList="categoryList"
                :isMore="false"
                @update:details="gotoDetails"
            />

            <!-- 上拉加载提示 -->
            <view class="load-more" v-if="pagination.hasMore"> 加载中... </view>
            <view class="load-more" v-else> 没有更多数据了 </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import type { List, ListItem } from "@/type";
import { getWallpaperDetails } from "@/api/api";
import { setCategoryDetailsList } from "@/utils/storage";
import CommontList from "@/components/CommontList.vue";
import CommonBar from "@/components/CommonBar.vue";

const title = ref("");
const classId = ref("");

const categoryList = ref<List>([]);

// 下拉刷新相关数据
const pullDownDistance = ref(0);
const startY = ref(0);
const isRefreshing = ref(false);

// 上拉加载相关数据
const pagination = reactive({
    pageNum: 1,
    pageSize: 12,
    hasMore: true,
});

const queryCategory = async (
    id: string,
    pageNum: number = 1,
    isLoadMore: boolean = false
) => {
    if (!isLoadMore && !pagination.hasMore) return;

    const res = await getWallpaperDetails<List>(
        id,
        pageNum,
        pagination.pageSize
    );

    if (isLoadMore) {
        categoryList.value = [...categoryList.value, ...res];
    } else {
        categoryList.value = res ?? [];
    }

    // 存储数据数组到本地
    if (res && res.length > 0) {
        const processedList = res.map((item) => ({
            ...item,
            picUrl: item.smallPicurl?.replace("_small.webp", ".jpg"),
        }));
        setCategoryDetailsList("category-list", processedList);
    }

    // 更新分页信息
    pagination.pageNum = pageNum;
    pagination.hasMore = res && res.length >= pagination.pageSize;
};

// 下拉刷新相关方法
const onTouchStart = (e: TouchEvent) => {
    if (isRefreshing.value) return;
    startY.value = e.touches[0].clientY;
};

const onTouchMove = (e: TouchEvent) => {
    if (isRefreshing.value) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.value;

    // 只有在页面顶部时才触发下拉刷新
    if (diff > 0 && window.scrollY === 0) {
        pullDownDistance.value = Math.min(diff / 3, 100); // 限制最大下拉距离
    }
};

const onTouchEnd = () => {
    if (isRefreshing.value) return;

    // 如果下拉距离足够大，则触发刷新
    if (pullDownDistance.value >= 50) {
        handleRefresh();
    } else {
        pullDownDistance.value = 0;
    }
};

const handleRefresh = async () => {
    isRefreshing.value = true;

    // 重置分页
    pagination.pageNum = 1;
    pagination.hasMore = true;

    // 重新获取数据
    await queryCategory(classId.value, 1);

    // 重置下拉距离
    pullDownDistance.value = 0;
    isRefreshing.value = false;
};

// 上拉加载
onReachBottom(() => {
    if (pagination.hasMore) {
        queryCategory(classId.value, pagination.pageNum + 1, true);
    }
});

onLoad((options: any) => {
    title.value = options.name;
    classId.value = options.id;

    queryCategory(classId.value);
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

    .refresh-container {
        position: relative;
        transition: transform 0.3s ease;
    }

    .refresh-indicator {
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: #8cde9b;
        font-size: 28rpx;
    }

    .load-more {
        text-align: center;
        padding: 20rpx;
        color: #8f939c;
        font-size: 28rpx;
    }

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
