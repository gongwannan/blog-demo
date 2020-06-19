<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 审批信息
                </el-breadcrumb-item>
                <el-breadcrumb-item>信息详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box" v-if="tab==0">
                <el-tag>添加用户</el-tag>
                <el-form ref="form" :model="form" label-width="80px" style="margin-top:40px;">
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
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">同意审批</el-button>
                        <el-button @click="onDelete">拒绝</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="form-box" v-if="tab==1">
                <el-tag>更新用户</el-tag>
                <el-form ref="form" :model="form" label-width="80px" style="margin-top:40px;">
                    <el-form-item label="用户id">
                        <el-input v-model="form.user_id"></el-input>
                    </el-form-item>
                    <el-form-item label="登录时间">
                        <el-input v-model="form.login_time"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="登录名">
                        <el-input v-model="form.login_name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="用户状态">
                        <el-input v-model="form.user_status"></el-input>
                    </el-form-item>
                    <el-form-item label="部门编号">
                        <el-input v-model="form.department_id"></el-input>
                    </el-form-item>
                    <el-form-item label="角色编号">
                        <el-input v-model="form.role_id"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-input v-model="form.create_time"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人">
                        <el-input v-model="form.create_user"></el-input>
                    </el-form-item>
                    <el-form-item label="更新时间">
                        <el-input v-model="form.update_time"></el-input>
                    </el-form-item>
                    <el-form-item label="更新人">
                        <el-input v-model="form.update_user"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">同意审批</el-button>
                        <el-button @click="onDelete">拒绝</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="form-box" v-if="tab==2">
                <el-tag type="danger">删除用户</el-tag>
                <el-form ref="form" :model="form" label-width="80px" style="margin-top:40px;">
                    <el-form-item label="用户id">
                        <el-input v-model="form.user_id"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">同意审批</el-button>
                        <el-button @click="onDelete">拒绝</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="form-box" v-if="tab==3">
                <el-tag>添加菜单</el-tag>
                <el-form ref="form" :model="form" label-width="120px" style="margin-top:40px;">
                    <el-form-item label="菜单名称">
                        <el-input v-model="form.menu_name"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单url">
                        <el-input v-model="form.menu_url"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单图片">
                        <!-- <el-input v-model="form.menu_imgs"></el-input> -->
                        <el-image :src="form.menu_imgs"></el-image>
                    </el-form-item>
                    <el-form-item label="菜单文本">
                        <el-input v-model="form.menu_txt"></el-input>
                    </el-form-item>
                    <el-form-item label="父级菜单编号">
                        <el-input v-model="form.parent_id"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单等级">
                        <el-input v-model="form.level"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单状态">
                        <el-input v-model="form.menu_status"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">同意审批</el-button>
                        <el-button @click="onDelete">拒绝</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="form-box" v-if="tab==4">
                <el-tag>更新菜单</el-tag>
                <el-form ref="form" :model="form" label-width="120px" style="margin-top:40px;">
                    <el-form-item label="菜单编号">
                        <el-input v-model="form.menu_id"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单名称">
                        <el-input v-model="form.menu_name"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单url">
                        <el-input v-model="form.menu_url"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单图片">
                        <!-- <el-input v-model="form.menu_imgs"></el-input> -->
                        <el-image :src="form.menu_imgs"></el-image>
                    </el-form-item>
                    <el-form-item label="菜单文本">
                        <el-input v-model="form.menu_txt"></el-input>
                    </el-form-item>
                    <el-form-item label="父级菜单编号">
                        <el-input v-model="form.parent_id"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单等级">
                        <el-input v-model="form.level"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单状态">
                        <el-input v-model="form.menu_status"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">同意审批</el-button>
                        <el-button @click="onDelete">拒绝</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="form-box" v-if="tab==5">
                <el-tag type="danger">删除菜单</el-tag>
                <el-form ref="form" :model="form" label-width="80px" style="margin-top:40px;">
                    <el-form-item label="菜单编号">
                        <el-input v-model="form.menu_id"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">同意审批</el-button>
                        <el-button @click="onDelete">拒绝</el-button>
                    </el-form-item>
                </el-form>
            </div>


        </div>
    </div>
</template>

<script>
export default {
    name: 'approvalDetail',
    data() {
        return {
            form: {
                name: '',
                login_name: '',
                password: '',
                department_id: '',
                role_id: '',
                remark: '',
            },
            tab:1
        };
    },
    created() {
        this.form = this.$route.query.data;
        if(this.this.$route.query.detail_url == ''){
            this.tab = 0
        }else if(this.this.$route.query.detail_url == ''){
            this.tab = 1
        }else if(this.this.$route.query.detail_url == ''){
            this.tab = 2
        }else if(this.this.$route.query.detail_url == ''){
            this.tab = 3
        }else if(this.this.$route.query.detail_url == ''){
            this.tab = 4
        }else if(this.this.$route.query.detail_url == ''){
            this.tab = 5
        }
    },
    methods: {
        onSubmit() {
            this.$confirm('确定要同意吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('审批成功！');
                    // if(this.tab == 0){

                    // }else if(this.tab == 1){

                    // }else if(this.tab == 2){
                        
                    // }else if(this.tab == 3){
                        
                    // }else if(this.tab == 4){
                        
                    // }else if(this.tab == 5){
                        
                    // }
                })
                .catch(() => {});
        },
        onDelete() {
            this.$confirm('确定要拒绝吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    // if(this.tab == 0){
                        
                    // }else if(this.tab == 1){

                    // }else if(this.tab == 2){
                        
                    // }else if(this.tab == 3){
                        
                    // }else if(this.tab == 4){
                        
                    // }else if(this.tab == 5){
                        
                    // }
                    this.$message.success('拒绝成功！');
                })
                .catch(() => {});
        },
    }
};
</script>
<style>

</style>