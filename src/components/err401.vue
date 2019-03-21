<template>
<div>
    <!-- begin #page-loader -->
    <div id="page-loader" class="fade in"><span class="spinner"></span></div>
    <!-- end #page-loader -->

    <!-- begin #page-container -->
    <div id="page-container" class="fade">
        <!-- begin error -->
        <div class="error">
            <div class="error-code m-b-10">401 <i class="fa fa-warning"></i></div>
            <div class="error-content">
                <div class="error-message"> 401 </div>
                <div class="error-desc m-b-20">
                    由于用户匿名访问使用的账号(默认是IUSR_机器名)被禁用. <br /> 或者没有权限访问计算机，将造成用户无法访问.
                </div>
                <div>
                    <a href="/" class="btn btn-success">Go Back to Home Page</a>
                </div>
            </div>
        </div>
        <!-- end error -->
    </div>
    <!-- end page container -->
</div>
</template>
<script>
export default {
    name: 'err401',
    mounted: function() {
        App.init()
    }
}
</script>
<style scoped>
</style>
