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
            <div class="input-group m-b-20 hide">
              <input type="text" class="form-control input-white" placeholder="输入客户手机号,姓名或住址信息" v-model="search_text">
              <div class="input-group-btn">
                <button type="button" class="btn btn-inverse" @click="searchOrder">
                  <i class="fa fa-search"></i> 查找
                </button>
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
                      <a v-if="order.listingid" class="btn btn-success btn-block" @click="kjlSync(order)">同步数据</a>
                    </div>
                  </div>
                  <div style="width: 200px; height: 200px; padding: 0px;background: #2d353c;vertical-align: middle;">
                    <div class="result-image" style="width: auto">
                      <a href="javascript:;">
                        <img
                          :src="order.kujiale_planPic?order.kujiale_planPic:'data:image/png;base64,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'"
                          alt
                        >
                      </a>
                    </div>
                  </div>
                  <div class="result-info">
                    <h4 class="title">
                      <a href="javascript:;">方案名称: {{order.design_name}} | 设计师: {{order.name}} | {{order.phone}}</a>
                    </h4>
                    <p class="location">{{order.kujiale_specName}}</p>
                    <p class="desc">{{order.kujiale_commName}} {{order.kujiale_specName}}</p>
                    <!-- <div class="btn-row">
                                    <a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Analytics"><i class="fa fa-fw fa-bar-chart-o"></i></a>
                                    <a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Tasks"><i class="fa fa-fw fa-tasks"></i></a>
                                    <a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Configuration"><i class="fa fa-fw fa-cog"></i></a>
                                    <a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Performance"><i class="fa fa-fw fa-tachometer"></i></a>
                                    <a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Users"><i class="fa fa-fw fa-user"></i></a>
                    </div>-->
                  </div>
                </li>
              </template>
            </ul>
            <div class="clearfix">
              <p class="pagination pagination-without-border" style="width:300px">
                <a href="javascript:;" class="btn btn-primary btn-block" @click="newDegsinDialog()">
                  <i class="fa fa-edit pull-right"></i> 新设计
                </a>
              </p>
            </div>
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
            <h4 class="modal-title">
              设计:
              <a href="#" id="designName" data-type="text" data-pk="1"></a>
            </h4>
          </div>
          <div class="modal-body">
            <div id="degsinModalBody">
              <iframe src id="kujialeiframe" frameborder="0" scrolling="no" width="100%" height="100%" style="border:0px;"></iframe>
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
                <select class="form-control" id="estate_select" data-placeholder="请输入楼盘名称"></select>
              </div>
              <div class="form-group">
                <button type="button" class="btn btn-sm btn-primary m-r-5" @click="queryStandard()">查询</button>
              </div>
              <div class="form-group" v-show="standards.length!=0">
                <p style="margin: 0px;">
                  为您找到
                  <span style="color:#fb5017;">{{standards.length}}</span>张符合要求的户型
                </p>
              </div>
            </div>
          </div>
          <div class="modal-body" style="height: 529px; padding: 0px;">
            <div class="experience-e">
              <h6>面积</h6>
              <ul id="area">
                <li data-area class="active">不限</li>
                <li data-area="0-50" class>
                  小于50m
                  <sup>2</sup>
                </li>
                <li data-area="50-80" class>
                  50-80m
                  <sup>2</sup>
                </li>
                <li data-area="80-100" class>
                  80-100m
                  <sup>2</sup>
                </li>
                <li data-area="100-130">
                  100-130m
                  <sup>2</sup>
                </li>
                <li data-area="130">
                  大于130m
                  <sup>2</sup>
                </li>
              </ul>
              <h6>房型</h6>
              <ul id="house">
                <li data-area class="active">不限</li>
                <li data-area="1" class>一居</li>
                <li data-area="2">二居</li>
                <li data-area="3">三居</li>
                <li data-area="4">四居</li>
                <li data-area="5">五居</li>
              </ul>
            </div>
            <div class="experience-f">
              <ul class="map">
                <template v-for="s in standards">
                  <li :data-planid="s.planId" @click="showStandard(s)" style="position: relative;">
                    <div class="result_i" style="position: absolute;top:0;"></div>
                    <img :src="s.planPic" alt="户型图" style="position: absolute;width:100%;height:200px;">
                    <p style="position: absolute;margin-left: 10px;color: #999;line-height: 22px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;bottom: 27px;">
                      <span>
                        <em style="font-style:normal" class="info-area">{{s.name}}</em>&nbsp;&nbsp;
                      </span>
                    </p>
                    <p style="position: absolute;bottom:-3px;">
                      <span class="info-city">{{s.city}}</span>&nbsp;&nbsp;
                      <span class="info-commname">{{s.commName}}</span>
                    </p>
                  </li>
                </template>
              </ul>
              <!-- <div id="kkpager">
                            <div><span class="pageBtnWrap"><span class="disabled">首页</span><span class="disabled">上一页</span><span class="curr">1</span><span class="disabled">下一页</span><span class="disabled">尾页</span></span><span class="infoTextAndGoPageBtnWrap"><span class="totalText">共<span style="font-weight: bold;" class="totalRecordNum">8</span>条数据
                                <span style="margin-right:10px;"></span>当前第<span class="currPageNum">1</span>页<span class="totalInfoSplitStr">/</span>共<span class="totalPageNum">1</span>页</span><span class="goPageBox">&nbsp;转到<span id="kkpager_gopage_wrap"><input type="button" id="kkpager_btn_go" onclick="kkpager.gopage()" value="确定"><input type="text" id="kkpager_btn_go_input" onfocus="kkpager.focus_gopage()" onkeypress="return kkpager.keypress_gopage(event);" onblur="kkpager.blur_gopage()" value="1"></span>页</span>
                                </span>
                            </div>
                            <div style="clear:both;"></div>
              </div>-->
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
              <a href="javascript:;" class="revise">修改户型</a>-->
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
                <input class="form-control" v-model="searchDesign" style="width: 300px">
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
                    <div class="result_i" style="position: absolute;top:0;"></div>
                    <img :src="d.planPic" alt="户型图" style="position: absolute;width:100%;height:200px;">
                    <p style="position: absolute;margin-left: 10px;color: #999;line-height: 22px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;bottom: 27px;width:223px;">
                      <span>
                        <em style="font-style:normal" class="info-area">{{d.name}}</em>&nbsp;&nbsp;
                      </span>
                    </p>
                    <p style="position: absolute;bottom:-3px;">
                      <span class="info-city">{{d.city}}</span>&nbsp;&nbsp;
                      <span class="info-commname">{{d.commName}}</span>
                    </p>
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
    <div class="modal fade" id="newDegsinModal">
      <div class="modal-dialog modal-dialog-newdesign">
        <div class="modal-content modal-content-full">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <label class="col-sm-2 control-label" style="width: 102px;">新设计</label>
          </div>
          <div class="modal-body row">
            <div class="form-group col-sm-12">
              <label class="col-sm-2 control-label">设计名称</label>
              <div class="col-sm-10">
                <input class="form-control" v-model="designName">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-info" @click="newDegsin()">
              <i class="fa fa-fw fa-plus"></i>增加
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end page container -->
</template>
<script>
const common = require("commonFunc");
const apiUrl = "/api/integration/IntegrationControl?method=";

export default {
  data: function() {
    return {
      userInfo: "",
      currentHouses: "",
      currentDesign: "",
      designName: "",
      search_text: "",
      orders: [],
      standards: [],
      currOrder: "",
      currStandard: "",
      area: "",
      house: "",
      searchDesign: "",
      designs: [],
      currDesign: {},
      isActive: false
    };
  },
  name: "Home",
  mounted: async function() {
    let _self = this;
    if (_self.$route.query.userId) {
      if (!_self.$route.query.housesId) {
        return common.dealWarningCommon("未传入楼盘信息");
      }
      if (!_self.$route.query.appuid) {
        return common.dealWarningCommon("未传酷家乐关联账户");
      }
      if (_self.$route.query.designId) {
        let response = await _self.$http.post(apiUrl + "access", {
          user_id: _self.$route.query.userId,
          name: _self.$route.query.name,
          phone: _self.$route.query.phone,
          appuid: _self.$route.query.appuid,
          houses_id: _self.$route.query.housesId,
          houses_name: _self.$route.query.housesName,
          design_id: _self.$route.query.designId,
          design_name: _self.$route.query.designName
        });
        _self.userInfo = JSON.parse(JSON.stringify(response.data.info));
      } else {
        let response = await _self.$http.post(apiUrl + "access", {
          user_id: _self.$route.query.userId,
          name: _self.$route.query.name,
          phone: _self.$route.query.phone,
          appuid: _self.$route.query.appuid
        });
        _self.userInfo = JSON.parse(JSON.stringify(response.data.info));
      }

      if (_self.$route.query.housesId) {
        _self.currentHouses = _self.$route.query.housesId;
        _self.search_text = _self.$route.query.housesId;
      }

      if (_self.$route.query.designId) {
        _self.currentDesign = _self.$route.query.designId;
        _self.search_text = _self.$route.query.designId;
      }
    } else {
      return common.dealWarningCommon("用户未登陆");
    }
    $("#distpicker").distpicker({
      placeholder: true
    });
    $("#estate_select").select2({
      width: "100%",
      minimumInputLength: 1,
      ajax: {
        url: "/api/openapi/kujiale",
        dataType: "json",
        // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
        data: function(params) {
          let query = {
            method: "queryEstate"
          };
          query.province = $("#province").val();
          query.city = $("#city").val();
          query.search_text = params.term;
          return query;
        }
      },
      tags: true,
      language: "zh-CN"
    });

    $("ul#area").on("click", "li", function() {
      $("ul#area li").removeClass("active");
      $(this).addClass("active");
      _self.area = $(this).attr("data-area");
    });

    $("ul#house").on("click", "li", function() {
      $("ul#house li").removeClass("active");
      $(this).addClass("active");
      _self.house = $(this).attr("data-area");
    });

    $("#designName").editable({
      mode: "inline"
    });
    $("#designName").on("save", async function(e, params) {
      if (_self.currDesign.designId) {
        let response = await _self.$http.post(
          "/api/openapi/kujiale?method=changeDesignName",
          {
            designId: _self.currDesign.designId,
            name: params.newValue
          }
        );
      }
    });
    App.init();

    $("#degsinModal").on("hidden.bs.modal", function() {
      if (_self.search_text) {
        _self.orders = [];
        _self.$http
          .post(apiUrl + "search_order", {
            search_text: _self.search_text
          })
          .then(
            response => {
              for (let d of response.data.info.rows) {
                _self.orders.push(d);
              }
            },
            response => {
              // error callback
              common.dealErrorCommon(_self, response);
            }
          );
      } else {
        _self.orders = [];
      }
    });
    _self.searchOrder();
  },
  methods: {
    searchOrder: async function(event) {
      let _self = this;
      try {
        if (_self.search_text) {
          _self.orders = [];
          let response = await _self.$http.post(apiUrl + "search_order", {
            search_text: _self.search_text
          });
          for (let d of response.data.info.rows) {
            _self.orders.push(d);
          }
        } else {
          _self.orders = [];
        }
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    getIframeSrc: async function(type) {
      let _self = this;
      let queryPara = {};
      if (type === "2") {
        queryPara.planId = _self.currStandard.planId;
      }
      if (type === "3") {
        queryPara.planId = _self.currDesign.planId;
        queryPara.designId = _self.currDesign.designId;
      }
      if (_self.currOrder) {
        queryPara.design_id = _self.currOrder.design_id;
      }
      let response = await _self.$http.post(
        "/api/openapi/kujiale?method=getIframeSrc",
        queryPara
      );
      let body = response.data.info;
      if (window.postMessage) {
        let callback = async function(ev) {
          // console ? console.log(ev) : alert(ev.data);
          if (typeof ev.data != "object") {
            if (
              ev.origin === "http://www.kujiale.com" ||
              ev.origin === "http://yun.kujiale.com" ||
              ev.origin === "https://www.kujiale.com" ||
              ev.origin === "https://yun.kujiale.com"
            ) {
              let data = JSON.parse(ev.data);

              if (
                (data.type === "fp" || data.type === "des") &&
                data.action === "kjl_completed"
              ) {
                $("#kujialeiframe").attr("src", "");
                $("#degsinModal").modal("hide");
              }
            }
          }
        };
        if ("addEventListener" in document) {
          window.addEventListener("message", callback, false);
        } else if ("attachEvent" in document) {
          window.attachEvent("onmessage", callback);
        }
      } else {
        // 如果不支持postMessage， 则使用ie6/7的window共有属性navigator进行hack
        window.navigator.listenKJL = function(msg) {
          alert(msg);
          // var data = JSON.parse(ev.data)
        };
      }

      $("#designName").editable("setValue", body.name);
      $("#degsinModalBody").height($(window).height() - 80);
      $("#kujialeiframe").attr("src", body.iframeurl);
      $("#selectModal").modal("hide");
      $("#userDegsinModal").modal("hide");
      $("#degsinModal").modal("show");
      _self.orders = [];
    },
    getNewIframeSrc: async function(type) {
      let _self = this;
      let queryPara = { user_id: _self.userInfo.user_id };
      let response = await _self.$http.post(
        "/api/openapi/kujiale?method=getNewIframeSrc",
        queryPara
      );
      let body = response.data.info;
      if (window.postMessage) {
        let callback = async function(ev) {
          console ? console.log(ev) : alert(ev.data);
          if (typeof ev.data != "object") {
            if (
              ev.origin === "http://www.kujiale.com" ||
              ev.origin === "http://yun.kujiale.com" ||
              ev.origin === "https://www.kujiale.com" ||
              ev.origin === "https://yun.kujiale.com"
            ) {
              let data = JSON.parse(ev.data);

              if (
                data.type === "fp" &&
                (data.action === "kjl_saved" ||
                  data.action === "kjl_loaded" ||
                  data.action === "kjl_auto_saved’")
              ) {
                if (!_self.currDesign.planId && data.fpId) {
                  _self.$http.post(apiUrl + "update_fpid", {
                    design_id: _self.currOrder.design_id,
                    fpid: data.fpId
                  });
                }
                _self.currDesign.planId = data.fpId;
              }

              if (
                data.type === "des" &&
                (data.action === "kjl_saved" || data.action === "kjl_loaded")
              ) {
                if (!_self.currDesign.designId && data.desid) {
                  _self.$http.post(apiUrl + "update_desid", {
                    design_id: _self.currOrder.design_id,
                    desid: data.desid
                  });
                }
                _self.currDesign.designId = data.desid;
              }

              if (
                (data.type === "fp" || data.type === "des") &&
                data.action === "kjl_completed"
              ) {
                $("#kujialeiframe").attr("src", "");
                $("#degsinModal").modal("hide");
              }
            }
          }
        };
        if ("addEventListener" in document) {
          window.addEventListener("message", callback, false);
        } else if ("attachEvent" in document) {
          window.attachEvent("onmessage", callback);
        }
      } else {
        // 如果不支持postMessage， 则使用ie6/7的window共有属性navigator进行hack
        window.navigator.listenKJL = function(msg) {
          alert(msg);
          // var data = JSON.parse(ev.data)
        };
      }

      $("#designName").editable("setValue", body.name);
      $("#degsinModalBody").height($(window).height() - 80);
      $("#kujialeiframe").attr("src", body.iframeurl);
      $("#selectModal").modal("hide");
      $("#userDegsinModal").modal("hide");
      $("#degsinModal").modal("show");
      _self.orders = [];
    },
    getDegsin: async function(order) {
      let _self = this;
      try {
        _self.currOrder = JSON.parse(JSON.stringify(order));

        _self.currDesign.planId = _self.currOrder.fpid;
        _self.currDesign.designId = _self.currOrder.desid;
        if (order.desid) {
          _self.getIframeSrc("1");
        } else {
          $(".experience-show").hide();
          $("#selectModal").modal("show");
          if (
            $("#province").val() ||
            $("#city").val() ||
            $("#estate_select").select2("data")
          ) {
            $("#province")
              .val(null)
              .trigger("change");
            $("#city")
              .val(null)
              .trigger("change");
            $("#estate_select").empty();
            _self.standards = [];
          }
        }
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    queryStandard: async function() {
      let _self = this;
      try {
        if (!$("#province").val()) {
          return common.dealWarningCommon("请选择地址");
        }
        if (!$("#city").val()) {
          return common.dealWarningCommon("请选择地址");
        }
        let selectData = $("#estate_select").select2("data");
        if (selectData.length === 0) {
          return common.dealWarningCommon("请输入查询楼盘");
        }

        let params = {
          province: $("#province").val(),
          city: $("#city").val(),
          search_text: selectData[0].text
        };
        if (_self.house) {
          params.count = _self.house;
        }
        if (_self.area) {
          let areas = _self.area.split("-");
          if (areas.length === 2) {
            params.min = areas[0];
            params.max = areas[1];
          } else {
            params.min = areas[0];
          }
        }
        let response = await _self.$http.post(
          "/api/openapi/kujiale?method=queryStandard",
          params
        );
        let retData = response.data.info;
        _self.standards = retData.results;
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    showStandard: async function(standard) {
      let _self = this;
      _self.isActive = true;
      try {
        _self.currStandard = JSON.parse(JSON.stringify(standard));
        $(".experience-show").show();
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    hideShow: async function() {
      let _self = this;
      _self.isActive = false;
      window.setTimeout(function() {
        $(".experience-show").hide();
      }, 500);
    },
    copyDegsinDialog: async function() {
      let _self = this;
      _self.searchDesign = "";
      $(".experience-show").hide();
      $("#selectModal").modal("hide");
      $("#userDegsinModal").modal("show");
      _self.designs = [];
    },
    queryDesign: async function() {
      let _self = this;
      try {
        let params = {
          search_text: _self.searchDesign,
          appuid: _self.userInfo.appuid
        };
        let response = await _self.$http.post(
          "/api/openapi/kujiale?method=queryDesign",
          params
        );
        let retData = response.data.info;
        _self.designs = retData.results;
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    showDesign: async function(design) {
      let _self = this;
      try {
        _self.currDesign = JSON.parse(JSON.stringify(design));
        $(".experience-show").show();
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    generateKJL: async function(order) {
      let _self = this;
      try {
        let response = await _self.$http.post(
          "/api/openapi/kujiale?method=generateKJL",
          {
            design_id: order.design_id
          }
        );
        common.dealSuccessDelayCommon(
          "生成数据成功, 请60秒后进行数据同步",
          () => {
            _self.searchOrder();
          }
        );
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    kjlSync: async function(order) {
      let _self = this;
      try {
        let response = await _self.$http.post(
          "/api/openapi/kujiale?method=kjlSync",
          {
            design_id: order.design_id
          }
        );
        common.dealSuccessCommon("同步成功");
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    },
    newDegsinDialog: async function() {
      let _self = this;
      _self.designName = "";
      $("#newDegsinModal").modal("show");
    },
    newDegsin: async function() {
      let _self = this;
      try {
        let response = await _self.$http.post(apiUrl + "add_order", {
          user_id: _self.$route.query.userId,
          name: _self.$route.query.name,
          phone: _self.$route.query.phone,
          appuid: _self.$route.query.appuid,
          houses_id: _self.$route.query.housesId,
          houses_name: _self.$route.query.housesName,
          design_name: _self.designName
        });
        $("#newDegsinModal").modal("hide");
        _self.search_text = _self.$route.query.housesId;
        _self.searchOrder();
        _self.getDegsin(response.data.info);
      } catch (error) {
        common.dealErrorCommon(_self, error);
      }
    }
  }
};
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

.modal-dialog-newdesign {
  width: 390px;
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
