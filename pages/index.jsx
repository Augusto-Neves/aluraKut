import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AluraCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRealtions"

function ProfileSidebar(props) {
  return (
    <Box >
      <img src={`https://github.com/${props.githubUser}.png`} alt="Augusto Neves Profile Image" style={{ borderRadius: '8px' }} />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'Augusto-Neves';
  const favDevs = [
    'diego3g',
    'maykbrito',
    'marcobrunodev',
    'thecodercoder',
    'omariosouto',
    'gustavoguanabara'
  ];
  return (
    <>
      <AlurakutMenu />
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
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Devs Favoritos ({favDevs.length})
            </h2>

            <ul>
              {favDevs.map((itemAtual) => {
                return (
                  <li>
                    <a href={`user/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} alt={`${itemAtual} Profile Picture`} />
                      <span> {itemAtual} </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box >
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  );
}
