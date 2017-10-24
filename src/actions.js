import axios from 'axios';

const base_url = 'https://of8ryi0hq0.execute-api.us-east-1.amazonaws.com/dev/graphql'

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

  return axios.get(`${base_url}?query=${queryStr}`)
    .then(response => response.data.data.character)
    .catch(console.error); 
}

export function fetchCharacters(page) {
  const queryStr = `
    {
      characters(page: ${page}) {
        name,
        id
      }
    }
  `;
  let configGraphQL = {
    url: `${base_url}?query=${queryStr}`,
    method: 'post', 
    headers: { 'Content-Type': 'application/json' },
  };

  return axios(configGraphQL)
    .then(response => response.data.data.characters)
    .catch(console.error);
}