<template>
    <div class="container main">
        <div class="singer-box">
            <div class="item">
                <ul>
                    <li
                        :class="area == item.value ? 'active' : ''"
                        v-for="item in areaList"
                        :key="item.value"
                        @click="chooseType('area', item.value)"
                    >
                        {{ item.label }}
                    </li>
                </ul>
            </div>
            <div class="item">
                <ul>
                    <li
                        :class="classify == item.value ? 'active' : ''"
                        @click="chooseType('classify', item.value)"
                        v-for="item in classifys"
                        :key="item.value"
                    >
                        {{ item.label }}
                    </li>
                </ul>
            </div>
            <div class="item">
                <ul>
                    <li
                        :class="sort == item.value ? 'active' : ''"
                        @click="chooseType('sort', item.value)"
                        v-for="item in sortList"
                        :key="item.value"
                    >
                        {{ item.label }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="split-line"></div>
        <div class="mvList" v-loading="loading">
            <mv-list :mvs="mvList"></mv-list>
        </div>
        <div class="page-wrap">
            <el-pagination
                @current-change="handleCurrentChange"
                background
                :page-size="limit"
                :current-page.sync="currentPage"
                layout="total, prev, pager, next"
                :total="mvCount"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import MvList from '@/components/common/mvList/Index'
export default {
    data() {
        return {
            // mv列表
            mvList: [],
            // mv数量
            mvCount: null,
            currentPage: 1,
            limit: 12,
            loading: false,
            // 语种
            area: '全部',
            areaList: [
                {
                    value: '全部',
                    label: '全部',
                },
                {
                    value: '内地',
                    label: '内地',
                },
                {
                    value: '港台',
                    label: '港台',
                },
                {
                    value: '欧美',
                    label: '欧美',
                },
                {
                    value: '日本',
                    label: '日本',
                },
                {
                    value: '韩国',
                    label: '韩国',
                },
            ],
            // 分类
            classify: '全部',
            classifys: [
                {
                    value: '全部',
                    label: '全部',
                },
                {
                    value: '官方版',
                    label: '官方版',
                },
                {
                    value: '原生',
                    label: '原生',
                },
                {
                    value: '现场版',
                    label: '现场版',
                },
                {
                    value: '网易出品',
                    label: '网易出品',
                },
            ],
            // 排序
            sort: '上升最快',
            sortList: [
                {
                    value: '上升最快',
                    label: '上升',
                },
                {
                    value: '最热',
                    label: '最热',
                },
                {
                    value: '最新',
                    label: '最新',
                },
            ],
            params: {
                // 返回数量
                limit: 12,
                // 偏移数量
                offset: 0,
                // 语种
                area: '全部',
                // 分类
                type: '全部',
                order: '上升最快',
            },
        }
    },
    // 生命周期函数
    created() {
        this.getMvAll()
    },
    methods: {
        // 获取mv列表
        async getMvAll() {
            const data = await this.$http.getMvAll(this.params)
            if (data.code !== 200) return this.$messaeg.error('获取MV失败')
            if (this.mvCount == null) {
                this.mvCount = data.count
            }
            this.mvList = data.data
            // console.log(data)
        },
        // 选择分类
        chooseType(type, value) {
            this.loading = true
            if (type == 'area') {
                this.area = value
                this.params.area = value
            }
            if (type == 'classify') {
                this.classify = value
                this.params.type = value
            }
            if (type == 'sort') {
                this.sort = value
                this.params.order = value
            }
            // console.log(this.params)
            this.currentPage = 1
            this.getMvAll()
            this.loading = false
        },
        handleCurrentChange(val) {
            this.loading = true
            this.currentPage = val
            this.params.offset = (val - 1) * this.limit
            this.getMvAll()
            this.loading = false
        },
    },
    components: {
        MvList,
    },
}
</script>

<style lang="less" scoped>
.singer-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 130px;
    .item {
        height: 28px;
        .active {
            background-color: #f56c6c;
            color: #fff !important;
        }
        ul {
            display: flex;
            li {
                margin: 0 6px;
                width: 56px;
                text-align: center;
                line-height: 28px;
                font-size: 13px;
                border-radius: 14px;
                color: #606266;
                cursor: pointer;
                &:hover {
                    color: red;
                }
            }
        }
    }
}
.mvList {
    margin-top: 10px;
}
.split-line {
    margin: 30px 0;
    height: 2px;
    // background-color: red;
    background: -webkit-linear-gradient(left, red, pink, skyblue, orange);
    &:last-child {
        margin: 9px 0;
    }
}
.page-wrap {
    margin-top: 20px;
    text-align: center;
}
</style>

