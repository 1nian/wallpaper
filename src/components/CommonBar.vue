<template>
    <view class="common-bar">
        <!-- #ifdef H5 || APP -->

        <uni-nav-bar v-bind="barAttrs">
            <template #left v-if="barAttrs.title">
                <view class="bar-left">
                    {{ barAttrs.title }}
                </view>
            </template>
            <view class="input-view" v-if="barAttrs.title">
                <uni-icons
                    class="input-uni-icon"
                    type="search"
                    size="18"
                    color="#8f939c"
                />
                <input
                    confirm-type="search"
                    class="nav-bar-input"
                    type="text"
                    placeholder="搜索"
                    @click="searchClick"
                />
            </view>
        </uni-nav-bar>
        <!-- #endif -->

        <!-- #ifdef MP-WEIXIN -->
        <uni-nav-bar v-bind="barAttrs">
            <template #left v-if="barAttrs.title">
                <view class="bar-left">
                    {{ barAttrs.title }}
                </view>
            </template>
            <view class="input-view" v-if="barAttrs.title">
                <uni-icons
                    class="input-uni-icon"
                    type="search"
                    size="18"
                    color="#8f939c"
                />
                <input
                    confirm-type="search"
                    class="nav-bar-input"
                    type="text"
                    placeholder="搜索"
                    @click="searchClick"
                />
            </view>
        </uni-nav-bar>
        <!-- #endif -->
    </view>
</template>

<script setup lang="ts">
import { useAttrs, computed } from "vue";

const attrs = useAttrs();

const barAttrs = computed(() => {
    return attrs;
});

const searchClick = () => {
    // log
};
</script>

<style scoped lang="scss">
$nav-height: 60rpx;

.common-bar {
    width: 100%;
    height: 100%;

    .bar-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-left: 30rpx;
        color: #8f939c;
        font-size: 30rpx;
    }
    .input-view {
        display: flex;
        flex-direction: row;
        width: 400rpx;
        background-color: #f8f8f8;
        height: $nav-height;
        border-radius: 50rpx;
        padding: 0 20rpx;
        flex-wrap: nowrap;
        margin: 10rpx 0;
        line-height: $nav-height;
    }

    .input-uni-icon {
        line-height: $nav-height;
    }

    .nav-bar-input {
        height: $nav-height;
        line-height: $nav-height;
        width: 370rpx;
        padding: 0 20rpx;
        font-size: 28rpx;
        background-color: #f8f8f8;
    }
}
</style>
