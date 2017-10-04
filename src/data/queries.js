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
    selected
    needs
    baseValues
    steps {
        id
        name
        description
        selected
        choices {
        id
        name
        values
        selected
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


export const getSpecialChoiceSelectedCount = name => `
{
    allChoices(filter: {name_contains: "${name}"}) {
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

export const findUser = email => `
    query {
        User (
            email: "${email}"
        )
        {
            id
        }
    }
`;


export const createUser = (email, presetId, choicesMade) => `
    mutation {
        createUser (
            email: "${email}"
            projects: [
                {
                    presetId: "${presetId}",
                    choicesMade: "${JSON.stringify(choicesMade).replace(/"/g, "\\\"")}"
                }
            ]
        )
        {
            id
            projects {
                id
            }
        }
    }
`;


export const addProjectToUser = (userId, presetId, choicesMade) => `
    mutation{
        createProject(
            userId:"${userId}",
            presetId: "${presetId}",
            choicesMade: "${JSON.stringify(choicesMade).replace(/"/g, "\\\"")}"
        ) {
            id
            createdAt
            user {
                projects {
                    id
                }
            }
        }
    }
`;

export const getBoughtProjects = userId => `
    query {
        allProjects(
            filter: {
                bought: false,
                user: {
                    id: "${userId}"
                }
            }
        )
        {
            id
        }
  }
`;

export const updateProjectBought = projectId => `
    mutation {
        updateProject (
            id: "${projectId}"
            bought: true
        )
        {
            id
        }
    }
`;
