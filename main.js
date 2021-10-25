class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false;
        this.favorite = false;
        this.editForm = false;
    }
}



class Section {
    constructor(sectionName, id) {
        this.sectionName = sectionName;
        this.tasks = [];
        this.id = id;
        this.createTaskForm = false;
    }
}



class Controller {
    static createSectionObject(value) {
        let obj = new Section(value);
        return obj;
    }

    static createTaskObject(title, description) {
        return new Task(title, description);
    }

    static getTargetSectionIndex(sectionsArr, targetId) {
        for(let index in sectionsArr) {
            if (sectionsArr[index].id == targetId) {
                return index;
            }
        }
    }
}


var taskCardComponent = ({
    props: ['task', 'index', 'sections', 'section'],
    template: '#taskCardComponent',
    data() {
        return {
            selectedSection: this.section,
        }
    },

    methods: {
        changeSection() {
            let task = this.section.tasks.splice(this.index, 1);
            this.selectedSection.tasks.push(task[0])
        },
        
        checkedTask() {
            if (this.task.completed == true) {
                let currTask = this.section.tasks.splice(this.index, 1);
                this.section.tasks.push(currTask[0]);
            }
        }
    }
})


var createTaskFormComponent = ({
    props: ['section'],
    template: '#createTaskFormComponent',
    data() {
        return {
            title: '',
            description: '',
        }
    },

    methods: {
        addTask() {
            this.section.createTaskForm = false;
            this.section.tasks.push(Controller.createTaskObject(this.title, this.description));
            this.title = '',
            this.description = '';
        },
    }
})



var sectionComponent = ({
    props: ['section', 'sectionId', 'sections'],
    template: '#sectionComponent',

    //　インスタンス生成時にIDをセット
    created: function() {
        this.section.id = this.sectionId;
    },

    methods: {
        deleteTask(index) {
            this.section.tasks.splice(index,1);
        },
        deleteSection() {
            let targetIndex = Controller.getTargetSectionIndex(this.sections, this.section.id);
            this.sections.splice(targetIndex, 1)
        },
    },

    components: {
        'createTask-Form' : createTaskFormComponent,
        'task-card' : taskCardComponent,
    }
})



new Vue({
    el: '#taskManagementApp',
    data: {
        newSectionTitle: '',
        sections: [],
    },
    created() {
        window.addEventListener('scroll', this.scrollEvent);
    },

    methods: {
        createSection() {
            this.sections.push(Controller.createSectionObject(this.newSectionTitle));
            this.newSectionTitle = '';
        },
        scrollEvent() {
            let curr = window.scrollY;
            let area = document.getElementById('inputSection');
            let isContainFixed = area.classList.contains('fixed');
            let sectionsArea = document.getElementById('sections');
            if (curr > 46 && !isContainFixed) {
                area.classList.add('fixed');
                sectionsArea.classList.add('pt-5');
                console.log(sectionsArea.classList)
            }
            else if(curr <= 46 && isContainFixed) {
                area.classList.remove('fixed');
                sectionsArea.classList.remove('pt-5');
                console.log(sectionsArea.classList)
            }

        }
    },

    components: {
        'section-component' : sectionComponent,
    }
})