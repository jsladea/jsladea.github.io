function GridItem(isHeader, text, id, link, imgSrc){
    this.isHeader = isHeader;
    this.text = text;
    this.id = id;
    this.link = link;
    this.imgSrc = imgSrc;
}

const cSharpUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/C%23%20Sample%20Application";
const pythonUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/Sample%20Website%20Django%20Framework%2C%20Python%2C%20JavaScript";
const helpMenuUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/Basic%20Help%20Menu%20in%20HTML%2C%20JavaScript";
const basicWebsiteUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/Basic%20Website%20JavaScript%2C%20HTML%2C%20Vue%20Framework";
const schoolUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/Misc.%20Schoolwork";
const jsonWebApiUrl = "https://github.com/jsladea/Work-Portfolio/tree/master/Sample%20JSON%20Web%20API";
const workPortfolioUrl = "https://github.com/jsladea/Work-Portfolio";

const app = Vue.createApp({
    data() {
        return {
            mainGridItems: [
                new GridItem(true, "Python", "python-header"),
                new GridItem(false, "Sample Website Using Django Framework", "sample-django1",pythonUrl, "images/portfolio-images/python-django.png"),
                new GridItem(false, "Sample JSON Web API Using Django", "sample-web-api", jsonWebApiUrl, "images/portfolio-images/json-api.jpg"),
                new GridItem(true, "C#", "c-sharp-header"),
                new GridItem(false, "C# Windows Forms Application", "c-sharp-item1",cSharpUrl, "images/portfolio-images/csharp.png"),
                new GridItem(true, "JavaScript", "javascript-header"),
                new GridItem(false, "Example Help Menu", "js-item1", helpMenuUrl, "images/portfolio-images/help-menu.jpg"),
                new GridItem(false, '"OddJobs" Sample Website Project', "js-item2", pythonUrl, "images/portfolio-images/oddjobs-js.png"),
                new GridItem(false, "Example Using Vue Framework", "js-item3", basicWebsiteUrl, "images/portfolio-images/basic-website-js.png"),
                new GridItem(true, "Other", "other-header"),
                new GridItem(false, "My Resume", "resume", "docs/Resume.pdf", "images/portfolio-images/resume.png"),
                new GridItem(false, "Entire GitHub Portfolio", "github", workPortfolioUrl, "images/portfolio-images/github.png"),
                new GridItem(false, "Schoolwork", "schoolwork", schoolUrl, "images/portfolio-images/schoolwork.jpg"),
                new GridItem(true, "", "end-grid"),
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