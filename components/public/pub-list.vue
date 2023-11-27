<!--
  --api 请求地址
  --params 请求的参数{}
  --rownum 每页条数
  --[需要后端数据格式配合]
  --
  {
    data:{
      list:[], //返回的列表数据
      pagination:{
        page: 1, //页码
        rownum: 10,//每页条数
        total_page: 2,//总页数
        total: 12,//总条数
      }
    }
  }
 --
 -->
<template>
  <view
    class="pub-list"
    :style="listStyle"
  >
    <slot :list="list"></slot>
    <slot name="empty" v-if="pagination.total === 0">
      <pub-nomsg></pub-nomsg>
    </slot>
    <view class="list__footer" v-else-if="pagination.total >= 1">
      <u-loadmore :status="status" :load-text="loadText" />
    </view>
  </view>
</template>
<script setup>
  import {
    ref,
    reactive,
    watch,
    onMounted,
    onUnmounted,
    computed,
    onActivated,
    onDeactivated
  } from "vue";
  import { nav, toast, modal } from '@/utils';
  import { $get } from "@/utils/request";
  const props = defineProps({
    // 接口地址
    api: {
      type: String,
      required: true,
    },
    // 每页条数
    rownum: {
      type: Number,
      default: 10,
    },
    // 接口参数
    params: {
      type: Object,
      default: () => ({}),
    },
    // 底部文字
    loadText: {
      type: Object,
      default: () => {
        return {
          loadmore: '上拉加载更多',
          loading: '正在加载',
          nomore: '没有更多了',
        };
      },
      validator(val) {
        return Object.keys(val).every((key) =>
          ["loadmore", "loading", "nomore"].includes(key)
        );
      },
    },
    // 处理数据
    handleList: {
      type: Function,
      default: null,
    },
  });
  const emit = defineEmits(["change", "loading", "finished", "error"]);
  const status = ref("loadmore");
  const list = ref([]);
  let pagination = reactive({
    page: 1,
    rownum: props.rownum,
    total_page: 2,
    total: 1,
  });
  // 获取列表数据
  const getListData = () => {
    if (!props.api) throw "请传入接口地址";
    // if(status.value === 'loading') return;
    status.value = "loading";
    emit("loading");
    $get(
      props.api,
      {
        page: pagination.page,
        rownum: pagination.rownum,
        ...props.params,
      },
      true
    )
      .then(({ data }) => {
        if (props.handleList) data.list = props.handleList(data.list);
        list.value = list.value.concat(data.list);
        emit("change", { list: list.value, pagination });
        pagination = reactive(data.pagination);
        pagination.page++;
        state.status = "normal";
        state.distance = 0;
        if (pagination.page > pagination.total_page) {
          emit("finished");
          status.value = "nomore";
          return;
        }
        status.value = "loadmore";
      })
      .catch((err) => {
        emit("error");
        state.status = "normal";
        state.distance = 0;
        status.value = "loadmore";
      });
  };

  // 清空列表数据
  const onRefresh = () => {
    list.value = [];
    pagination = reactive({
      page: 1,
      rownum: props.rownum,
      total_page: 2,
      total: 1,
    });
    emit("change", { list: list.value, pagination });
    getListData();
  };

  // 请求数据
  // onMounted(() => {
  //   getListData();
  // });
  // 参数变化重新请求数据
  watch(
    () => props.params,
    (newVal, oldVal) => {
      onRefresh();
    },
    {
      immediate: true,
      deep: true,
    }
  );
  // getListData();

  onMounted(() => {
    console.log("onMounted");
    // uview封装的全局mixin, 触底事件
    uni.$on("uOnReachBottom", () => {
      // 触底获取数据
      if (pagination.page > pagination.total_page) {
        emit("finished");
        status.value = "nomore";
        return;
      }
      getListData();
      status.value = "loading";
    });
  });
  onUnmounted(() => {
    console.log("onUnmounted");
    uni.$off("uOnReachBottom");
  });

  // 下拉刷新
  const state = reactive({
    status: "normal", // normal | pulling | loading
    distance: 0,
  });
  const statusText = reactive({
    normal: '下拉即可刷新',
    pulling: '释放即可刷新',
    loading: '正在加载',
  });

  const pullRefreshHeadHeight = ref(100);
  const isPageTop = ref(false);
  const startY = ref(0);
  const deltaY = ref(0);
  const touchstart = (e) => {
    uni
      .createSelectorQuery()
      .selectViewport()
      .scrollOffset((res) => {
        if (res.scrollTop <= 10) isPageTop.value = true;
        else isPageTop.value = false;
        startY.value = e.touches[0].clientY;
      })
      .exec();
  };
  const listStyle = computed(() => {
    return {
      transitionDuration: state.status === "pulling" ? `0ms` : `300ms`,
      transform: state.distance ? `translateY(${state.distance}px)` : "",
    };
  });

  // 暴露数据
  defineExpose({
    list,
    pagination,
    status,
    onRefresh,
  });
</script>
<style lang="scss" scoped>
  .pub-list {
    width: 100%;
    &__footer {
      padding: 20rpx 0;
    }
  }
</style>
