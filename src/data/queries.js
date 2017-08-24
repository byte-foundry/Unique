export const storePreset = preset => `
    mutation {
        createPreset(
            name: "${preset.name}"
            preset: "${preset.preset}"
            variant: "${preset.variant}"
            template: "${preset.template}"
            needs: [
                { name: "text" }
            ]
            baseValues : "${JSON.stringify(preset.baseValues).replace(/"/g, "\\\"")}"
            steps: [
                ${preset.steps.map(step => `
                    {
                        name: "${step.name}"
                        description: "${step.description}"
                        choices:
                        [  
                            ${step.choices.map(choice => `
                                {
                                    name: "${choice.name}"
                                    db: "${choice.db}"
                                    values: "${JSON.stringify(choice.values).replace(/"/g, "\\\"")}"
                                }
                            `)}
                        ]
                    }
                `)}
            ]
        ) { id }
    }
`;

export const getAllPresets = `
    query {allPresets {
    id
    preset
    variant
    template
    needs {
        id
        name
    }
    baseValues
    steps {
        id
        name
        description
        choices {
        id
        db
        name
        values
        }
    }
    }}
`;

export const getSelectedCount = (type, id) => `
    query {
        ${type} (id: "${id}") {
            selected
        }
    }
`;

export const updateSelectedCount = (type, id, count) => `
    mutation {
        update${type}(
            id: "${id}"
            selected: ${count}
        ) {
            id
            selected
        }
    }
`;


export const getPresetExportedCount = id => `
    query {
        Preset (id: "${id}") {
            exported
        }
    }
`;

export const updatePresetExportedCount = (id, count) => `
    mutation {
        updatePreset(
            id: "${id}"
            exported: ${count}
        ) {
            id
            selected
        }
    }
`;
