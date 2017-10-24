import axios from 'axios';

const base_url = 'http://localhost:4000/graphql'

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

  return axios.get(`${base_url}?query=${queryStr}`)
    .then(response => response.data.data.characters)
    .catch(console.error);
}