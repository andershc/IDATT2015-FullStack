(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eaf6ae76"],{"13f9":function(e,t,n){"use strict";n("e6ce")},9662:function(e,t,n){"use strict";n.r(t);n("b0c0");var s=n("7a23"),o=function(e){return Object(s["v"])("data-v-d6d194f6"),e=e(),Object(s["t"])(),e},i={key:0},c=o((function(){return Object(s["g"])("h1",null," Submission successfully sent!",-1)})),u=o((function(){return Object(s["g"])("footer",null,"Thank you for contributing!",-1)}));function r(e,t,n,o,r,a){return a.submission?(Object(s["s"])(),Object(s["f"])("div",i,[c,Object(s["g"])("p",null," Name: "+Object(s["C"])(a.submission.name),1),Object(s["g"])("p",null," Email: "+Object(s["C"])(a.submission.email),1),Object(s["g"])("p",null," Message: "+Object(s["C"])(a.submission.message),1),u,Object(s["g"])("button",{onClick:t[0]||(t[0]=function(){return a.done&&a.done.apply(a,arguments)}),id:"done"},"Done")])):Object(s["e"])("",!0)}var a={props:["id"],created:function(){var e=this;this.$store.commit("SET_FLASHMESSAGE","Feedback sent!"),setTimeout((function(){e.$store.commit("SET_FLASHMESSAGE","")}),3e3),this.$store.dispatch("fetchSubmission",this.id).catch((function(t){e.$router.push({name:"ErrorDisplay",params:{error:t}})}))},computed:{submission:function(){return this.$store.state.submission}},methods:{done:function(){this.$router.push({name:"Home"})}}},b=(n("13f9"),n("6b0d")),d=n.n(b);const f=d()(a,[["render",r],["__scopeId","data-v-d6d194f6"]]);t["default"]=f},e6ce:function(e,t,n){}}]);
//# sourceMappingURL=chunk-eaf6ae76.2cca9049.js.map