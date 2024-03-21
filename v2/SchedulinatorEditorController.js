const SchedulinatorEditorController = {
    editor: {
        start: {
            steps: {
                0: {
                    element: document.getElementById('editor_step_0')
                }
            }
        },
        new: {
            steps: {
                0: {
                    element: document.getElementById('')
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
    init() {
        
    }
}