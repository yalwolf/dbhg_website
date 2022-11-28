new Vue({
    el: "#app",
    data: {
        cookie_hid: null,
        cookie_hkey: "",
        login: 3,
        // 用户信息
        username: "",
        userimg: "",
        usertype: null,
        userimg_qq: null,
        userimg_douyu: null,
        // 数据
        map: 1,
        m_map: 2,
    },
    computed: {},
    methods: {
        checkCookie() {
            if (this.getCookie("hid")) this.cookie_hid = this.getCookie("hid");
            if (this.getCookie("hkey")) this.cookie_hkey = this.getCookie("hkey");
        },
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
            }
            return "";
        },
        login_a() {
            location.href = "http://127.0.0.1:5501/oauth/login/?domain=1&linktype=1"
        },
        register() {
            location.href = "http://127.0.0.1:5501/oauth/register/"
        },
        docs() {
            location.href = "http://docs.dbhg.top/"
        },
        hgcy() {
            location.href = "http://hgcy.dbhg.top/"
        },
        account() {
            location.href = "http://user.dbhg.top/"
        },
        about() {
            location.href = "./about/"
        },
        bg() {
            location.href = "./bg/"
        },
        user_info_get() {
            var that = this
            let params = new FormData();
            params.append("apikey", APIKey);
            params.append("hid", that.cookie_hid);
            params.append("hkey", that.cookie_hkey);
            axios.post(APILink + '/main/info', params)
                .then(function(response) {
                    if (response.data.code == 1000) {
                        that.username = response.data.data.username
                        if (response.data.data.userimg.userimg_type == 0) {
                            that.userimg = response.data.data.userimg.userimg_url
                        } else if (response.data.data.userimg.userimg_type == 1) {
                            that.userimg = response.data.data.userimg.userimg_douyu
                        } else if (response.data.data.userimg.userimg_type == 2) {
                            that.userimg = "https://q.qlogo.cn/g?b=qq&nk=" + response.data.data.userimg.userimg_qq + "&s=640"
                        }
                        that.email_text = ""
                        that.email_classinfo = 2
                    }
                    if (response.data.code == 1006) {
                        that.get.email = ""
                        that.get.password = ""
                        that.email_text = 3
                        that.email_classinfo = 3
                    }
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                })
                .then(function() {});
        },
        login_out() {
            document.cookie = "hid=" + this.cookie_hid + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = "hkey=" + this.cookie_hkey + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            // this.login = false
            // console.log("Cookie已清空");
        }
    },
    mounted: function() {
        this.checkCookie();
        if (this.cookie_hid == "" & this.cookie_hkey == "") {
            this.login = false
        }
        if (this.cookie_hid != "" & this.cookie_hkey != "") {
            this.user_info_get();
            this.login = true
        }
    }
})