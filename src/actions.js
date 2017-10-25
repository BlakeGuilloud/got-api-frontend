import axios from 'axios';

const base_url = 'https://of8ryi0hq0.execute-api.us-east-1.amazonaws.com/dev/graphql'
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

  return axios.get(`${base_url}?query=${queryStr}`)
    .then(response => response.data.data.character)
    .catch(console.error); 
}

export function fetchCharacters(page) {
  const query = `{
      characters(page: ${page}) {
      name
    }
  }`

  // https://of8ryi0hq0.execute-api.us-east-1.amazonaws.com/dev/graphql?query=%7B%20%20%20%20%20%20characters(page%3A%201)%20%7B%20%20%20%20%20%20%20%20name,%20%20%20%20%20%20%20%20id%20%20%20%20%20%20%7D%20%20%20%20%7D

  return axios.post(`${base_url}`, { query })
    .then(response => response.data.data.characters)
    .catch(console.error);
}