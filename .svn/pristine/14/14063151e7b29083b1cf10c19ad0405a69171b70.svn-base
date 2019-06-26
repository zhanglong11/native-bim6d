let LoadingUtil = {
    showLoading(timeOut = 200000){
        global.loading && global.loading.showLoading();
        this.timerLoading = setTimeout(() => {
            this.dismissLoading();
        }, timeOut);
    },
    dismissLoading(){
        global.loading && global.loading.dismissLoading();
        this.timerLoading && clearTimeout(this.timerLoading);
    },
};

export default LoadingUtil;
