<template>
  <el-container class="editor">
    <el-header height="35px">
      <span @click="runAsync()" v-if="!isRunning">
        <i class="el-icon-video-play"></i>
      </span>
      <span @click="stopAsync()" v-else>
        <i class="el-icon-video-pause"></i>
      </span>
    </el-header>
    <el-container>
      <el-aside width="210px">
        <el-menu
          :default-openeds="[0]"
          :unique-opened="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="menuClick"
        >
          <el-submenu v-for="(item,index) in widgetTypes" :index="item.type+''" :key="index">
            <template slot="title">
              <span>
                <i :class="['iconfont',item.icon]"></i>
              </span>
              {{item.title}}
            </template>
            <el-menu-item
              v-for="(menu,index2) in item.children"
              :index="item.type+'|'+menu.type"
              :key="index2"
            >{{menu.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="widgetWarp" ref="widgetWarp">
          <drag-wrap class="widgetList" :data="widgetList" @watchData="watchData">
            <drag-item v-for="(item) in widgetList" :key="item.id">
              <div slot="drag">
                <div>
                  <div class="t1" :style="{'border-bottom-color':item.color}"></div>
                  <div class="t2">
                    <span>{{item.alias}}</span>
                  </div>
                </div>
              </div>
              <div>
                <el-row class="t3">
                  <el-col :span="2" class="prefix">
                    <span>{{item.prefix}}</span>
                  </el-col>
                  <el-col :span="10">
                    <span class="name">{{item.name}}</span>
                  </el-col>
                  <el-col :span="4">
                    <span>{{item.code}}</span>
                  </el-col>
                  <el-col :span="8" style="text-align:right;padding-right: 6px;">
                    <i class="el-icon-more" @click="showEditDialog(item)"></i>
                    <i
                      class="el-icon-caret-right"
                      v-if="item.isRunning!=true"
                      @click="runWidgetAsync(item)"
                    ></i>
                    <i class="el-icon-video-pause" v-else @click="stopWidgetAsync(item)"></i>
                    <i class="el-icon-delete" @click="showDeleteDialog(item)"></i>
                  </el-col>
                </el-row>
                <div style="margin-top: 30px;height:180px">
                  <template v-if="!item.isRunning">
                    <template v-if="item.index==0">
                      <div v-if="item.type=='16777219'" style="font-size:48px;margin-top:70px;">
                        XX{{item.unit.split('/')[0]}}
                        YY{{item.unit.split('/')[1]}}
                      </div>
                      <div
                        v-else-if="item.type=='16777227'"
                        style="font-size:64px;margin-top:60px;"
                      >XY</div>
                      <div v-else style="font-size:64px;margin-top:60px;">
                        <i>XX{{item.unit}}</i>
                      </div>
                    </template>
                    <template v-else-if="item.index==1">
                      <div>
                        <swiper :options="swiperOption">
                          <swiper-slide>
                            <img
                              :src="require(`@/assets/img/sensor/${item.folder}/${item.map.key0}.png`)"
                              style="width:100px;height:100px"
                            />
                          </swiper-slide>
                          <swiper-slide>
                            <img
                              :src="require(`@/assets/img/sensor/${item.folder}/${item.map.key1}.png`)"
                              style="width:100px;height:100px"
                            />
                          </swiper-slide>
                          <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                      </div>
                    </template>
                    <template v-else-if="item.index==2">
                      <div style="font-size: 64px;margin-top:60px;">年月日</div>
                    </template>
                    <template v-else-if="item.index==3">
                      <img
                        :src="require(`@/assets/img/sensor/${item.folder}/${item.map.key0}.png`)"
                        style="width:120px;height:120px"
                      />
                      <img
                        :src="require(`@/assets/img/sensor/${item.folder}/${item.map.key1}.png`)"
                        style="width:120px;height:120px"
                      />
                    </template>
                    <template v-else-if="item.index==4">
                      <div v-if="item.type=='-2130706431'">
                        <img
                          :src="require(`@/assets/img/lattice/${item.map.key1}.png`)"
                          style="width:120px;height:120px"
                        />
                      </div>
                      <div style="font-family:'lcdfont';font-size:72px;margin-top:60px" v-else>
                        <span>{{item.map.key0}}</span>
                        <span>{{item.map.key1}}</span>
                        <span>{{item.map.key2}}</span>
                        <span>{{item.map.key3}}</span>
                      </div>
                    </template>
                    <template v-else-if="item.index==5">
                      <bt-shape style="margin-top:-36px;margin-left:-30px"></bt-shape>
                    </template>
                    <template v-else-if="item.index==6">
                      <el-slider
                        disabled
                        style="padding: 40px 20px 20px;"
                        :min="parentInt(item.map.key0)"
                        :max="parentInt(item.map.key1)"
                      ></el-slider>
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="item.index==0">
                      <div v-if="item.type=='16777219'" style="font-size:42px;margin-top:70px;">
                        <span>{{convertValue(item.value.substring(0,4))}}</span>
                        <i>{{item.unit.split('/')[0]}}</i>
                        <span style="margin-left:10px">{{convertValue(item.value.substring(4,8))}}</span>
                        <i>{{item.unit.split('/')[1]}}</i>
                      </div>
                      <div
                        v-else-if="item.type=='16777227'"
                        style="font-size:48px;margin-top:45px;"
                      >
                        <div>
                          <span>X:{{convertValue(item.value.substring(0,4))}}</span>
                        </div>
                        <div>
                          <span>Y:{{convertValue(item.value.substring(4,8))}}</span>
                        </div>
                      </div>
                      <div
                        v-else
                        :class="['info',getComputedClass(item.value)]"
                      >{{convertValue(item.value,item.type)}}{{item.unit}}</div>
                    </template>
                    <template v-else-if="item.index==1">
                      <img
                        :src="require(`@/assets/img/sensor/${item.folder}/${getBooleanValue(item)}.png`)"
                        style="width:120px;height:120px"
                      />
                    </template>
                    <template v-else-if="item.index==2">
                      <div
                        :class="['info calendar',getComputedClass(convertDate(item.value))]"
                      >{{convertDate(item.value)}}</div>
                    </template>
                    <template v-else-if="item.index==3">
                      <bt-switch
                        :inactive-value="item.map.key0"
                        :active-value="item.map.key1"
                        active-color="#91BE51"
                        inactive-color="#ccc"
                        :value="parentInt(item.value)"
                        :sensor="item"
                        @success="sendMsg"
                      ></bt-switch>
                    </template>
                    <template v-else-if="item.index==4">
                      <div v-if="item.type=='-2130706431'">
                        <bt-image-warp :sensor="item" @success="editInputWarp"></bt-image-warp>
                      </div>
                      <div v-else>
                        <bt-input-warp :is-input="false" :sensor="item" @success="editInputWarp"></bt-input-warp>
                      </div>
                    </template>
                    <template v-else-if="item.index==5">
                      <bt-shape
                        style="margin-top:-36px;margin-left:-30px"
                        :code="id"
                        :widget-code="item.code"
                        :map="item.map"
                        :is-clickable="true"
                      ></bt-shape>
                    </template>
                    <template v-else-if="item.index==6">
                      <bt-slider
                        :min="parentInt(item.map.key0)"
                        :max="parentInt(item.map.key1)"
                        :value="parentInt(item.value)"
                        :sensor="item"
                        @success="sendMsg"
                      ></bt-slider>
                    </template>
                  </template>
                </div>
              </div>
            </drag-item>
          </drag-wrap>
        </div>
        <div class="drawer" v-show="zoom==true">
          <div class="pudding" @click="setZoom(false)">
            <i class="iconfont icon-zoomout"></i>
          </div>
          <h1>编辑栏</h1>
          <edit-project :id="id"></edit-project>
          <edit-device :id="id" :code="code" :isRunning="isRunning"></edit-device>
        </div>
        <div class="drawer1" v-show="zoom==false" @click="setZoom(true)">
          <i class="iconfont icon-zoom"></i>
        </div>
        <el-dialog
          :visible.sync="widgetDialogVisible"
          :custom-class="'widgetDialog '+'widgetDialog'+widget.type"
          width="360px"
          :show-close="false"
          top="35vh"
          :close-on-click-modal="false"
        >
          <template slot="title">
            <div>{{widget.alias}}</div>
            <div>{{widget.title}}</div>
          </template>
          <el-form :inline="true" ref="widgetForm" :model="widgetForm" :rules="rules">
            <template v-if="widget.type==5">
              <bt-shape style="text-align:center">
                <template v-slot:up>
                  <div style="top:2%;position:absolute;left:37%;">
                    <el-form-item>
                      <el-input
                        v-model="widgetForm.control.arrowup0"
                        style="width:40px;height:25px;"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input
                        v-model="widgetForm.control.arrowup1"
                        style="width:40px;height:25px;"
                      ></el-input>
                    </el-form-item>
                  </div>
                </template>
                <template v-slot:right>
                  <div style="position:absolute;right:5%;top:38%">
                    <el-form-item>
                      <el-input
                        v-model="widgetForm.control.arrowright0"
                        style="width:40px;height:25px;"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input
                        v-model="widgetForm.control.arrowright1"
                        style="width:40px;height:25px;"
                      ></el-input>
                    </el-form-item>
                  </div>
                </template>
                <template v-slot:left>
                  <div style="position:absolute;left:5%;top:38%">
                    <el-form-item>
                      <el-input
                        v-model="widgetForm.control.arrowleft0"
                        style="width:40px;height:25px;"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input
                        v-model="widgetForm.control.arrowleft1"
                        style="width:40px;height:25px;"
                      ></el-input>
                    </el-form-item>
                  </div>
                </template>
                <template v-slot:down>
                  <div style="bottom:-10%;position:absolute;left: 37%;">
                    <el-form-item>
                      <el-input
                        v-model="widgetForm.control.arrowdown0"
                        style="width:40px;height:25px;"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input
                        v-model="widgetForm.control.arrowdown1"
                        style="width:40px;height:25px;"
                      ></el-input>
                    </el-form-item>
                  </div>
                </template>
              </bt-shape>
            </template>
            <div v-if="widget.type==6" style="padding:10px 20px 0;">
              <el-slider disabled :value="1500" :min="0" :max="9999"></el-slider>
              <el-form-item label="最小">
                <el-input-number
                  :min="0"
                  :max="9999"
                  :controls="false"
                  style="width:80px"
                  v-model="widgetForm.map.key0"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="最大">
                <el-input-number
                  :min="0"
                  :max="9999"
                  style="width:80px"
                  :controls="false"
                  v-model="widgetForm.map.key1"
                ></el-input-number>
              </el-form-item>
            </div>
            <el-form-item label="名称" prop="name">
              <el-input style="width:100px" focus v-model.trim="widgetForm.name"></el-input>
            </el-form-item>
            <el-form-item label="ID" prop="code">
              <el-input :maxlength="2" style="width:70px" v-model="widgetForm.code"></el-input>
            </el-form-item>
            <template v-if="widget.type==0">
              <el-form-item label="单位" v-if="widgetForm.type!='16777219'">
                <el-select placeholder v-model="widgetForm.unit" style="width:70px">
                  <el-option
                    v-for="(item,index) in widget.unit"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <template v-else>
                <el-form-item label="温度单位">
                  <el-select v-model="widgetForm.unit1" style="width:60px" placeholder>
                    <el-option
                      v-for="(item,index) in widget.unit1"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="湿度单位">
                  <el-select v-model="widgetForm.unit2" style="width:60px" placeholder>
                    <el-option
                      v-for="(item,index) in widget.unit2"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </template>
            <template v-if="widget.type==1|| widget.type==3">
              <el-form-item label="0" prop="map.key0">
                <el-select v-model="widgetForm.map.key0" placeholder style="width:70px">
                  <el-option :value="0">
                    <img
                      :src="require(`@/assets/img/sensor/${widget.folder}/0.png`)"
                      style="width:30px;height:30px"
                    />
                  </el-option>
                  <el-option :value="1">
                    <img
                      :src="require(`@/assets/img/sensor/${widget.folder}/1.png`)"
                      style="width:30px;height:30px"
                    />
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="1" prop="map.key1">
                <el-select v-model="widgetForm.map.key1" placeholder style="width:70px">
                  <el-option :value="0">
                    <img
                      :src="require(`@/assets/img/sensor/${widget.folder}/0.png`)"
                      style="width:30px;height:30px"
                    />
                  </el-option>
                  <el-option :value="1">
                    <img
                      :src="require(`@/assets/img/sensor/${widget.folder}/1.png`)"
                      style="width:30px;height:30px"
                    />
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
            <template v-if="widget.type==4">
              <el-form-item label="形状" v-if="widgetForm.type=='-2130706431'">
                <el-select placeholder v-model="widgetForm.map.key0" style="width:80px">
                  <el-option v-for="(item,index) in latticeTypes" :key="index" :value="item.desc">
                    <img
                      :src="require(`@/assets/img/lattice/${item.src}.png`)"
                      style="width:30px;height:30px"
                    />
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数值" v-if="widgetForm.type=='-2130706430'">
                <bt-input-number :value.sync="widgetForm.map.key0"></bt-input-number>
                <bt-input-number :value.sync="widgetForm.map.key1"></bt-input-number>
                <bt-input-number :value.sync="widgetForm.map.key2"></bt-input-number>
                <bt-input-number :value.sync="widgetForm.map.key3"></bt-input-number>
              </el-form-item>
            </template>
          </el-form>
          <div slot="footer">
            <el-button @click="widgetDialogVisible=false">取消</el-button>
            <el-button type="primary" @click="saveWidgetAsyc()">确定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          :visible.sync="deleteDialogVisible"
          :center="true"
          width="300px"
          top="25vh"
          custom-class="deleteDialog"
          :title="selectWidget.name"
        >
          <span style="font-size:64px">
            <svg-icon iconClass="warn"></svg-icon>
          </span>
          <div class="content">你确定要删除此控件吗？</div>
          <div slot="footer">
            <el-button @click="deleteDialogVisible=false">取消</el-button>
            <el-button type="primary" @click="deleteAsync()">确定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import editProject from './component/editProject'
import editDevice from './component/editDevice'
import { widgetTypes, latticeTypes } from '@/constant'
import { requiredInput, maxInput, ID } from '@/utils/validate'
import { formatDate } from '@/filters'
export default {
  name: "",
  data() {
    return {
      isRunning: false,
      widgetTypes,
      latticeTypes,
      widgetDialogVisible: false,
      widgetForm: {
        name: '',
        type: '',
        code: '',
        unit: '',
        unit1: '',
        unit2: '',
        map: {
          key0: 0,
          key1: 0,
          key2: 0,
          key3: 0
        },
        control: {
          arrowup0: '',
          arrowup1: '',
          arrowdown0: '',
          arrowdown1: '',
          arrowright0: '',
          arrowright1: '',
          arrowleft0: '',
          arrowleft1: ''
        }
      },
      rules: {
        name: maxInput('名称', 16),
        code: ID,
        'map.key0': requiredInput('值不能为空', 'change'),
        'map.key1': requiredInput('值不能为空', 'change'),
      },
      widget: {
        alias: '',
        title: '',
        type: '',
        unit: [''],
        unit1: [''],//温湿度传感器特别处理
        unit2: [''],
        folder: ''
      },
      widgetList: [],
      selectWidget: {
        name: ''
      },
      deleteDialogVisible: false,
      isAdd: false,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet(index, className) {
            return `<span  class="${className}">${index}</span>`
          }
        }
      },
      zoom: true
    }
  },
  props: {
    id: {
      type: Number
    },
    name: {
      type: String
    },
    code: {
      type: String
    }
  },
  components: {
    editProject,
    editDevice
  },
  computed:
  {
    ...mapGetters(['listeners']),
  },
  mounted() {
    let x = window.screen.width - 210 - 330 - 20 - 30
    this.$refs.widgetWarp.style.setProperty('--width', `${x}px`)
    let margin = (x - 300 * 4) / 8
    this.$refs.widgetWarp.style.setProperty('--margin', `${margin}px`)
  },
  watch: {
    listeners: {
      handler(newVal) {
        let project = this.listeners.find(_ => _.projectId == this.code)
        if (project != undefined) {
          project.widget.forEach(_ => {
            let temp = this.widgetList.find(o => o.code == _.code)
            if (temp != undefined)
              temp.value = _.value
          })
        }
      },
      deep: true
    }
  },
  created() {
    this.getWidgetByProjectIdAsync()
  },
  methods: {
    menuClick(indexArray) {
      let [index, type] = indexArray.split("|")
      let x = this.widgetTypes[index].children.find(_ => _.type == type)
      this.widget.alias = this.widgetTypes[index].alias
      this.widget.title = x.title
      this.widget.type = this.widgetTypes[index].type

      this.widgetDialogVisible = true
      this.widgetForm.type = x.type
      this.widgetForm.code = ''
      this.widgetForm.name = ''
      this.widgetForm.unit = ''
      if (x.type == '-2130706430') {  //四位数码管
        this.widgetForm.map.key0 = 0
        this.widgetForm.map.key1 = 0
        this.widgetForm.map.key2 = 0
        this.widgetForm.map.key3 = 0
      }
      else if (x.type == '-2130706431')  //点阵屏
      {
        this.widgetForm.map.key0 = ''
        this.widgetForm.map.key1 = ''
        this.widgetForm.map.key2 = ''
      }
      else {
        this.widgetForm.map.key0 = ''
        this.widgetForm.map.key1 = ''
      }
      if (this.widget.type == 5) {
        this.widgetForm.control = {
          arrowup0: '',
          arrowup1: '',
          arrowdown0: '',
          arrowdown1: '',
          arrowright0: '',
          arrowright1: '',
          arrowleft0: '',
          arrowleft1: ''
        }
      }
      this.widget.unit.length = this.widget.unit1.length = this.widget.unit2.length = 1
      if (x.unit != undefined) {
        if (Array.isArray(x.unit)) {
          if (x.type == "16777219") {
            this.widget.unit1.push(x.unit[0])
            this.widget.unit2.push(x.unit[1])
          }
          else {
            this.widget.unit = this.widget.unit.concat(x.unit)
          }
        }
        else
          this.widget.unit.push(x.unit)
      }
      if (x.folder != undefined) {
        this.widget.folder = x.folder
      }
      if (this.$refs.widgetForm) {
        this.$refs.widgetForm.resetFields()
      }
      this.isAdd = true
    },
    showEditDialog(item) {
      this.isAdd = false
      this.widgetDialogVisible = true
      let { index, type } = item
      let x = this.widgetTypes[index].children.find(_ => _.type == type)
      this.widget.alias = this.widgetTypes[index].alias
      this.widget.title = x.title
      this.widget.type = this.widgetTypes[index].type

      this.widget.unit.length = this.widget.unit1.length = this.widget.unit2.length = 1
      if (x.unit != undefined) {
        if (Array.isArray(x.unit)) {
          if (x.type == "16777219") {
            this.widget.unit1.push(x.unit[0])
            this.widget.unit2.push(x.unit[1])
          }
          else {
            this.widget.unit = this.widget.unit.concat(x.unit)
          }
        }
        else
          this.widget.unit.push(x.unit)
      }
      if (x.folder != undefined) {
        this.widget.folder = x.folder
      }
      this.widgetForm.id = item.id
      this.widgetForm.type = x.type
      this.widgetForm.code = item.code
      this.widgetForm.name = item.name
      this.widgetForm.unit = item.unit

      if (x.type == '-2130706430') {
        this.widgetForm.map.key0 = item.map.key0
        this.widgetForm.map.key1 = item.map.key1
        this.widgetForm.map.key2 = item.map.key2
        this.widgetForm.map.key3 = item.map.key3
      }
      else if (x.type == '-2130706431') {
        this.widgetForm.map.key0 = item.map.key0
        this.widgetForm.map.key1 = item.map.key1
        this.widgetForm.map.key2 = item.map.key2
      }
      else {
        this.widgetForm.map.key0 = item.map.key0
        this.widgetForm.map.key1 = item.map.key1
      }

      if (this.widget.type == 5) {
        this.widgetForm.control = {
          arrowup0: item.map.arrowup0,
          arrowup1: item.map.arrowup1,
          arrowdown0: item.map.arrowdown0,
          arrowdown1: item.map.arrowdown1,
          arrowright0: item.map.arrowright0,
          arrowright1: item.map.arrowright1,
          arrowleft0: item.map.arrowleft0,
          arrowleft1: item.map.arrowleft1
        }
      }

      this.widgetForm.unit = item.unit
      if (item.unit.includes('/')) {
        let [unit1, unit2] = item.unit.split('/')
        this.widgetForm.unit1 = unit1
        this.widgetForm.unit2 = unit2
      }
    },
    showDeleteDialog(row) {
      this.deleteDialogVisible = true
      this.selectWidget = row
    },
    convertValue(value, type = '') {
      if (type != '16777223' && type != '16777226') {
        if (value == '')
          return 0
        return value
      }
      else
        return value
    },
    convertDate(value) {
      let x = formatDate(value, "yyyy年MM月dd日")
      if (x == 'NaN年aN月aN日') {
        return value
      }
      else
        return x;
    },
    parentInt(value) {
      if (value == '')
        return 0
      return Number(value)
    },
    getBooleanValue(item) {
      if (item.value == 0)
        return item.map.key0
      else
        return item.map.key1
    },
    getComputedClass(value) {
      if (value.length < 9) {
        return ''
      }
      else if (value.length >= 9 && value.length < 20) {
        return 'line1'
      }
      else if (value >= 20 && value.length < 30) {
        return 'line2'
      }
      else {
        return 'line3'
      }
    },
    setZoom(zoom) {
      let x
      if (zoom) {
        x = window.screen.width - 210 - 330 - 20 - 30  //vw-菜单宽度-右侧panel宽度-滚动条
      }
      else
        x = window.screen.width - 210 - 60 - 20 - 10
      this.$refs.widgetWarp.style.setProperty('--width', `${x}px`)
      this.zoom = zoom
    },
    async  watchData(newList) {

      let list = newList.map((_, index) => {
        return {
          id: _.id,
          positionX: index + 1
        }
      })
      let { resultcode } = await this.$api.editWidgets(list)
      if (resultcode == 0)
        this.getWidgetByProjectIdAsync()
    },
    async getWidgetByProjectIdAsync() {
      let { resultcode, data } = await this.$api.getWidgetByProjectId(this.id)
      if (resultcode == 0) {
        if (data && data.widgets) {
          data.widgets.forEach(_ => {
            let temp, temp1;
            for (let i = 0; i < this.widgetTypes.length; i++) {
              temp1 = this.widgetTypes[i].children.find(o => o.type == _.type)
              if (temp1 != undefined) {
                temp = this.widgetTypes[i];
                break;
              }
            }
            if (temp != null) {
              _.color = temp.color
              _.alias = temp.alias
              _.prefix = temp1.prefix || temp1.title.substring(0, 1)
              _.isRunning = false
              _.index = temp.type
              _.folder = temp1.folder || ''
              _.value = ''
            }
            if (_.index == 6) {
              _.value = 0
            }
          })
          this.widgetList = data.widgets
        }
      }
    },
    async  runAsync() {
      let { resultcode } = await this.$api.runProject(this.id)
      if (resultcode == 0) {
        this.isRunning = true
        this.$store.commit('RUN_PROJECT', {
          id: this.id,
          isRunning: true        })
        this.widgetList.forEach(_ => {
          _.isRunning = true
        })
        this.$store.dispatch('MQTTWidgetConnect', {
          projectId: this.code,
          modelId: '#'
        })
      }
    },
    async stopAsync() {
      let { resultcode } = await this.$api.stopProject(this.id)
      if (resultcode == 0) {
        this.isRunning = false
        this.$store.commit('RUN_PROJECT', {
          id: this.id,
          isRunning: false        })
        this.widgetList.forEach(_ => {
          _.isRunning = true
        })
        this.widgetList.forEach(_ => {
          _.isRunning = false
        })
      }
    },
    async runWidgetAsync(item) {
      let { resultcode } = await this.$api.runWidget(item.id)
      if (resultcode == 0) {
        item.isRunning = true
        this.$store.dispatch('MQTTWidgetConnect', {
          projectId: this.code,
          modelId: item.code
        })
      }
    },
    async stopWidgetAsync(item) {
      let { resultcode } = await this.$api.stopWidget(item.id)
      if (resultcode == 0) {
        item.isRunning = false
      }
    },
    async saveWidgetAsyc() {
      this.$refs.widgetForm.validate(async valid => {
        if (valid) {
          let { unit1, unit2, control, ...data } = this.widgetForm
          if (this.widgetForm.type == '16777219') //温湿度传感器
          {
            data.unit = [unit1, unit2].join('/')
          }
          if (this.widgetForm.type == '-2130706431') // 点阵屏
          {
            let lattice = this.latticeTypes.find(_ => _.desc == data.map.key0)
            data.map.key1 = lattice.src
            data.map.key2 = lattice.value
            delete data.map.key3
          }
          if (this.widgetForm.type != '-2130706430' && this.widgetForm.type != '-2130706431') //四位数码管&点阵屏
          {
            delete data.map.key2
            delete data.map.key3
          }

          if (this.widget.type == 5) //方向控制
          {
            data.map = control
          }
          if (this.widget.type == 6) //滚动条
          {
            if (data.map.key0 > data.map.key1) {
              this.$message.error('输入值范围取值错误')
              return
            }
          }
          if (this.isAdd)
            data.positionX = this.widgetList.length + 1
          let { resultcode } = this.isAdd ? await this.$api.addWidget(this.id, data) : await this.$api.editWidget(data)
          if (resultcode == 0) {
            this.$message.success('操作成功')
            this.widgetDialogVisible = false
            //if (this.isAdd)
            this.getWidgetByProjectIdAsync()
          }
          else if (resultcode == 100) {
            this.$message.error('ID重复无法新增')
          }
        }
      })
    },
    async deleteAsync() {
      let { resultcode } = await this.$api.deleteWidget(this.selectWidget.id)
      if (resultcode == 0) {
        this.getWidgetByProjectIdAsync()
        this.deleteDialogVisible = false
        this.$message.success('删除成功')
      }
      else {
        this.$message.error('删除失败')
      }
    },

    async editInputWarp({ map, value, sensor }) {
      // let { id } = sensor
      // let data = {
      //   id,
      //   map
      // }
      // let { resultcode } = await this.$api.editWidget(data)
      // if (resultcode == 0) {
      //   sensor.map = map
      // }
      this.getCommandAsync(sensor.code, value)
    },
    sendMsg({ value, sensor }) {
      this.getCommandAsync(sensor.code, value)
    },
    async getCommandAsync(code, value) {
      await this.$api.getWidgetCommand(this.code, code, value)
    }
  }
}
</script>
<style lang="less">
.editor {
  @height: calc(
    100vh - 70px - 50px - 15px - 40px - 35px + 1px
  ); //100vh- header -footer - margintop -tabheight - header  + border
  @height1: calc(@height - 70px);
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    overflow: hidden;
    .el-menu {
      width: 210px;
      .el-submenu {
        .el-submenu__title {
          text-align: left;
          padding-left: 20px;
          i {
            margin-right: 8px;
            color: white;
          }
        }
        .el-menu {
          text-align: left;
          .el-menu-item {
            padding-left: 45px !important;
          }
        }
      }
    }
  }
  .el-header {
    justify-content: flex-end;
    background: white;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    span {
      line-height: 35px;
      color: #3c4353;
      font-size: 24px;
    }
  }
  .el-container {
    height: @height;
    border-bottom: 1px solid #ccc;
    .el-main {
      background-color: white !important;
      color: #333;
      text-align: center;
      position: relative;
      padding: 0;

      .swiper-container {
        height: 140px;
        .swiper-pagination {
          font-size: 32px;
          text-align: right;
          margin-top: 10px;
          .swiper-pagination-bullet {
            margin: 0;
            background: transparent;
            width: auto;
            height: auto;
          }
          .swiper-pagination-bullet-active {
            background: transparent;
          }
          span:not(:last-child)::after {
            content: "/";
            display: inline-block;
            color: #ccc;
          }
        }
      }
      .widgetWarp {
        width: var(--width);
        .widgetList {
          width: 100%;
          margin: 0 15px;
          padding-top: 55px;
          height: 85%;
          user-select: none;
          display: grid;
          justify-content: space-around;
          flex-wrap: wrap;
          grid-template-columns: repeat(auto-fill, 300px);
          .__drag_item {
            width: 300px;
            height: 219px;
            box-shadow: 0px 3px 10px 0px rgba(52, 52, 52, 0.5);
            position: relative;
            margin-bottom: 55px;
            .t1 {
              width: 86px;
              display: block;
              position: absolute;
              top: -41px;
              border-right: 11px solid transparent;
              border-bottom: 11px solid;
            }
            .t2 {
              width: 96px;
              height: 0;
              position: absolute;
              top: -30px;
              border-right: 30px solid transparent;
              border-bottom: 30px solid white;
              filter: drop-shadow(1px 0 6px rgba(52, 52, 52, 0.5));
              span {
                display: block;
                padding-top: 5px;
              }
            }
            .t3 {
              height: 30px;
              line-height: 30px;
              background: white;
              width: 100%;
              text-align: left;
              border-bottom: 1px solid #838a9d;
              .prefix {
                text-align: center;
                span {
                  display: inline-block;
                  height: 23px;
                  width: 23px;
                  line-height: 23px;
                  margin-left: 10px;
                  border: 1px solid black;
                  border-radius: 50%;
                }
              }
              .name {
                padding-left: 15px;
                display: inline-block;
                width: 100px;
                .ellipsis(1);
              }
            }
            .info {
              font-size: 64px;
              margin-top: 60px;

              // .ellipsis(1);
              &.line1 {
                font-size: 48px;
                margin-top: 50px;
                .ellipsis(2);
              }
              &.line2 {
                font-size: 40px;
                margin-top: 38px;
                .ellipsis(3);
              }
              &.line3 {
                font-size: 36px;
                margin-top: 28px;
                .ellipsis(3);
              }

              &.calendar {
                font-size: 36px;
                &.line1 {
                  font-size: 38px;
                  margin-top: 70px;
                }
              }
            }
          }
          img {
            -webkit-user-drag: none;
          }
        }
      }

      .drawer {
        position: fixed;
        right: 20px;
        top: 180px;
        width: 330px;
        height: @height1;
        background: #ffffff;
        box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2);
        .pudding {
          text-align: left;
          margin-left: 10px;
        }
        h1 {
          font-weight: 800;
          line-height: 32px;
          margin-top: 20px;
        }
        .el-form {
          padding: 20px;
          .el-input.is-disabled .el-input__inner {
            cursor: pointer;
          }
        }
        .el-button {
          background: #f6f7f9;
          color: #3c4353;
          width: 110px;
          &:hover,
          &:focus {
            background: #3c4353;
            color: white;
          }
        }
      }
      .drawer1 {
        position: fixed;
        right: 20px;
        top: 170px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.2);
        i {
          line-height: 60px;
        }
      }
    }
  }
  .widgetDialog {
    position: relative;
    border-radius: 0;
    box-shadow: none;
    &::before {
      content: "";
      width: 86px;
      display: block;
      position: absolute;
      top: -32px;
      border-right: 11px solid transparent;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 96px;
      top: -21px;
      border-bottom: 21px solid white;
      border-right: 21px solid transparent;
      z-index: -1;
    }
    .el-dialog__header {
      text-align: left;
      padding: 0;
      position: relative;
      border-bottom: 1px solid #838a9d;
      & > :first-child {
        position: absolute;
        top: -28px;
        padding: 4px 0 4px 10px;
        line-height: 30px;
      }
      & > :last-child {
        padding-left: 8px;
        line-height: 30px;
      }
    }
    .el-dialog__body {
      padding: 0;
      .el-form-item {
        .el-form-item__label {
          display: block;
          text-align: center;
        }
      }
    }
    .el-dialog__footer {
      .el-button {
        background: #f6f7f9;
        color: #3c4353;
        border: 1px solid white;
        &:hover,
        &:focus {
          background: #3c4353;
          color: white;
        }
      }
    }
  }
  .widgetDialog0::before {
    border-bottom: 11px solid #f4bf1f;
  }
  .widgetDialog1::before {
    border-bottom: 11px solid #e65208;
  }
  .widgetDialog2::before {
    border-bottom: 11px solid #88bd45;
  }
  .widgetDialog3::before {
    border-bottom: 11px solid #42bfed;
  }
  .widgetDialog4::before {
    border-bottom: 11px solid #dd272d;
  }
  .widgetDialog5::before {
    border-bottom: 11px solid #0c64eb;
  }
  .widgetDialog6::before {
    border-bottom: 11px solid #1cd0bd;
  }
}
</style>