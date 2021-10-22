
class Section {
    constructor(sectionName, id) {
        this.sectionName = sectionName;
        this.tasks = [];
        this.id = id;
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
}






var sectionComponent = ({
    props: ['section'],
    data: function () {
        return {
          count: 0
        }
      },
      methods: {
          create: function() {
              Control.createSectionObject();
          }
      },
      template: '#sectionComponent',
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