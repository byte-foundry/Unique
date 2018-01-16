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

export const getPreset = id => `
{
    Project(id: "${id}") {
      id
      choicesMade
      name
      preset {
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
      }
    }
  }
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


export const createUser = (email) => `
    mutation {
        createUser (
            email: "${email}"
        )
        {
            id
            projects {
                id
                name
            }
        }
    }
`;

export const connectToGraphCool = accessToken => `
    mutation {
        authenticateUser (
            accessToken: "${accessToken}"
        )
        {
            id
            email
        }
    }
`;


export const addProjectToUser = (userId, presetId, choicesMade, name) => `
    mutation{
        createProject(
            userId:"${userId}",
            presetId: "${presetId}",
            choicesMade: "${JSON.stringify(choicesMade).replace(/"/g, "\\\"")}"
            name: "${name}"
        ) {
            id
            createdAt
            name
            user {
                projects {
                    id
                    name
                    choicesMade
                    preset {
                        steps {
                            name
                        }
                    }
                }
            }
            choicesMade
            preset {
                steps {
                    name
                }
            }
        }
    }
`;

export const updateProject = (projectId, choicesMade, name) => `
    mutation{
        updateProject(
            id:"${projectId}"
            choicesMade: "${JSON.stringify(choicesMade).replace(/"/g, "\\\"")}"
            name: "${name}"
        ) {
            id
            createdAt
            name
            user {
                projects {
                    id
                    name
                    choicesMade
                    preset {
                        steps {
                            name
                        }
                    }
                }
            }
            choicesMade
            preset {
                steps {
                    name
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
            name
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

export const getPrototypoUser = userEmail => `
    query {
        User (
            email: "${userEmail}"
        ) {
            id
        }
    }
`;

export const authenticateUser = (email, password) => `
    mutation {
        authenticateEmailUser(
            email:"${email}"
            password:"${password}"
        )
        {
            token
        }
    }
`;

export const signupUser = (email, password, firstName, lastName) => `
mutation {
    signupEmailUser(
        email:"${email}"
        password:"${password}"
        firstName:"${firstName}"
        lastName:"${lastName}"
    )
    {
        id
    }
}
`;

export const sendFontToPrototypo = (prototypoUserId, familyName, template, variantName, values) => `
    mutation {
        createFamily(
            ownerId:"${prototypoUserId}"
            name:"${familyName}"
            template:"${template}"
            variants: [
                {
                    name: "${variantName}"
                    values: "${JSON.stringify(values).replace(/"/g, "\\\"")}"
                }    
            ]
    )
    {
        id
    }
}
`;

export const getUserProjects = graphQLID => `
    query {
        User(
            id: "${graphQLID}"
        )
        {
            projects(orderBy: createdAt_ASC) {
                id
                name
                choicesMade
                preset {
                    steps {
                        name
                    }
                }
            }
        }
    }
`;
