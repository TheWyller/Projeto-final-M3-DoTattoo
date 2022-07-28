import Button from "../Button";
import { DescriptionCard, HeaderCard, StyledCard } from "./style";
import flour from "../../assets/peonia.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../services/get";

const Card = ({
  object,
  isStudio = true,
  isProfile = false,
  isUserProfile = false,
  funcOnClick,
  funcDelete,
}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState({});
  const [user, setUser] = useState({});

  async function get() {
    const userObj = await getUser(object.userId);
    setUser({
      userImg: userObj.img_perfil,
      userName: userObj.name,
      userDescription: userObj.description,
    });
    setValue(object);
  }

  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [object]);

  return (
    <StyledCard>
      {value.userId !== undefined && (
        <>
          <HeaderCard>
            <section>
              <img
                className="userImg"
                src={user.userImg}
                alt="Imagem do usuário"
              />
              <div>
                <h2>{user.userName}</h2>
                <p>
                  {value.descriptionCard.length > 80
                    ? `${user.userDescription?.slice(0, 77)}...`
                    : user.descriptionCard}
                </p>
              </div>
            </section>
            <img className="imageCard" src={flour} alt="Imagem do usuário" />
          </HeaderCard>
          <img
            className="imageDescription"
            src={value.img_URL}
            alt={isStudio ? "Imagem do estúdio" : "Imagem de uma tatuagem"}
          />
          <DescriptionCard>
            <p>
              {value.descriptionCard.length > 160
                ? `${value.descriptionCard.slice(0, 157)}...`
                : value.descriptionCard}
            </p>

            <div>
              <span>
                Dia: {value.full_date[0].day}/{value.full_date[0].mouth}/
                {value.full_date[0].year}
              </span>
              <span>
                Horas disponíveis:
                {value.full_date[0].hour_final -
                  value.full_date[0].hour_initial ===
                0
                  ? "24 horas"
                  : `${
                      value.full_date[0].hour_final -
                      value.full_date[0].hour_initial
                    } horas`}
              </span>
            </div>
            <div>
              {isStudio ? (
                <span>Valor: {value.price}</span>
              ) : (
                <span>Valor: {`${value.price_hour} por Hora`}</span>
              )}

              <span>Seção: {value.session}</span>
            </div>
          </DescriptionCard>
          <Button
            onClick={() => {
              console.log(user);
              if (!isUserProfile) {
                localStorage.setItem(
                  "@doTattoo:mainCard",
                  JSON.stringify({
                    id: value.id,
                    name: user.userName,
                    userId: value.userId,
                    isStudio,
                  })
                );
                navigate(`/perfil/${value.userId}`);
                isProfile && window.location.reload();
              } else {
                funcOnClick();
              }
            }}
            width="90%"
            height="48px"
            backColor={"#FFFFFF;"}
          >
            {!isUserProfile ? "Ver Proposta" : "Editar"}
          </Button>
          {isUserProfile && (
            <Button
              width="90%"
              height="48px"
              backColor="#FFFFFF"
              onClick={() => {
                funcDelete();
              }}
            >
              Deletar
            </Button>
          )}
        </>
      )}
    </StyledCard>
  );
};

export default Card;
