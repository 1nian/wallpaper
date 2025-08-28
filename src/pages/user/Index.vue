<template>
    <view class="wallper-user">
        <view class="header">
            <image src="@/static/logo.png" mode="scaleToFill" />
            <view class="address">地址</view>
        </view>

        <view class="section">
            <LineView
                line-title="我的下载"
                line-type="download-filled"
                line-url=""
            />
            <LineView
                line-title="我的评分"
                line-type="star-filled"
                line-url=""
            />
            <LineView
                line-title="联系客服"
                line-type="staff-filled"
                line-url=""
            >
                <template #custom>
                    <!-- #ifdef MP-WEIXIN -->
                    <button
                        class="custom-button"
                        open-type="contact"
                        hover-class="button-hover"
                        @contact="userContact"
                    >
                        联系客服
                    </button>

                    <!-- #endif -->

                    <!-- #ifdef H5||APP -->

                    <button class="custom-button" @click="userCall">
                        拨打电话
                    </button>
                    <!-- #endif -->
                </template>
            </LineView>
        </view>

        <view class="section">
            <LineView
                line-title="订阅更新"
                line-type="notification-filled"
                line-url=""
            />
            <LineView
                line-title="常见问题"
                line-type="help-filled"
                line-url=""
            />
        </view>
    </view>
</template>

<script setup lang="ts">
import LineView from "./Line.vue";

const userContact = (e: any) => {
    console.log("用户联系信息:", e);
};
const userCall = () => {
    uni.makePhoneCall({
        phoneNumber: "114", //仅为示例
    });
};
</script>

<style scoped lang="scss">
.wallper-user {
    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50rpx;
        image {
            width: 200rpx;
            height: 200rpx;
            border-radius: 100rpx;
            margin-top: 50rpx;
        }
        .address {
            margin-top: 20rpx;
            font-size: 28rpx;
            color: #aaa;
        }
    }
    .section {
        width: 100%;
        height: 100%;
        border: 1rpx solid #e5e5e5;
        border-radius: 10rpx;
        box-shadow: 0 0 30rpx #f5f5f5;
        background-color: #fff;
        margin: 20rpx 0;
        padding: 20rpx;
        box-sizing: border-box;
        .line {
            .custom-button {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }
    }
}
</style>
