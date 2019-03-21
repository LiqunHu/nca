<template>
<div>
    <!-- begin #page-loader -->
    <div id="page-loader" class="fade in"><span class="spinner"></span></div>
    <!-- end #page-loader -->

    <!-- begin #page-container -->
    <div id="page-container" class="fade">
        <!-- begin error -->
        <div class="error">
            <div class="error-code m-b-10">501 <i class="fa fa-warning"></i></div>
            <div class="error-content">
                <div class="error-message">服务器内部错误</div>
                <div class="error-desc m-b-20">
                    啊!!!!!!!!!!出错了. <br /> 啊啊啊啊啊出错了
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
    name: 'errpage',
    mounted: function() {
        App.init()
    }
}
</script>
<style scoped>
</style>
