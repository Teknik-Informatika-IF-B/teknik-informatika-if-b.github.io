const SchedulinatorEditorController = {
    editor: {
        start: document.getElementById('editor_step_0'),
        new: {
            steps: {
                1: {
                    element: document.getElementById(''),
                    callback: function() {
                        
                    }
                }
            },
            prefix: 'new_'
        },
        load: {
            steps: 3,
            prefix: 'load_'
        }
    },
    state: {
        type: null,
        step: 0,
        prefix: '',
    },
    helper: {
        showElementStep(step) {
            // Hide the others
        }
    },
    handleNewEditorStateSelect(type) {
        this.state.type = type;

    },
    updateProgressBar(step, max_step, message = null) {
        let percentage = ((step / max_step) * 100).toFixed(2),
            bar = document.getElementById('editor_progressbar');
        bar.style.width = `${percentage}%`;
        bar.setAttribute('aria-valuenow', percentage);
        bar.innerHTML = `<b>${(message == null) ? `STEP ${step}` : message }</b>`;
    },
    showStep(type, step) {
        if (!Object.keys(this.editor[type]).includes(step)) {
            return false;
        }
        Object.values(this.pagesElement).forEach(e => {
            ViewerHelper.hide(e);
        });
        ViewerHelper.show(document.getElementById(`page_${page}`));

        if (Object.keys(this.afterNavigationCallback).includes(page)) {
            this.afterNavigationCallback[page]();
        }
    },
    init() {
        
    }
}