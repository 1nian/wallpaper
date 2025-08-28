<template>
    <view class="commont-list">
        <view
            class="list-item"
            v-for="(item, index) in scrollList"
            :key="item._id"
        >
            <view
                :class="['list-navigator', { more: isShow(index) }]"
                url="/pages/category/details"
                open-type="navigate"
                hover-class="navigator-hover"
                @click="emit('update:details', item)"
            >
                <image
                    :src="item.picurl || item.smallPicurl"
                    mode="aspectFill"
                />
                <view class="mask" v-if="isShow(index)">
                    <uni-icons type="more-filled" color="#fff" size="24" />
                    <view class="max">更多</view>
                </view>
                <view v-else class="mask">{{ item.name }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { List, ListItem } from "@/type";
import { computed, ref } from "vue";

const props = defineProps<{
    scrollList: List;
    isMore: boolean;
}>();

const emit = defineEmits<{
    (e: "update:details", item: ListItem): void;
}>();

const isS = ref(false);
const isShow = computed(() => {
    return function (index: number) {
        isS.value = props.isMore && index === props.scrollList.length - 1;
        return props.isMore && index === props.scrollList.length - 1;
    };
});
</script>

<style scoped lang="scss">
.commont-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20rpx;
    .list-item {
        .list-navigator {
            width: 200rpx;
            height: 450rpx;
            overflow: hidden;
            position: relative;
            image {
                width: 100%;
                height: 100%;
                border-radius: 20rpx;
            }
            .mask {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50rpx;
                color: #fff;
                font-size: 28rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 0 0 20rpx 20rpx;
                // 滤镜
                backdrop-filter: blur(20rpx);
            }
        }
        .more {
            .mask {
                width: 100%;
                height: 100%;
                flex-direction: column;
                font-size: 28rpx;
                font-weight: 600;
                border-radius: 20rpx;
            }
        }
    }
}
</style>
