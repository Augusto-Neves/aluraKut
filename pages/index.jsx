import React from "react"
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



export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: '12313211',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const githubUser = 'Augusto-Neves';
  const favDevs = [
    'diego3g',
    'maykbrito',
    'marcobrunodev',
    'thecodercoder',
    'omariosouto',
    'gustavoguanabara'
  ];

  function handleCreateComunity(event) {
    event.preventDefault();
    const dadosDoForm = new FormData(event.target);
    const comunidade = {
      id: new Date().toISOString(),
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image'),
    }

    const comunidadesAtualizadas = [...comunidades, comunidade];
    setComunidades(comunidadesAtualizadas);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
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
                    <a href={`user/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.image} alt={`${itemAtual.title} Profile Picture`} />
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
