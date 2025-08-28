<template>
    <view class="wallper-category">
        <CommontList
            :scrollList="categoryList"
            :isMore="false"
            @update:details="gotoDetails"
        />
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { List, ListItem } from "@/type";
import { getCategory } from "@/api/api";
import CommontList from "@/components/CommontList.vue";

const categoryList = ref<List>([]);
const queryCategory = async () => {
    const res = await getCategory<List>();
    categoryList.value = res;
};
queryCategory();

const gotoDetails = (item: ListItem) => {
    uni.navigateTo({
        url: `/pages/category/Details?id=${item._id}&name=${item.name}`,
    });
};
</script>

<style scoped lang="scss">
.wallper-category {
}
</style>
