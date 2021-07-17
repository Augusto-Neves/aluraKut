import React from "react";
import nookies from "nookies";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AluraCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRealtions"

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} alt="Augusto Neves Profile Image" style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>

      <ul>
        {/* {props.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`user/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.image} alt={`${itemAtual.title} Profile Picture`} />
                      <span> {itemAtual.title} </span>
                    </a>
                  </li>
                )
              })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home(props) {
  const [comunidades, setComunidades] = React.useState([]);
  const githubUser = props.githubUser;
  const favDevs = [
    'diego3g',
    'maykbrito',
    'marcobrunodev',
    'thecodercoder',
    'omariosouto',
    'gustavoguanabara'
  ];
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_DATOCMS_READ_TOKEN;

    // Rquest para a API do Github
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(serverResponse => serverResponse.json())
      .then(fullResponse => setFollowers(fullResponse))

    // API GraphQL do DatoCMS
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${apiKey}`,
      },
      body: JSON.stringify({
        query: `query{
          allCommunities {
            id
            title
            imageUrl
            creatorSlug            
          }
        }`,
      }),
    })
      .then(res => res.json())
      .then(completeRes => {
        const communities = completeRes.data.allCommunities;
        setComunidades(communities)
        console.log(communities);
      })
  }, [])

  function handleCreateComunity(event) {
    event.preventDefault();
    const dadosDoForm = new FormData(event.target);
    const comunidade = {
      id: new Date().toISOString(),
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image'),
    }
    const comunidades = {
      title: dadosDoForm.get('title'),
      imageUrl: dadosDoForm.get('image'),
      creatorSlug: githubUser,
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comunidades),
    })
      .then(async function (res) {
        const dados = await res.json();
        console.log(dados.registroCriado);
        const comunidade = dados.registroCriado;
        const comunidadesAtualizadas = [...comunidades, comunidade];
        setComunidades(comunidadesAtualizadas);
      })
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">
              Bem Vindo (a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateComunity} >
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>

        {/* Aba de Devs Favoritos */}
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationBox title="Seguidores" items={followers} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Devs Favoritos ({favDevs.length})
            </h2>

            <ul>
              {favDevs.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`user/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} alt={`${itemAtual} Profile Picture`} />
                      <span> {itemAtual} </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>


          {/* Aba de Comunidades */}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} alt={`${itemAtual.title} Profile Picture`} />
                      <span> {itemAtual.title} </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  console.log('Cookies', token);
  return {
    props: {
      githubUser: 'Augusto-Neves'
    },
  }
}