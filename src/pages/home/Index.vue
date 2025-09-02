<template>
    <view class="wallper-home">
        <CommonBar title="首页" :border="false" statusBar fixed />

        <!-- 轮播图 -->
        <view class="banner">
            <swiper
                circular
                :indicator-dots="true"
                autoplay
                :interval="2000"
                :duration="500"
                indicator-active-color="#fff"
            >
                <swiper-item v-for="item in bannerList" :key="item._id">
                    <view class="swiper-item">
                        <image :src="item.picurl" mode="aspectFill"></image>
                    </view>
                </swiper-item>
            </swiper>
        </view>

        <view class="section">
            <view class="left">
                <uni-icons type="sound" color="#8cde9b" size="24" />
                <text>公告</text>
            </view>
            <swiper
                :indicator-dots="false"
                autoplay
                circular
                vertical
                :interval="3000"
                :duration="500"
                disable-touch
                class="center"
            >
                <swiper-item v-for="item in bannerList" :key="item._id"
                    >{{ item.comment }}公告</swiper-item
                >
            </swiper>
            <uni-icons class="right" type="right" color="#8f939c" size="24" />
        </view>

        <view class="main">
            <CommonTitle title="热门推荐">
                <view class="calendar">
                    <uni-icons type="calendar" color="#8cde9b" size="24" />
                    <uni-dateformat
                        :date="Date.now()"
                        format="yyyy-MM-dd"
                    ></uni-dateformat>
                </view>
            </CommonTitle>
            <!-- 热门推荐内容 -->
            <view class="hot-content">
                <scroll-view scroll-x>
                    <view
                        class="hot-item"
                        v-for="item in randomList"
                        :key="item._id"
                        @click="gotoPreview(item._id)"
                    >
                        <image :src="item.smallPicurl" mode="aspectFill" />
                    </view>
                </scroll-view>
            </view>
            <CommonTitle title="最新资讯">
                <navigator
                    url=""
                    open-type="navigate"
                    hover-class="navigator-hover"
                    class="more"
                >
                    MORE+
                </navigator>
            </CommonTitle>
            <!-- 最新资讯内容 -->
            <CommontList
                :scrollList="categoryList"
                isMore
                @update:details="gotoDetails"
            />
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { List, ListItem } from "@/type";
import CommonTitle from "@/components/CommonTitle.vue";
import CommontList from "@/components/CommontList.vue";
import CommonBar from "@/components/CommonBar.vue";
import { getBanner, getRandomWallpaper, getCategory } from "@/api/api";

const bannerList = ref<List>([]);
const randomList = ref<List>([]);
const categoryList = ref<List>([]);

const queryBanner = async () => {
    const res = await getBanner<List>();
    bannerList.value = res;
};
queryBanner();

const queryRandomWallpaper = async () => {
    const res = await getRandomWallpaper<List>();
    randomList.value = res;
};
queryRandomWallpaper();

const queryCategory = async () => {
    const res = await getCategory<List>();
    categoryList.value = res;
};
queryCategory();

const gotoPreview = (id: string) => {
    uni.navigateTo({
        url: `/pages/preview/Index?id=${id}`,
    });
};

const gotoDetails = (item: ListItem) => {
    uni.navigateTo({
        url: `/pages/category/Details?id=${item._id}&name=${item.name}`,
    });
};
</script>

<style lang="scss">
.wallper-home {
    .section {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f8f8f8;
        padding: 0 20rpx;
        border-radius: 50rpx;
        margin-top: 40rpx;
        box-sizing: border-box;
        .left {
            width: 120rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-right: 20rpx;
            color: #8cde9b;
            font-weight: 600;
        }
        .center {
            flex: 1;
            height: 100%;
            swiper-item {
                // 超出部分省略号
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                color: #8f939c;
                font-size: 28rpx;
            }
        }
        .right {
            width: 80rpx;
        }
    }

    .main {
        .calendar {
            display: flex;
            align-items: center;
            gap: 10rpx;
            color: #8cde9b;
            font-size: 28rpx;
            font-weight: 600;
        }
        .hot-content {
            scroll-view {
                white-space: nowrap;
                .hot-item {
                    width: 200rpx;
                    height: 450rpx;
                    overflow: hidden;
                    margin-right: 20rpx;
                    display: inline-block;
                    image {
                        width: 100%;
                        height: 100%;
                        border-radius: 20rpx;
                    }
                }
                .hot-item:last-child {
                    margin-right: 0;
                }
            }
        }
        .more {
            color: #8f939c;
            font-size: 28rpx;
            font-weight: 600;
        }
    }
}
</style>
