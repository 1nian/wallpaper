<template>
    <div class="commont-title">
        <view class="left">{{ title }}</view>
        <view class="right">
            <slot default>
                <text>公告</text>
            </slot>
        </view>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: "公告",
    },
});
</script>

<style scoped lang="scss">
.commont-title {
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 40rpx 0;
    .left {
        font-size: 40rpx;
    }
}
</style>
