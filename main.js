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
        }
    }
})



var sectionComponent = ({
    props: ['section','id'],
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
        }
      },
      template: '#sectionComponent',
      components: {
          'createTask-Form' : createTaskForm,

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