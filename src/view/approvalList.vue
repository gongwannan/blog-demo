<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 审批信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="输入查询信息" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" highlight-current-row header-cell-class-name="table-header" >
        <el-table-column prop="approval_id" label="审批id" align="center" width="80"></el-table-column>
        <el-table-column prop="approval_by" label="审批人" align="center" width="180"></el-table-column>
        <el-table-column prop="approval_time" label="审批时间" align="center" width="200"></el-table-column>
        <el-table-column prop="create_by" label="创建人" align="center" width="180"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center" width="200"></el-table-column>
        <el-table-column prop="operation_type" label="审批类型" align="center" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.operation_type==='AddDepartment'" type="success">添加部门</el-tag>
            <el-tag v-if="scope.row.operation_type==='RemoveDepartment'" type="success">删除部门</el-tag>
            <el-tag v-if="scope.row.operation_type==='EditDepartment'" type="success">更新部门</el-tag>
            <el-tag v-if="scope.row.operation_type==='AddUser'" type="success">添加用户</el-tag>
            <el-tag v-if="scope.row.operation_type==='RemoveUser'" type="success">删除用户</el-tag>
            <el-tag v-if="scope.row.operation_type==='EditRole'" type="success">更新用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审批状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.approval_status===0" type="info">待审批</el-tag>
            <el-tag v-if="scope.row.approval_status===1" type="success">通过</el-tag>
            <el-tag v-if="scope.row.approval_status===2" type="danger">拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'approvalList',
  data () {
    return {
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [
        // {
        //   "approval_id": 1,
        //   "data": "张三",
        //   "data_type": "字符串",
        //   "approval_by": "李四",
        //   "approval_time": "2019-11-1",
        //   "create_by": "张三",
        //   "create_time": "2019-11-1",
        //   "approval_status": "0"
        // },
        // {
        //   "approval_id": 2,
        //   "data": "张四",
        //   "data_type": "字符串",
        //   "approval_by": "李四",
        //   "approval_time": "2019-11-1",
        //   "create_by": "张三",
        //   "create_time": "2019-11-1",
        //   "approval_status": "1"
        // },
        // {
        //   "approval_id": 3,
        //   "data": "张五",
        //   "data_type": "字符串",
        //   "approval_by": "李四",
        //   "approval_time": "2019-11-1",
        //   "create_by": "张三",
        //   "create_time": "2019-11-1",
        //   "approval_status": "2"
        // },
      ],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 1,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created () {
    this.getData();
  },
  methods: {
    // 获取数据
    getData () {
      let params = {
        approval_status: "0"
      };
      this.getRequest('QueryApprovalByApprovalStatus', params , success => {
            this.tableData = success.list
            this.pageTotal = success.list.length
      })
    },
    // 触发搜索按钮
    handleSearch() {
        this.$set(this.query, 'pageIndex', 1);
        this.getData();
    },

    // 详情跳转操作
    handleEdit (index, row) {
      this.idx = index;
      this.form = row;
      // this.editVisible = true;
      this.$router.push({
        path: '/detail',
        query: {
          data: this.tableData[index].data,
          detail_url: this.tableData[index].detail_url,
          operation_type: this.tableData[index].operation_type,
        }
      })
    },
    // 分页导航
    handlePageChange (val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    }
  },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
