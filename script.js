function GridItem(isHeader, text, link, imgSrc){
    this.isHeader = isHeader;
    this.text = text;
    this.link = link;
    this.imgSrc = imgSrc;
}

const cSharpUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/C%23%20Sample%20Application";
const pythonUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/Sample%20Website%20Django%20Framework%2C%20Python%2C%20JavaScript";
const helpMenuUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/Basic%20Help%20Menu%20in%20HTML%2C%20JavaScript";
const basicWebsiteUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/Basic%20Website%20JavaScript%2C%20HTML%2C%20Vue%20Framework";
const schoolUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/Misc.%20Schoolwork";

const app = Vue.createApp({
    data() {
        return {
            mainGridItems: [
                new GridItem(true, "Python"),
                new GridItem(false, "Sample Website Using Django Framework", pythonUrl, "images/portfolio-images/python-django.png"),
                new GridItem(true, "C#"),
                new GridItem(false, "C# Windows Forms Application", cSharpUrl, "images/portfolio-images/csharp.png"),
                new GridItem(true, "JavaScript"),
                new GridItem(false, "Example Help Menu", helpMenuUrl, "images/portfolio-images/help-menu.jpg"),
                new GridItem(false, '"OddJobs" Sample Website Project', pythonUrl, "images/portfolio-images/oddjobs-js.png"),
                new GridItem(false, "Example Using Vue Framework", basicWebsiteUrl, "images/portfolio-images/basic-website-js.png"),
                new GridItem(true, "Miscellaneous Schoolwork"),
                new GridItem(false, "Schoolwork", schoolUrl, "images/portfolio-images/schoolwork.jpg"),
                new GridItem(true, "Resume"),
                new GridItem(false, "My Resume", "docs/Resume.pdf", "images/portfolio-images/resume.png")
            ],
        };
    },

    methods: {
        
        navigate(url){
            window.open(url);
        },

    },


    computed: {

    }
});

const vm = app.mount("#main");