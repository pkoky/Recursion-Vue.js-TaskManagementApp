class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false;
        this.favorite = false;
    }
}



class Section {
    constructor(sectionName, id) {
        this.sectionName = sectionName;
        this.tasks = [];
        this.id = id;
        this.show = false;
    }
}



class Control {
    static test() {
        console.log('ok')
    }

    static createSectionObject(value) {
        let obj = new Section(value);
        return obj;
    }

    static createTaskObject(title, description) {
        return new Task(title, description);
    }
}


var taskCardComponent = ({
    props: ['task','index'],
    template: '#taskCardComponent',
    methods: {
        switchCompleted() {
            this.task.completed = this.task.completed ? false : true;
        },
        switchFavorite() {
            this.task.favorite = this.task.favorite ? false : true;
        },
    }
})


var createTaskForm = ({
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
            this.section.show = false;
            this.section.tasks.push(Control.createTaskObject(this.title, this.description));
            this.title = '',
            this.description = '';
        },
    }
})



var sectionComponent = ({
    props: ['section','id'],
    template: '#sectionComponent',

    data: function () {
        return {
          count: 0
        }
      },

      created: function() {
          this.section.id = this.id;
      },

      methods: {
        switchTaskForm() {
            this.section.show = this.section.show ? false : true;
        },
        deleteTask(index) {
            this.section.tasks.splice(index,1);
        }
      },

      components: {
          'createTask-Form' : createTaskForm,
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
            this.sections.push(Control.createSectionObject(this.newSectionTitle));
            this.newSectionTitle = '';
        }
    },
    components: {
        'section-component' : sectionComponent,
    }
})