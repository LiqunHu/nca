<template>
<!-- begin #page-container -->
<div id="page-container" class="page-container fade page-sidebar-fixed page-header-fixed">
    <div class="content" style="margin-left: 0px">
        <!-- begin page-header -->
        <h1 class="page-header" style="margin-top: 10px">方案设计</h1>
        <!-- end page-header -->
        <!-- begin row -->
        <div class="row">
            <!-- begin col-12 -->
            <div class="col-md-12">
                <div class="result-container">
                    <div class="input-group m-b-20">
                        <input type="text" class="form-control input-white" placeholder="输入客户手机号,姓名或住址信息" v-model="search_text" />
                        <div class="input-group-btn">
                            <button type="button" class="btn btn-inverse" @click="searchOrder"><i class="fa fa-search"></i> 查找</button>
                        </div>
                    </div>
                    <ul class="result-list">
                        <template v-for="order in orders">
                        <li>
                            <div style="width: 240px; border-left: 1px dashed #ddd; float: right; height: 200px; display: flex; justify-content:center; align-items:Center;">
                                <!-- $92,101 <small>PER MONTH</small> -->
                                <div style="width: 240px;">
                                  <a class="btn btn-info btn-block" @click="getDegsin(order)">去装修</a>
                                  <a v-if="order.desid" class="btn btn-primary btn-block" @click="generateKJL(order)">生成数据</a>
                                  <a v-if="order.desid" class="btn btn-success btn-block" @click="kjlSync(order)">同步数据</a>
                                </div>
                            </div>
                            <div style="width: 200px; height: 200px; padding: 0px;background: #2d353c;vertical-align: middle;">
                              <div class="result-image" style="width: auto">
                                  <a href="javascript:;"><img :src="order.kujiale_planPic" alt="" /></a>
                              </div>
                            </div>
                            <div class="result-info">
                                <h4 class="title"><a href="javascript:;">设计: {{order.design_id}} | 客户: {{order.name}} | {{order.phone}}</a></h4>
                                <p class="location">{{order.design_name}}</p>
                                <p class="desc">
                                    {{order.kujiale_commName}} {{order.kujiale_specName}}
                                </p>
                                <div class="btn-row">
                                    <a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Analytics"><i class="fa fa-fw fa-bar-chart-o"></i></a>
                                    <a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Tasks"><i class="fa fa-fw fa-tasks"></i></a>
                                    <a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Configuration"><i class="fa fa-fw fa-cog"></i></a>
                                    <a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Performance"><i class="fa fa-fw fa-tachometer"></i></a>
                                    <a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Users"><i class="fa fa-fw fa-user"></i></a>
                                </div>
                            </div>
                        </li>
                        </template>
                    </ul>
                    <!-- <div class="clearfix">
                        <p class="pagination pagination-without-border" style="width:300px">
                            <a href="javascript:;" class="btn btn-primary btn-block" @click="getNewIframeSrc()"><i class="fa fa-edit pull-right"></i> 新设计</a>
                        </p>
                    </div> -->
                </div>
            </div>
            <!-- end col-12 -->
        </div>
        <!-- end row -->
    </div>
    <div class="modal fade" id="degsinModal">
        <div class="modal-dialog modal-dialog-full">
            <div class="modal-content modal-content-full">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">设计: <a href="#" id="designName" data-type="text" data-pk="1"></a></h4>
                </div>
                <div class="modal-body">
                    <div id="degsinModalBody">
                        <iframe src="" id="kujialeiframe" frameborder="0" scrolling="no" width="100%" height="100%" style="border:0px;"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="selectModal">
        <div class="modal-dialog modal-dialog-select">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <div class="form-inline">
                        <div data-toggle="distpicker" id="distpicker" class="form-group">
                            <div class="form-group">
                                <select class="form-control picker-width" id="province"></select>
                            </div>
                            <div class="form-group">
                                <select class="form-control picker-width" id="city"></select>
                            </div>
                        </div>
                        <div class="form-group" style="width: 300px">
                            <select class="form-control" id="estate_select" style="width: 300px"></select>
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-sm btn-primary m-r-5" @click="queryStandard()">查询</button>
                        </div>
                        <div class="form-group" v-show="standards.length!=0">
                            <p style="margin: 0px;">为您找到<span style="color:#fb5017;">{{standards.length}}</span>张符合要求的户型</p>
                        </div>
                    </div>
                </div>
                <div class="modal-body" style="height: 529px; padding: 0px;">
                    <div class="experience-e">
                        <h6>面积</h6>
                        <ul id="area">
                            <li data-area="" class="active">不限</li>
                            <li data-area="0-50" class="">小于50m<sup>2</sup></li>
                            <li data-area="50-80" class="">50-80m<sup>2</sup></li>
                            <li data-area="80-100" class="">80-100m<sup>2</sup></li>
                            <li data-area="100-130">100-130m<sup>2</sup></li>
                            <li data-area="130">大于130m<sup>2</sup></li>
                        </ul>
                        <h6>房型</h6>
                        <ul id="house">
                            <li data-area="" class="active">不限</li>
                            <li data-area="1" class="">一居</li>
                            <li data-area="2">二居</li>
                            <li data-area="3">三居</li>
                            <li data-area="4">四居</li>
                            <li data-area="5">五居</li>
                        </ul>
                    </div>
                    <div class="experience-f">
                        <ul class="map">
                            <template v-for="s in standards">
                                    <li :data-planid="s.planId" @click="showStandard(s)" style="position: relative;" >
                                        <div class="result_i" style="position: absolute;top:0;"> </div>
                                        <img :src="s.planPic" alt="户型图" style="position: absolute;width:100%;height:200px;">
                                        <p style="position: absolute;margin-left: 10px;color: #999;line-height: 22px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;bottom: 27px;">
                                            <span><em style="font-style:normal" class="info-area">{{s.name}}</em>&nbsp;&nbsp;</span>
                                        </p>
                                        <p style="position: absolute;bottom:-3px;"><span class="info-city">{{s.city}}</span>&nbsp;&nbsp;<span class="info-commname">{{s.commName}}</span></p>
                                    </li>
                            </template>
                        </ul>
                        <!-- <div id="kkpager">
                            <div><span class="pageBtnWrap"><span class="disabled">首页</span><span class="disabled">上一页</span><span class="curr">1</span><span class="disabled">下一页</span><span class="disabled">尾页</span></span><span class="infoTextAndGoPageBtnWrap"><span class="totalText">共<span style="font-weight: bold;" class="totalRecordNum">8</span>条数据
                                <span style="margin-right:10px;"></span>当前第<span class="currPageNum">1</span>页<span class="totalInfoSplitStr">/</span>共<span class="totalPageNum">1</span>页</span><span class="goPageBox">&nbsp;转到<span id="kkpager_gopage_wrap"><input type="button" id="kkpager_btn_go" onclick="kkpager.gopage()" value="确定"><input type="text" id="kkpager_btn_go_input" onfocus="kkpager.focus_gopage()" onkeypress="return kkpager.keypress_gopage(event);" onblur="kkpager.blur_gopage()" value="1"></span>页</span>
                                </span>
                            </div>
                            <div style="clear:both;"></div>
                        </div> -->
                    </div>
                    <p class="experience-f-a">
                        <a href="javascript:;" @click="copyDegsinDialog()">复制原有设计</a>
                        <a href="javascript:;" @click="getNewIframeSrc()">新设计</a>
                    </p>
                    <div class="experience-show" style="right: 0px;position:absolute;" v-bind:class="[ isActive ? 'selectM':'selectO']">
                        <img :src="currStandard.planPic" alt="设计图">
                        <p>
                            <span class="info-area">{{currStandard.name}}</span>&nbsp;，
                            <span class="info-city">{{currStandard.city}}</span>&nbsp;
                            <span class="info-commname">{{currStandard.commName}}</span>
                        </p>
                        <button type="button" class="btn btn-success m-r-5 m-b-5" @click="getIframeSrc('2')">去装修</button>
                        <!-- <a href="javascript:;" class="decorating">去装修</a>
                        <a href="javascript:;" class="revise">修改户型</a> -->
                        <div class="shut" @click="hideShow()"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="userDegsinModal">
        <div class="modal-dialog modal-dialog-design">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <div class="form-inline">
                        <div class="form-group" style="width: 300px">
                            <input class="form-control" v-model="searchDesign" style="width: 300px"></input>
                        </div>
                        <div class="form-group">
                            <button type="button" class="btn btn-sm btn-primary m-r-5" @click="queryDesign()">查询</button>
                        </div>
                    </div>
                </div>
                <div class="modal-body" style="height: 529px; padding: 0px;">
                    <div class="experience-f">
                        <ul class="map">
                            <template v-for="d in designs">
                              <li @click="showDesign(d)" style="position: relative;">
                                  <div class="result_i" style="position: absolute;top:0;"> </div>
                                  <img :src="d.planPic" alt="户型图" style="position: absolute;width:100%;height:200px;">
                                  <p style="position: absolute;margin-left: 10px;color: #999;line-height: 22px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;bottom: 27px;width:223px;">
                                      <span><em style="font-style:normal" class="info-area">{{d.name}}</em>&nbsp;&nbsp;</span>
                                  </p>
                                  <p style="position: absolute;bottom:-3px;"><span class="info-city">{{d.city}}</span>&nbsp;&nbsp;<span class="info-commname">{{d.commName}}</span></p>
                              </li>
                            </template>
                        </ul>
                    </div>
                    <div class="experience-show" style="right: 0px;">
                        <img :src="currDesign.planPic" alt="设计图">
                        <p>
                            <span class="info-area">{{currDesign.name}}</span>&nbsp;，
                            <span class="info-city">{{currDesign.city}}</span>&nbsp;
                            <span class="info-commname">{{currDesign.commName}}</span>
                        </p>
                        <button type="button" class="btn btn-success m-r-5 m-b-5" @click="getIframeSrc('3')">复制设计</button>
                        <div class="shut" @click="hideShow()"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end page container -->
</template>
<script>
const common = require('commonFunc')
const apiUrl = '/api/integration/IntegrationControl?method='

export default {
  data: function () {
    return {
      userInfo: '',
      currentHouses: '',
      currentDesign: '',
      search_text: '',
      orders: [],
      standards: [],
      currOrder: '',
      currStandard: '',
      area: '',
      house: '',
      searchDesign: '',
      designs: [],
      currDesign: {},
      isActive: false
    }
  },
  name: 'Home',
  mounted: async function () {
    let _self = this
    if(_self.$route.query.userId){
      if(!_self.$route.query.housesId) {
        return common.dealWarningCommon('未传入楼盘信息')
      }
      if(!_self.$route.query.appuid) {
        return common.dealWarningCommon('未传酷家乐关联账户')
      }
      if(_self.$route.query.designId) {
        let response = await _self.$http.post(apiUrl + 'access',{
          user_id: _self.$route.query.userId,
          name: _self.$route.query.name,
          phone: _self.$route.query.phone,
          appuid: _self.$route.query.appuid,
          houses_id: _self.$route.query.housesId,
          houses_name: _self.$route.query.housesName,
          design_id: _self.$route.query.designId,
          design_name: _self.$route.query.designName
        })
        _self.userInfo = JSON.parse(JSON.stringify(response.data.info))
      } else {
        let response = await _self.$http.post(apiUrl + 'access',{
          user_id: _self.$route.query.userId,
          name: _self.$route.query.name,
          phone: _self.$route.query.phone,
          appuid: _self.$route.query.appuid
        })
        _self.userInfo = JSON.parse(JSON.stringify(response.data.info))
      }

      if(_self.$route.query.housesId){
        _self.currentHouses = _self.$route.query.housesId
        _self.search_text = _self.$route.query.housesId
      }
      
      if(_self.$route.query.designId){
        _self.currentDesign = _self.$route.query.designId
        _self.search_text = _self.$route.query.designId
      }
    } else {
      return common.dealWarningCommon('用户未登陆')
    }
    $('#distpicker').distpicker({
      placeholder: true
    });
    $('#estate_select').select2({
      minimumInputLength: 1,
      ajax: {
        url: '/api/openapi/kujiale',
        dataType: 'json',
        // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
        data: function (params) {
          let query = {
            method: 'queryEstate'
          }
          query.province = $('#province').val()
          query.city = $('#city').val()
          query.search_text = params.term
          return query;
        }
      },
      tags: true,
      language: 'zh-CN'
    });

    $("ul#area").on("click", "li", function () {
      $("ul#area li").removeClass("active")
      $(this).addClass("active")
      _self.area = $(this).attr('data-area')
    });

    $("ul#house").on("click", "li", function () {
      $("ul#house li").removeClass("active")
      $(this).addClass("active")
      _self.house = $(this).attr('data-area')
    });

    $('#designName').editable({
      mode: 'inline'
    });
    $('#designName').on('save', async function (e, params) {
      if (_self.currDesign.designId){
        let response = await _self.$http.post('/api/openapi/kujiale?method=changeDesignName', {
          designId: _self.currDesign.designId,
          name: params.newValue
        }) 
      }
    });
    App.init()

    $('#degsinModal').on('hidden.bs.modal', function () {
      if (_self.search_text) {
        _self.orders = [];
        _self.$http.post(apiUrl + 'search_order', {
          search_text: _self.search_text
        }).then((response) => {
          for (let d of response.data.info.rows) {
            _self.orders.push(d)
          }
        }, (response) => {
          // error callback
          common.dealErrorCommon(_self, response)
        })
      } else {
        _self.orders = []
      }
    })
    _self.searchOrder()
  },
  methods: {
    searchOrder: async function (event) {
      let _self = this
      try {
        if (_self.search_text) {
          _self.orders = [];
          let response = await _self.$http.post(apiUrl + 'search_order', {
            search_text: _self.search_text
          });
          for (let d of response.data.info.rows) {
            _self.orders.push(d)
          }
        } else {
          _self.orders = []
        }
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    getIframeSrc: async function (type) {
      let _self = this
      let queryPara = {}
      if (type === '2') {
        queryPara.planId = _self.currStandard.planId
      }
      if (type === '3') {
        queryPara.planId = _self.currDesign.planId
        queryPara.designId = _self.currDesign.designId
      }
      if (_self.currOrder) {
        queryPara.design_id = _self.currOrder.design_id
      }
      let response = await _self.$http.post('/api/openapi/kujiale?method=getIframeSrc', queryPara)
      let body = response.data.info;
      if (window.postMessage) {
        let callback = async function (ev) {
          // console ? console.log(ev) : alert(ev.data);
          if (typeof (ev.data) != "object") {
            if (ev.origin === 'http://www.kujiale.com' ||
              ev.origin === 'http://yun.kujiale.com' ||
              ev.origin === 'https://www.kujiale.com' ||
              ev.origin === 'https://yun.kujiale.com') {
              let data = JSON.parse(ev.data)

              if ((data.type === 'fp' || data.type === 'des') && data.action === 'kjl_completed') {
                $('#kujialeiframe').attr('src', '');
                $('#degsinModal').modal('hide')
              }
            }
          }
        };
        if ('addEventListener' in document) {
          window.addEventListener('message', callback, false);
        } else if ('attachEvent' in document) {
          window.attachEvent('onmessage', callback);
        }
      } else {
        // 如果不支持postMessage， 则使用ie6/7的window共有属性navigator进行hack
        window.navigator.listenKJL = function (msg) {
          alert(msg)
          // var data = JSON.parse(ev.data)
        };
      }

      $("#designName").editable('setValue', body.name)
      $('#degsinModalBody').height($(window).height() - 80)
      $('#kujialeiframe').attr('src', body.iframeurl);
      $('#selectModal').modal('hide')
      $('#userDegsinModal').modal('hide')
      $('#degsinModal').modal('show')
      _self.orders = []
    },
    getNewIframeSrc: async function (type) {
      let _self = this
      let queryPara = {user_id: _self.userInfo.user_id}
      let response = await _self.$http.post('/api/openapi/kujiale?method=getNewIframeSrc', queryPara)
      let body = response.data.info;
      if (window.postMessage) {
        let callback = async function (ev) {
          console ? console.log(ev) : alert(ev.data);
          if (typeof (ev.data) != "object") {
            if (ev.origin === 'http://www.kujiale.com' ||
              ev.origin === 'http://yun.kujiale.com' ||
              ev.origin === 'https://www.kujiale.com' ||
              ev.origin === 'https://yun.kujiale.com') {
              let data = JSON.parse(ev.data)

              if (data.type === 'fp' && (data.action === 'kjl_saved' || data.action === 'kjl_loaded' || data.action === 'kjl_auto_saved’')) {
                if(!_self.currDesign.planId && data.fpId) {
                  _self.$http.post(apiUrl + 'update_fpid', {
                    design_id: _self.currOrder.design_id,
                    fpid: data.fpId
                  })
                }
                _self.currDesign.planId = data.fpId
              }

              if (data.type === 'des' && (data.action === 'kjl_saved' || data.action === 'kjl_loaded')) {
                if(!_self.currDesign.designId && data.desid) {
                  _self.$http.post(apiUrl + 'update_desid', {
                    design_id: _self.currOrder.design_id,
                    desid: data.desid
                  })
                }
                _self.currDesign.designId = data.desid
              }

              if ((data.type === 'fp' || data.type === 'des') && data.action === 'kjl_completed') {
                $('#kujialeiframe').attr('src', '');
                $('#degsinModal').modal('hide')
              }
            }
          }
        };
        if ('addEventListener' in document) {
          window.addEventListener('message', callback, false);
        } else if ('attachEvent' in document) {
          window.attachEvent('onmessage', callback);
        }
      } else {
        // 如果不支持postMessage， 则使用ie6/7的window共有属性navigator进行hack
        window.navigator.listenKJL = function (msg) {
          alert(msg)
          // var data = JSON.parse(ev.data)
        };
      }

      $("#designName").editable('setValue', body.name)
      $('#degsinModalBody').height($(window).height() - 80)
      $('#kujialeiframe').attr('src', body.iframeurl);
      $('#selectModal').modal('hide')
      $('#userDegsinModal').modal('hide')
      $('#degsinModal').modal('show')
      _self.orders = []
    },
    getDegsin: async function (order) {
      let _self = this
      try {
        _self.currOrder = JSON.parse(JSON.stringify(order))
        
        _self.currDesign.planId = _self.currOrder.fpid
        _self.currDesign.designId = _self.currOrder.desid
        if (order.desid) {
          _self.getIframeSrc('1')
        } else {
          $('.experience-show').hide()
          $('#selectModal').modal('show')
          if ($('#province').val() || $('#city').val() || $('#estate_select').select2('data')) {
            $('#province').val(null).trigger('change')
            $('#city').val(null).trigger('change')
            $('#estate_select').empty();
            _self.standards = []
          }
        }
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    queryStandard: async function () {
      let _self = this
      try {
        if (!$('#province').val()) {
          return common.dealWarningCommon('请选择地址')
        }
        if (!$('#city').val()) {
          return common.dealWarningCommon('请选择地址')
        }
        let selectData = $('#estate_select').select2('data')
        if (selectData.length === 0) {
          return common.dealWarningCommon('请输入查询楼盘')
        }

        let params = {
          province: $('#province').val(),
          city: $('#city').val(),
          search_text: selectData[0].text
        }
        if (_self.house) {
          params.count = _self.house
        }
        if (_self.area) {
          let areas = _self.area.split('-')
          if (areas.length === 2) {
            params.min = areas[0]
            params.max = areas[1]
          } else {
            params.min = areas[0]
          }
        }
        let response = await _self.$http.post('/api/openapi/kujiale?method=queryStandard', params)
        let retData = response.data.info
        _self.standards = retData.results
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    showStandard: async function (standard) {
      let _self = this
      _self.isActive = true;
      try {
        _self.currStandard = JSON.parse(JSON.stringify(standard))
        $('.experience-show').show()
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    hideShow: async function () {
      let _self = this;
      _self.isActive = false;
      window.setTimeout(function () {
        $('.experience-show').hide()
      }, 500);

    },
    copyDegsinDialog: async function () {
      let _self = this;
      _self.searchDesign = ''
      $('.experience-show').hide()
      $('#selectModal').modal('hide')
      $('#userDegsinModal').modal('show')
      _self.designs = []
    },
    queryDesign: async function () {
      let _self = this
      try {
        let params = {
          search_text: _self.searchDesign,
          appuid: _self.userInfo.appuid
        }
        let response = await _self.$http.post('/api/openapi/kujiale?method=queryDesign', params)
        let retData = response.data.info
        _self.designs = retData.results
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    showDesign: async function (design) {
      let _self = this
      try {
        _self.currDesign = JSON.parse(JSON.stringify(design))
        $('.experience-show').show()
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    generateKJL: async function (order) {
      let _self = this
      try {
        let response = await _self.$http.post('/api/openapi/kujiale?method=generateKJL', {
          design_id: order.design_id
        })
        common.dealSuccessCommon('生成数据成功, 请60秒后进行数据同步')
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    kjlSync: async function (order) {
      let _self = this
      try {
        let response = await _self.$http.post('/api/openapi/kujiale?method=kjlSync', {
          design_id: order.design_id
        })
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    }
  }
}
</script>
<style scoped>
.modal-dialog-full {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.modal-content-full {
  height: auto;
  min-height: 100%;
  border-radius: 0;
}

.modal-body-full {
  height: auto;
  min-height: 100%;
  border-radius: 0;
}

.modal-dialog-select {
  width: 950px;
  height: 600px;
}

.modal-dialog-design {
  width: 790px;
  height: 600px;
}

.experience-e {
  width: 169px;
  background: #f6f6f6;
  height: 529px;
  float: left;
  border-right: 1px solid #ddd;
}

.experience-e ul {
  margin-left: 20px;
  margin-top: 5px;
  padding: 0;
}

.experience-e ul li {
  line-height: 22px;
  cursor: pointer;
  list-style: none;
}

.experience-e li.active {
  color: #0eaf63;
}

.experience-e h6 {
  margin-left: 20px;
  padding-top: 20px;
  font-size: 18px;
}

.experience-f {
  float: left;
  width: 780px;
  height: 479px;
  overflow-y: auto;
  overflow-x: auto;
}

.experience-f .map {
  position: unset;
  padding: 20px 10px;
}

.map li {
  border: 1px solid #eee;
  width: 235px;
  height: 260px;
  overflow: hidden;
  float: left;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.map li p {
  margin-left: 10px;
  color: #999;
  line-height: 22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.map sup {
  font-size: smaller;
}

.map li img {
  width: 100%;
  height: 200px;
  transition: all 1s;
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  -ms-transition: all 1s;
  -o-transition: all 1s;
}

.experience-show {
  width: 630px;
  height: 588px;
  border-left: 1px solid #ddd;
  text-align: center;
  position: absolute;
  top: -59px;
  right: -634px;
  background: white;
  box-shadow: -2px 0px 10px #888888;
  transition: all 1s;
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  -ms-transition: all 1s;
  -o-transition: all 1s;
}

.experience-show img {
  width: 80%;
  height: 460px;
  margin: 20px 10%;
}

.experience-f-a {
  float: left;
  height: 50px;
  width: 780px;
  background: #f6f6f6;
  line-height: 50px;
  text-indent: 30px;
  font-weight: 600;
}

.shut {
  width: 16px;
  height: 16px;
  background: url(/static/images/base/shut.png) no-repeat center;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}
@keyframes fadeIn {
  from {
    width: 0px;
  }
  to {
    width: 630px;
  }
}
@keyframes fadeOut {
  from {
    width: 630px;
  }
  to {
    width: 0px;
  }
}
.map li div.result_i {
  width: 233px;
  height: 260px;
}
.map li:hover div.result_i {
  z-index: 2;
  background: rgba(189, 188, 188, 0.3);
  filter: alpha(Opacity=80);
  -moz-opacity: 0.8;
  opacity: 0.8;
}
.selectM {
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-delay: 0s;
}
.selectO {
  -webkit-animation-name: fadeOut;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-delay: 0s;
}
</style>
