class Task {
    constructor(title, description, sectionId) {
        this.title = title;
        this.description = description;
        this.sectionId = sectionId
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
    static test() {
        console.log('ok')
    }

    static createSectionObject(value) {
        let obj = new Section(value);
        return obj;
    }

    static createTaskObject(title, description, sectionId) {
        return new Task(title, description, sectionId);
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
            let targetSectionId = this.selectedSection.id;
            let targetTaskObject = this.section.tasks.splice(this.index, 1);
            this.selectedSection.tasks.push(targetTaskObject);
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
            this.section.tasks.push(Controller.createTaskObject(this.title, this.description, this.section.id));
            this.title = '',
            this.description = '';
        },
    }
})



var sectionComponent = ({
    props: ['section', 'id', 'sections'],
    template: '#sectionComponent',

    data: function () {
        return {
          count: 0,
        }
      },

    created: function() {
        this.section.id = this.id;
    },

    methods: {
        deleteTask(index) {
            this.section.tasks.splice(index,1);
        },
        deleteSection() {
            let targetIndex = Controller.getTargetSectionIndex(this.sections, this.id);
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
    methods: {
        createSection() {
            this.sections.push(Controller.createSectionObject(this.newSectionTitle));
            this.newSectionTitle = '';
        },
        changeSection(targetArr) {
            console.log(targetArr.section.id)
            console.log(targetArr.section)
        }
    },

    components: {
        'section-component' : sectionComponent,
    }
})