(function () {
    'use strict';
    gotoTop();
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 */
jQuery(document).ready(function () {
    if (getURLVar('code') != null) title.tname = getURLVar('code');
    if (getURLVar('mode') != null) title.mode = getURLVar('mode');
    $.backstretch("../imgs/indexbg.jpg");
    document.getElementById('languagec').addEventListener('click', function () {
        console.log('test');
        if (title.languages == 'chinese') {
            title.languages = 'english';
        } else {
            title.languages = 'chinese'
        }
        title.updatelanguage();
    });
});
const rewave = [{
    icon: 'fa-language',
    id: 'languagec'
}];
let title = new Vue({
    el: '#title',
    data: {
        buttondis: false,
        mode: '',
        buttons: [],
        testname: '',
        tname: '',
        languages: 'chinese',
        display: {}
    },
    computed: {},
    methods: {
        updatelanguage: function () {
            if (this.languages == 'chinese') {
                this.display = languages.quiztitle.cn;
            } else {
                this.display = languages.quiztitle.en;
            }
        },
        getquestions: function () {
            this.buttondis = true;
            featurefunctions.getquestionbymcode(this.tname, function (data) {
                // console.log(typeof data);
                if (data.length > 5) {
                    data = JSON.parse(data);
                    for (let i = 0; i < data.questions.length; i++) {
                        data.questions[i].picked = -1;
                        data.questions[i].coloreffect = 're-qu';
                        for (c in data.questions[i].answer) {
                            data.questions[i].answer[c] = [data.questions[i].answer[c], ''];
                        }
                    }
                    app.tests = data.questions;
                    title.mode = 'answer';
                    title.testname = data.examname;
                } else {
                    title.mode = 'debug';
                }
            });
        },
        fixvariable: function () {
            this.buttondis = false;
            this.mode = 'mcode';
        }
    }
});
let app = new Vue({
    el: '#main',
    data: {
        tests: [],
        storage: [],
        lengths: 0,
        display: {}
    },
    computed: {
        questioncolor: function (index, cindex) {
            return index;
        }
    },
    watch: {},
    methods: {
        updatelanguage: function (lan) {
            if (lan == 'chinese') {
                this.display = languages.quiz.cn;
            } else {
                this.display = languages.quiz.en;
            }
        },
        convert: function (index) {
            return Cd$.chineseify(index + 1, 1);
        },
        idify: function (index) {
            return 'index:' + index;
        },
        downvert: function (index) {
            return otherfunctions.converttoletter(index + 1);
        },
        clicked: function () {
            let count = 0;
            for (id in this.tests) {
                if (this.tests[id].picked != -1) count++;
            }
            this.lengths = count;
        },
        clicktext: function (index, cindex) {
            this.tests[index].picked = cindex;
            this.clicked();
        },
        grade: function () {
            for (id in this.tests) {
                if (this.tests[id].picked == this.tests[id].correct) {
                    this.tests[id].coloreffect = 'auto-correct';
                    this.tests[id].answer[this.tests[id].picked][1] = 'auto-correct';
                } else {
                    this.tests[id].coloreffect = 'auto-wrong';
                    this.tests[id].answer[this.tests[id].picked][1] = 'auto-wrong';
                    this.tests[id].answer[this.tests[id].correct][1] = 'auto-correct';
                }
            }
            this.clicked();
        },
        gradethis: function (i) {

        },
        clickansweritself: function (index, answer) {
            this.tests[index].picked = answer;
        },
        test: function () {
            testfunctions.addtestquestiontojavascript(function (data) {
                for (let i = 0; i < data.questions.length; i++) {
                    data.questions[i].picked = -1;
                    data.questions[i].coloreffect = 're-qu';
                    for (c in data.questions[i].answer) {
                        data.questions[i].answer[c] = [data.questions[i].answer[c], ''];
                    }
                }
                app.tests = data.questions;
                title.mode = 'answer';
                title.testname = data.examname;
            });
        },
        testss: function () {
            console.log('tt');
        }
    }
})

function getURLVar(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function URLencode(sStr) {

    return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F');

}
// const teststring = JSON.stringify(testobject);
// console.log(teststring);
// console.log(URLencode(teststring));