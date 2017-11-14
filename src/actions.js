import axios from 'axios';

const base_url = 'https://dlcz0hobw5.execute-api.us-east-1.amazonaws.com/dev/graphql'
// const base_url = 'http://localhost:4000/graphql';

export function fetchCharacterById(id) {
  const queryStr = `
    {
      character(id: ${id}) {
        name,
        id,
        titles {
          title
        },
        allegiances {
          house {
            name,
            region,
            coatOfArms,
            founded,
            currentLord {
              name
            },
            swornMembers {
              member {
                name
              }
            }
          }
        }
      }
    }
  `;

  return axios.get(`${base_url}`, {
    query: queryStr,
  })
    .then(response => response.data.data.character)
    .catch(console.error); 
}

export function fetchCharacters(page) {
  const query = `{
      characters(page: 1) {
        name
      }
  }`

  return axios.post(`${base_url}`, { query })
    .then(response => response.data.data.characters)
    .catch(console.error);
}
