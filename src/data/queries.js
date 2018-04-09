export const getAllPresets = `
    query {
        getAllUniquePresets {
            presets
          }
    }
`;

export const getUserProject = id => `
{
    UniqueProject(id: "${id}") {
      id
      choicesMade
      name
      bought
      preset {
        id
        variant {
            name
            family {
                name
            }
        }
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
            fieldDifference
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

export const addProjectToUser = (
  userId,
  presetId,
  choicesMade,
  name,
  bought,
  need,
  checkoutOptions,
) => `
    mutation{
        createUniqueProject(
            userId:"${userId}",
            presetId: "${presetId}",
            choicesMade: "${JSON.stringify(choicesMade).replace(/"/g, '\\"')}"
            name: "${name}"
            bought: ${bought}
            need: "${need}"
            checkoutPackage: ${JSON.stringify(checkoutOptions)}
        ) {
            id
            createdAt
            name
            user {
                uniqueProjects {
                    id
                    name
                    choicesMade
                    bought
                    need
                    checkoutPackage
                    preset {
                        variant {
                            name
                            family {
                                name
                            }
                        }
                        template 
                        baseValues                    
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

export const deleteProject = projectId => `
    mutation{
        deleteUniqueProject(
            id:"${projectId}"
        ) {
            id
        }
    }
`;

export const updateProject = (
  projectId,
  choicesMade,
  name,
  bought,
  checkoutOptions,
) => `
    mutation{
        updateUniqueProject(
            id:"${projectId}"
            choicesMade: "${JSON.stringify(choicesMade).replace(/"/g, '\\"')}"
            name: "${name}"
            bought: ${bought}
            checkoutPackage: ${JSON.stringify(checkoutOptions)}
        ) {
            id
            createdAt
            name
            user {
                uniqueProjects {
                    id
                    name
                    choicesMade
                    bought
                    need
                    checkoutPackage
                    preset {
                        variant {
                            name
                            family {
                                name
                            }
                        }
                        template 
                        baseValues                    
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
        allUniqueProjects(
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
        updateUniqueProject (
            id: "${projectId}"
            bought: true
        )
        {
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

export const authenticateFacebookUser = token => `
    mutation {
        authenticateFacebookUser(
            facebookToken:"${token}"
        )
        {
            token
        }
    }
`;

export const authenticateTwitterUser = (token, verifier) => `
    mutation {
        authenticateTwitterUser(
            oAuthToken: "${token}"
            oAuthVerifier: "${verifier}"
        )
        {
            token
        }
    }
`;


export const authenticateGoogleUser = token => `
    mutation {
        authenticateGoogleUser(
            googleToken:"${token}"
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

export const getUserProjects = graphQLID => `
    query {
        user
        {   
            id
            email
            uniqueProjects(orderBy: createdAt_ASC) {
                id
                name
                choicesMade
                bought
                need
                preset {
                    variant {
                        name
                        family {
                            name
                        }
                    }
                    template 
                    baseValues                    
                }
            }
        }
    }
`;
