<template>
    <view class="preview">
        <swiper circular @change="swiperChange">
            <swiper-item v-for="item in 5" :key="item">
                <image
                    @click="isMask = !isMask"
                    :src="categoryDetails?.smallPicurl"
                    mode="scaleToFill"
                />
            </swiper-item>
        </swiper>

        <view class="mask" v-if="isMask">
            <view class="back" @click="backClick">
                <uni-icons type="left" color="#fff" size="24" />
            </view>
            <view class="dian">{{ current }} / {{ total }}</view>
            <view class="date-time">
                <uni-dateformat
                    :date="new Date()"
                    format="hh:mm"
                ></uni-dateformat>
            </view>
            <view class="date">
                <uni-dateformat
                    :date="new Date()"
                    format="MM月dd日 "
                ></uni-dateformat>
            </view>

            <view class="foooter">
                <view class="box" @click="previewPopup?.open()">
                    <uni-icons type="info" size="24" />
                    <view>信息</view>
                </view>
                <view class="box">
                    <uni-icons type="star" size="24" />
                    <view>评分</view>
                </view>
                <view class="box" @click="downloadClick">
                    <uni-icons type="download" size="24" />
                    <view>下载</view>
                </view>
            </view>
        </view>

        <uni-popup
            ref="previewPopup"
            type="bottom"
            :is-mask-click="false"
            mask-background-color="rgba(0, 0, 0, 0.5)"
            background-color="#fff"
            borderRadius="10 10 0 0"
        >
            <view class="popup">
                <view class="popup-header">
                    <view></view>
                    <view class="title">壁纸信息</view>
                    <view @click="previewPopup?.close()">
                        <uni-icons type="close" size="24" />
                    </view>
                </view>

                <scroll-view scroll-y>
                    <view class="modal-item">
                        <text>壁纸ID：</text>{{ categoryDetails?._id }}
                    </view>
                    <view class="modal-item"
                        ><text>发布者：</text
                        >{{ categoryDetails?.nickname }}</view
                    >
                    <view class="modal-item"><text>评分：</text>★★★★★ 5分</view>
                    <view class="modal-item">
                        <text>摘要：</text>{{ categoryDetails?.description }}
                    </view>
                    <view class="tags">
                        <text v-for="tag in categoryDetails?.tabs" :key="tag">{{
                            tag
                        }}</text>
                    </view>
                    <view class="declare">
                        声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
                    </view>
                </scroll-view>
            </view>
        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { SwiperOnChangeEvent } from "@uni-helper/uni-app-types";
import type { UniPopup } from "@uni-helper/uni-ui-types";
import { getCategoryDetails } from "@/api/api";
import { onLoad } from "@dcloudio/uni-app";
import type { ListItem } from "@/type";
import { downloadAndSaveImage } from "@/utils/download";

const categoryDetails = ref<ListItem>();

const isMask = ref(true);

const current = ref(1);
const total = ref(5);

const swiperChange = (e: SwiperOnChangeEvent) => {
    current.value = e.detail.current + 1;
};

const previewPopup = ref<UniPopup>();

// 下载
const downloadClick = async () => {
    if (!categoryDetails.value?.smallPicurl) {
        uni.showToast({
            title: "图片地址无效",
            icon: "none",
        });
        return;
    }

    const success = await downloadAndSaveImage({
        url: categoryDetails.value.smallPicurl,
        fileName: `wallpaper_${categoryDetails.value._id}.jpg`,
    });

    if (!success) {
        console.error("下载保存失败");
    }
};

const queryCategoryDetails = async (id: string) => {
    const res = await getCategoryDetails<ListItem>(id);
    categoryDetails.value = res?.[0] ?? {};
};

onLoad((options: any) => {
    queryCategoryDetails(options.id);
});

const backClick = () => {
    uni.navigateBack();
};
</script>

<style scoped lang="scss">
.preview {
    width: 100%;
    height: 100%;
    position: relative;
    swiper {
        width: 100%;
        height: 100vh;
        image {
            width: 100%;
            height: 100%;
        }
    }
    .mask {
        .back {
            position: absolute;
            top: 5vh;
            left: 5%;
            width: 80rpx;
            height: 80rpx;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .dian {
            position: absolute;
            top: 10vh;
            left: 50%;
            width: fit-content;
            height: 40rpx;
            padding: 0 20rpx;
            font-size: 28rpx;
            box-sizing: border-box;
            border-radius: 10rpx;
            color: #fff;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.3);
            // 滤镜
            backdrop-filter: blur(20rpx);
        }
        .date-time {
            position: absolute;
            top: calc(10vh + 90rpx);
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 60px;
            color: #fff;
        }
        .date {
            position: absolute;
            top: calc(10vh + 200rpx);
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
            color: #fff;
        }
        .foooter {
            position: absolute;
            bottom: 10vh;
            left: 50%;
            transform: translateX(-50%);
            width: 70vw;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: rgba(255, 255, 255, 0.6);
            border-radius: 120rpx;
            padding: 20rpx 40rpx;
            box-sizing: border-box;

            .box {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #676767;
                font-size: 28rpx;
                uni-icons {
                    margin-bottom: 10rpx;
                }
            }
        }
    }
    .popup {
        border-radius: 10rpx 10rpx 0 0;
        padding: 15rpx 30rpx;
        box-sizing: border-box;
        .popup-header {
            width: 100%;
            height: 80rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #676767;
        }

        scroll-view {
            max-height: 60vh;
            .modal-item {
                margin-bottom: 16rpx;
                line-height: 1.6;
            }

            .modal-item text {
                font-weight: bold;
                color: #333;
            }

            .tags {
                display: flex;
                flex-wrap: wrap;
                gap: 16rpx;
                margin-top: 20rpx;
            }

            .tags text {
                background-color: #fff;
                border: 1rpx solid #8cde9b;
                padding: 12rpx 24rpx;
                border-radius: 16rpx;
                font-size: 28rpx;
                color: #8cde9b;
            }

            .declare {
                margin-top: 10px;
                font-size: 14px;
                color: #999;
                line-height: 1.4;
            }
        }
    }
}
</style>
