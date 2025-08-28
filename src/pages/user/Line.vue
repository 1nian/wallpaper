<template>
    <view class="line">
        <view class="line-left">
            <uni-icons :type="lineType" color="#8cde9b" size="22" />
            <view>{{ lineTitle }}</view>
        </view>
        <view class="line-right">
            <view>
                <slot default></slot>
            </view>
            <uni-icons type="right" size="20" />
        </view>
        <slot name="custom"></slot>
    </view>
</template>

<script setup lang="ts">
import type { UniIconsType } from "@uni-helper/uni-ui-types";

defineProps<{
    lineType: UniIconsType;
    lineUrl: string;
    lineTitle: string;
}>();
</script>

<style scoped lang="scss">
.line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #e5e5e5;
    position: relative;
    &:last-child {
        border-bottom: none;
    }
    .line-left {
        display: flex;
        align-items: center;
        view {
            margin-left: 20rpx;
            color: #8f939c;
        }
    }

    .line-right {
        display: flex;
        align-items: center;
        text {
            margin-right: 10rpx;
            color: #8f939c;
        }
    }
}
</style>
