<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="login_name" label="登录名"></el-table-column>
        <el-table-column prop="department_id" label="部门编号"></el-table-column>
        <el-table-column prop="role_id" label="角色编号"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.user_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="form.login_name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input v-model="form.department_id"></el-input>
        </el-form-item>
        <el-form-item label="角色编号">
          <el-input v-model="form.role_id"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增弹出框 -->
    <el-dialog title="用户新增" :visible.sync="addVisible" width="30%">
      <el-form ref="addForm" :model="addForm" label-width="70px">
        <el-form-item label="姓名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="addForm.login_name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input v-model="addForm.department_id"></el-input>
        </el-form-item>
        <el-form-item label="角色编号">
          <el-input v-model="addForm.role_id"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'basetable',
  data () {
    return {
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [{
        "user_id": 123,
        "name": '张三',
        "login_name": "admin1",
        "department_id": "123",
        "role_id": "123",
        "create_time": "2019-11-1"
      }
      ],
      pageTotal: 1,
      multipleSelection: [],
      delList: [],
      editVisible: false,
      addVisible: false,
      form: {},
      addForm: {
        'name': '',
        'login_name': '',
        'password': '',
        'department_id': '',
        'role_id': '',
        'remark': '',
      },
      idx: -1,
      id: -1
    };
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getUserList () {
      this.getRequest('QueryUser', {}, success => {
        this.tableData = success.list
        this.pageTotal = success.list.length
      })
    },
    // 触发搜索按钮
    handleSearch () {
      this.$set(this.query, 'pageIndex', 1);
      this.getUserList();
    },
    // 删除操作
    handleDelete (id) {
      // 二次确认删除
      let params = {
        'user_id': id
      }
      console.log(id)
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.getRequest('RemoveUser', params, success => {
            this.$message.success('删除成功');
            this.getUserList();
          })
        })
        .catch(() => { });
    },
    // 多选操作
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    delAllSelection () {
      const length = this.multipleSelection.length;
      let str = '';
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str = this.multipleSelection[i].name;
        this.getRequest('RemoveUser', { 'user_id': this.multipleSelection[i].user_id }, success => {
          this.$message.error(`删除了${str}`);
        })
      }
      this.getUserList()
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit (index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit () {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    //新增操作
    handleAdd () {
      this.addVisible = true;
    },
    //保存新增
    saveAdd () {
      let params = this.addForm
      this.addVisible = false;
      this.getRequest('AddUser', params, success => {
        this.getUserList()
        this.addForm = {
          'name': '',
          'login_name': '',
          'password': '',
          'department_id': '',
          'role_id': '',
          'remark': '',
        }
      })
    },
    // 分页导航
    handlePageChange (val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    }
  }
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
