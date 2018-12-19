<template>
  <div>
    <Row>
      <i-col span="24">
        <Card>
          <Button @click="showModal('add')" type="primary">添加</Button>&nbsp;
          <Dropdown @on-click="batchOpt">
            <Button type="primary">
              批量操作
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="batchActive">批量激活</DropdownItem>
              <DropdownItem name="batchInactive"><span style="color: red;">批量冻结</span></DropdownItem>
              <DropdownItem name="batchRemove" divided><span style="color: red;">批量删除</span></DropdownItem>
            </DropdownMenu>
          </Dropdown>&nbsp;
          <Button @click="showModal('search')" type="primary">高级搜索</Button>&nbsp;
          <Tooltip content="刷新" placement="right">
            <Button icon="md-refresh" type="success" shape="circle" @click="search"></Button>
          </Tooltip>
          <Table ref="dataTable" stripe :loading="table.loading" :columns="table.tableColumns" :data="table.tableDetails" style="margin-top:20px;" @on-selection-change="changeSelection" @on-sort-change="changeSort"></Table>
          <div style="margin: 20px;overflow: hidden">
            <div style="float: right;">
              <Page :total="page.total" :current="searchForm.pageNo" @on-change="changePageNo" @on-page-size-change="changePageSize" showSizer showTotal></Page>
            </div>
          </div>
        </Card>
      </i-col>
    </Row>
    <Modal v-model="modal.add" title="添加" @on-visible-change="changeModalVisibleResetForm('addForm', $event)">
      <Form ref="addForm" :model="form" :label-width="80" :rules="validateRules">
        <FormItem label="测试姓名" prop="name">
	<Input v-model="form.name"/>
</FormItem>
<FormItem label="测试密码" prop="password">
	<Input v-model="form.password"/>
</FormItem>
<FormItem label="测试年龄" prop="age">
	<Input v-model="form.age"/>
</FormItem>
<FormItem label="测试生日" prop="birthday">
	<DatePicker @on-change="form.birthday=$event" :value="form.birthday" type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></DatePicker>
</FormItem>

      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="resetFormCancelModal('addForm', 'add')">取消</Button>
        <Button type="primary" size="large" @click="add">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal.edit" title="修改" @on-visible-change="changeModalVisibleResetForm('editForm', $event)">
      <Form ref="editForm" :model="form" :label-width="80" :rules="validateRules">
        <FormItem label="测试姓名" prop="name">
	<Input v-model="form.name"/>
</FormItem>
<FormItem label="测试密码" prop="password">
	<Input v-model="form.password"/>
</FormItem>
<FormItem label="测试年龄" prop="age">
	<Input v-model="form.age"/>
</FormItem>
<FormItem label="测试生日" prop="birthday">
	<DatePicker @on-change="form.birthday=$event" :value="form.birthday" type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></DatePicker>
</FormItem>

      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="resetFormCancelModal('editForm', 'edit')">取消</Button>
        <Button type="primary" size="large" @click="edit">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal.search" title="高级搜索" @on-visible-change="changeModalVisibleResetForm('searchForm', $event)">
      <Form ref="searchForm" :model="searchForm" :label-width="80">
        <FormItem label="用户信息表"><Row>
	<i-col span="11">
	<FormItem prop="idMin">
	<Input v-model="searchForm.idMin"/>
</FormItem>
</i-col><i-col span="2" style="text-align: center">-</i-col>
	<i-col span="11">
	<FormItem prop="idMax">
	<Input v-model="searchForm.idMax"/>
</FormItem>
</i-col>
</Row>
</FormItem>
<FormItem label="测试姓名" prop="name">
	<Input v-model="searchForm.name"/>
</FormItem>
<FormItem label="测试密码" prop="password">
	<Input v-model="searchForm.password"/>
</FormItem>
<FormItem label="测试年龄"><Row>
	<i-col span="11">
	<FormItem prop="ageMin">
	<Input v-model="searchForm.ageMin"/>
</FormItem>
</i-col><i-col span="2" style="text-align: center">-</i-col>
	<i-col span="11">
	<FormItem prop="ageMax">
	<Input v-model="searchForm.ageMax"/>
</FormItem>
</i-col>
</Row>
</FormItem>
<FormItem label="测试生日"><Row>
	<i-col span="11">
	<FormItem prop="birthdayMin">
	<DatePicker @on-change="searchForm.birthdayMin=$event" :value="searchForm.birthdayMin" type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></DatePicker>
</FormItem>
</i-col><i-col span="2" style="text-align: center">-</i-col>
	<i-col span="11">
	<FormItem prop="birthdayMax">
	<DatePicker @on-change="searchForm.birthdayMax=$event" :value="searchForm.birthdayMax" type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></DatePicker>
</FormItem>
</i-col>
</Row>
</FormItem>
<FormItem label="状态"><Row>
	<i-col span="11">
	<FormItem prop="isActiveMin">
	<Input v-model="searchForm.isActiveMin"/>
</FormItem>
</i-col><i-col span="2" style="text-align: center">-</i-col>
	<i-col span="11">
	<FormItem prop="isActiveMax">
	<Input v-model="searchForm.isActiveMax"/>
</FormItem>
</i-col>
</Row>
</FormItem>
<FormItem label="更新时间"><Row>
	<i-col span="11">
	<FormItem prop="updateTimeMin">
	<DatePicker @on-change="searchForm.updateTimeMin=$event" :value="searchForm.updateTimeMin" type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></DatePicker>
</FormItem>
</i-col><i-col span="2" style="text-align: center">-</i-col>
	<i-col span="11">
	<FormItem prop="updateTimeMax">
	<DatePicker @on-change="searchForm.updateTimeMax=$event" :value="searchForm.updateTimeMax" type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></DatePicker>
</FormItem>
</i-col>
</Row>
</FormItem>
<FormItem label="创建时间"><Row>
	<i-col span="11">
	<FormItem prop="createTimeMin">
	<DatePicker @on-change="searchForm.createTimeMin=$event" :value="searchForm.createTimeMin" type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></DatePicker>
</FormItem>
</i-col><i-col span="2" style="text-align: center">-</i-col>
	<i-col span="11">
	<FormItem prop="createTimeMax">
	<DatePicker @on-change="searchForm.createTimeMax=$event" :value="searchForm.createTimeMax" type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></DatePicker>
</FormItem>
</i-col>
</Row>
</FormItem>

      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="resetForm('searchForm')">清空</Button>
        <Button type="text" size="large" @click="cancelModal('search')">取消</Button>
        <Button type="primary" size="large" @click="searchOkModal('search')">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal.detail" title="详情">
      <p>用户信息表: <span v-text="form.id"></span></p>
<p>测试姓名: <span v-text="form.name"></span></p>
<p>测试密码: <span v-text="form.password"></span></p>
<p>测试年龄: <span v-text="form.age"></span></p>
<p>测试生日: <span v-text="form.birthday"></span></p>
<p>状态: <span v-text="form.isActive"></span></p>
<p>更新时间: <span v-text="form.updateTime"></span></p>
<p>创建时间: <span v-text="form.createTime"></span></p>

    </Modal>
  </div>
</template>

<script>
  import * as utils from '@/api/utils'

  export default {
    name: 'Test',
    data() {
      return {
        modal: {
          add: false,
          edit: false,
          search: false,
          detail: false
        },
        urls: {
          addUrl: '/test/save',
          batchAddUrl: '/test/batch-save',
          editUrl: '/test/update',
          batchEditUrl: '/test/batch-update',
          searchUrl: '/test/pager-cond',
          allUrl: '/test/all',
          removeUrl: '/test/remove/',
          batchRemoveUrl: '/test/batch-remove',
          detailUrl: '/test/one/'
        },
        page: {
          total: 0
        },
        form: {
          id: '',
name: '',
password: '',
age: '',
birthday: '',
isActive: '',
updateTime: '',
createTime: '',

        },
        validateRules: {
          name: [
{required: true, message: '此项为必须项'},
{type: 'string', min: 1, max: 32, message: '必须1-32个字符'}
],
password: [
{required: true, message: '此项为必须项'},
{type: 'string', min: 1, max: 32, message: '必须1-32个字符'}
],

        },
        searchForm: {
          pageNo: 1,
          pageSize: 10,
          sortColumn: '',
          sortOrder: '',
          id: '',
idMin: '', 
idMax: '', 
name: '',
password: '',
age: '',
ageMin: '', 
ageMax: '', 
birthday: '',
birthdayMin: '', 
birthdayMax: '', 
isActive: '',
isActiveMin: '', 
isActiveMax: '', 
updateTime: '',
updateTimeMin: '', 
updateTimeMax: '', 
createTime: '',
createTimeMin: '', 
createTimeMax: '', 

        },
        table: {
          loading: false,
          tableColumns: [
            {
              type: 'selection',
              width: 45,
              key: "id",
              align: 'center',
              fixed: 'left'
            },
            {
              width: 60,
              align: 'center',
              fixed: "left",
              render: (h, params) => {
                return h('span', params.index + (this.searchForm.pageNo - 1) * this.searchForm.pageSize + 1)
              }
            },
            {
title: '用户信息表',
key: 'id',
width: 120,
sortable: true
},
{
title: '测试姓名',
key: 'name',
width: 120,
sortable: true
},
{
title: '测试密码',
key: 'password',
width: 120,
sortable: true
},
{
title: '测试年龄',
key: 'age',
width: 120,
sortable: true
},
{
title: '测试生日',
key: 'birthday',
width: 120,
sortable: true
},
{
title: '状态',
key: 'isActive',
width: 120,
sortable: true
},
{
title: '更新时间',
key: 'updateTime',
width: 120,
sortable: true
},
{
title: '创建时间',
key: 'createTime',
width: 120,
sortable: true
},

            {
              title: '激活状态',
              key: 'isActive',
              width: 100,
              align: 'center',
              render: (h, params) => {
                return h('i-switch', {
                  props: {
                    size: 'large',
                    value: params.row.isActive === 0
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    'on-change': (status) => {
                      this.active(params.row)
                    }
                  }
                }, [
                  h('span', {
                    slot: 'open'
                  }, '激活'),
                  h('span', {
                    slot: 'close'
                  }, '冻结')
                ])
              }
            },
            {
              title: '操作',
              key: 'action',
              width: 180,
              align: 'center',
              fixed: 'right',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.showDetail('detail', params.row)
                      }
                    }
                  }, '详情'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.showEdit('edit', params.row)
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.remove(params.row)
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ],
          tableDetails: [],
          selections: []
        }
      }
    },
    computed: {},
    mounted() {
      this.fitTable()
      this.search()
    },
    methods: {
      showModal(modal) {
        utils.showModal(this, modal)
      },
      showEdit(modal, row) {
        utils.showModal(this, modal)
        this.form = JSON.parse(JSON.stringify(row))
      },
      showDetail(modal, row) {
        utils.showModal(this, modal)
        this.form = row
      },
      changeModalVisibleResetForm(formRef, visible) {
        if (!visible) {
          utils.resetForm(this, formRef)
        }
      },
      resetForm(formRef) {
        utils.resetForm(this, formRef)
      },
      cancelModal(modal) {
        utils.cancelModal(this, modal)
      },
      resetFormCancelModal(formRef, modal) {
        utils.cancelModal(this, modal)
        utils.resetForm(this, formRef)
      },
      searchOkModal(modal) {
        utils.cancelModal(this, modal)
        utils.search(this)
      },
      batchOpt(itemName) {
        if (itemName === 'batchActive') {
          utils.batchActive(this, 0)
        } else if (itemName === 'batchInactive') {
          utils.batchActive(this, 1)
        } else if (itemName === 'batchRemove') {
          utils.batchRemove(this)
        }
      },
      add() {
        utils.add(this)
      },
      edit() {
        utils.edit(this)
      },
      active(row) {
        utils.active(this, row)
      },
      remove(row) {
        utils.remove(this, row)
      },
      search() {
        utils.search(this)
      },
      changeSelection(selections) {
        utils.changeSelections(this, selections)
      },
      changeSort(sortColumn) {
        utils.changeSort(this, sortColumn)
      },
      changePageNo(pageNo) {
        utils.changePageNo(this, pageNo)
      },
      changePageSize(pageSize) {
        utils.changePageSize(this, pageSize)
      },
      fitTable() {
        utils.fitTable(this, 'dataTable', this.table.tableColumns, ['id','name','password','age','birthday','isActive','updateTime','createTime',])
      }
    }
  }
</script>

<style>
</style>
